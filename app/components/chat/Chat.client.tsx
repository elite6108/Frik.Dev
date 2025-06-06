import { useStore } from '@nanostores/react';
import type { Message } from 'ai';
import { useChat } from 'ai/react';
import { useAnimate } from 'framer-motion';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { cssTransition, toast, ToastContainer } from 'react-toastify';
import { useMessageParser, usePromptEnhancer, useShortcuts, useSnapScroll } from '~/lib/hooks';
import { useChatHistory } from '~/lib/persistence';
import { chatStore } from '~/lib/stores/chat';
import { workbenchStore } from '~/lib/stores/workbench';
import { fileModificationsToHTML } from '~/utils/diff';
import { cubicEasingFn } from '~/utils/easings';
import { createScopedLogger, renderLogger } from '~/utils/logger';
import { BaseChat } from './BaseChat';

const toastAnimation = cssTransition({
  enter: 'animated fadeInRight',
  exit: 'animated fadeOutRight',
});

const logger = createScopedLogger('Chat');

export function Chat() {
  renderLogger.trace('Chat');

  const { ready, initialMessages, storeMessageHistory } = useChatHistory();

  return (
    <>
      {ready && <ChatImpl initialMessages={initialMessages} storeMessageHistory={storeMessageHistory} />}
      <ToastContainer
        closeButton={({ closeToast }) => {
          return (
            <button className="Toastify__close-button" onClick={closeToast}>
              <div className="i-ph:x text-lg" />
            </button>
          );
        }}
        icon={({ type }) => {
          /**
           * @todo Handle more types if we need them. This may require extra color palettes.
           */
          switch (type) {
            case 'success': {
              return <div className="i-ph:check-bold text-bolt-elements-icon-success text-2xl" />;
            }
            case 'error': {
              return <div className="i-ph:warning-circle-bold text-bolt-elements-icon-error text-2xl" />;
            }
          }

          return undefined;
        }}
        position="bottom-right"
        pauseOnFocusLoss
        transition={toastAnimation}
      />
    </>
  );
}

interface ChatProps {
  initialMessages: Message[];
  storeMessageHistory: (messages: Message[]) => Promise<void>;
}

export const ChatImpl = memo(({ initialMessages, storeMessageHistory }: ChatProps) => {
  useShortcuts();

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [uploadedImages, setUploadedImages] = useState<Array<{id: string, src: string, type: string}>>([]);

  const [chatStarted, setChatStarted] = useState(initialMessages.length > 0);

  const { showChat } = useStore(chatStore);

  const [animationScope, animate] = useAnimate();

  const { messages, isLoading, input, handleInputChange, setInput, stop, append } = useChat({
    api: '/api/chat',
    // Remove the uploadedImages from body as we'll handle it in the content itself
    body: {},
    onError: (error) => {
      logger.error('Request failed\n\n', error);
      toast.error('There was an error processing your request');
    },
    onFinish: () => {
      logger.debug('Finished streaming');
    },
    initialMessages,
  });

  const { enhancingPrompt, promptEnhanced, enhancePrompt, resetEnhancer } = usePromptEnhancer();
  const { parsedMessages, parseMessages } = useMessageParser();

  const TEXTAREA_MAX_HEIGHT = chatStarted ? 400 : 200;

  useEffect(() => {
    chatStore.setKey('started', initialMessages.length > 0);
  }, []);

  useEffect(() => {
    parseMessages(messages, isLoading);

    if (messages.length > initialMessages.length) {
      storeMessageHistory(messages).catch((error) => toast.error(error.message));
    }
  }, [messages, isLoading, parseMessages]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach(file => {
      // Process each image file
      if (!file.type.startsWith('image/')) return;
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const id = `img-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
        setUploadedImages(prevImages => [...prevImages, {
          id,
          src: e.target?.result as string,
          type: file.type
        }]);
      };
      reader.readAsDataURL(file);
    });
    
    // Reset the input to allow uploading the same file again
    event.target.value = '';
  };

  const handlePaste = useCallback((event: ClipboardEvent) => {
    const items = event.clipboardData?.items;
    
    if (!items) return;
    
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        if (!file) continue;
        
        const reader = new FileReader();
        reader.onload = (e) => {
          const id = `img-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
          setUploadedImages(prevImages => [...prevImages, {
            id,
            src: e.target?.result as string,
            type: file.type
          }]);
        };
        reader.readAsDataURL(file);
      }
    }
  }, []);

  useEffect(() => {
    // Add paste event listener to the document
    document.addEventListener('paste', handlePaste);
    
    return () => {
      document.removeEventListener('paste', handlePaste);
    };
  }, [handlePaste]);

  const removeUploadedImage = (id: string) => {
    setUploadedImages(prevImages => prevImages.filter(img => img.id !== id));
  };

  const scrollTextArea = () => {
    const textarea = textareaRef.current;

    if (textarea) {
      textarea.scrollTop = textarea.scrollHeight;
    }
  };

  const abort = () => {
    stop();
    chatStore.setKey('aborted', true);
    workbenchStore.abortAllActions();
  };

  useEffect(() => {
    const textarea = textareaRef.current;

    if (textarea) {
      textarea.style.height = 'auto';

      const scrollHeight = textarea.scrollHeight;

      textarea.style.height = `${Math.min(scrollHeight, TEXTAREA_MAX_HEIGHT)}px`;
      textarea.style.overflowY = scrollHeight > TEXTAREA_MAX_HEIGHT ? 'auto' : 'hidden';
    }
  }, [input, textareaRef]);

  const runAnimation = async () => {
    if (chatStarted) {
      return;
    }

    await Promise.all([
      animate('#examples', { opacity: 0, display: 'none' }, { duration: 0.1 }),
      animate('#intro', { opacity: 0, flex: 1 }, { duration: 0.2, ease: cubicEasingFn }),
    ]);

    chatStore.setKey('started', true);

    setChatStarted(true);
  };

  const sendMessage = (event: React.UIEvent, messageInput?: string) => {
    event.preventDefault();

    const message = messageInput ?? input;
    if (message.trim() || uploadedImages.length > 0) {
      // First run animation if needed
      runAnimation();
      
      if (uploadedImages.length === 0) {
        // Simple text-only message
        append({
          role: 'user',
          content: message,
        });
      } else {
        // Create simplified multimodal message with text and images
        logger.info(`Creating multimodal message with ${uploadedImages.length} images`);
        
        try {
          // First, create a text-only message to ensure AI context is preserved
          // even if image processing fails
          if (message.trim()) {
            append({
              role: 'user',
              content: message + '\n\n[Uploading image...]',
            });
          }
          
          // Then, send each image separately in a simpler format
          for (const img of uploadedImages) {
            try {
              // Extract base64 data from the data URL
              const parts = img.src.split(',');
              if (parts.length !== 2) {
                logger.error('Invalid data URL format');
                continue;
              }
              
              const base64Data = parts[1].trim();
              if (!base64Data) {
                logger.error('Empty base64 data');
                continue;
              }
              
              // Log info about the image
              logger.info(`Processing ${img.type} image, data length: ${base64Data.length}`);
              
              // Create a simpler image message (just one image per message)
              const imageMessage = [
                {
                  type: 'image' as const,
                  source: {
                    type: 'base64' as const,
                    media_type: img.type,
                    data: base64Data
                  }
                }
              ];
              
              // Send the image as a separate message
              append({
                role: 'user',
                content: imageMessage as any,
              });
              
              logger.info(`Successfully sent ${img.type} image`);
            } catch (imgError) {
              logger.error('Error processing individual image:', imgError);
            }
          }
        } catch (error) {
          logger.error('Error handling images:', error);
          toast.error('Failed to send images. Please try again with text only.');
          
          // If all else fails, send a text-only message
          if (message.trim()) {
            append({
              role: 'user',
              content: message + '\n\n[Image upload failed]',
            });
          }
        }
      }
      
      // Clear images after sending
      setUploadedImages([]);
      resetEnhancer(); // Reset the prompt enhanced state
    }
  };

  const [messageRef, scrollRef] = useSnapScroll();

  return (
    <BaseChat
      ref={animationScope}
      textareaRef={textareaRef}
      messageRef={messageRef}
      scrollRef={scrollRef}
      enhancePrompt={() => {
        enhancePrompt(input, (enhancedInput) => {
          setInput(enhancedInput);
          scrollTextArea();
        });
      }}
      enhancingPrompt={enhancingPrompt}
      promptEnhanced={promptEnhanced}
      messages={messages.map((message, i) => {
        if (message.role === 'user') {
          return message;
        }

        return {
          ...message,
          content: parsedMessages[i] || '',
        };
      })}
      isStreaming={isLoading}
      chatStarted={chatStarted || initialMessages.length > 0}
      handleInputChange={handleInputChange}
      handleImageUpload={handleImageUpload}
      removeUploadedImage={removeUploadedImage}
      uploadedImages={uploadedImages}
      sendMessage={sendMessage}
      input={input}
      handleStop={abort}
    />
  );
});
