import { json, type MetaFunction } from '@remix-run/cloudflare';
import { ClientOnly } from 'remix-utils/client-only';
import { BaseChat } from '~/components/chat/BaseChat';
import { Chat } from '~/components/chat/Chat.client';
import { Header } from '~/components/header/Header';
import App from "../src/App.jsx";
import { BrowserRouter } from 'react-router-dom'; // ✅ Add this

export const meta: MetaFunction = () => {
  return [{ title: 'Bolt' }, { name: 'description', content: 'Talk with Bolt, an AI assistant from StackBlitz' }];
};

export const loader = () => json({});

export default function Index() {
  return (

    <ClientOnly fallback={<div>Loading...</div>}>
      {() => (
        <BrowserRouter>
          <App />
        </BrowserRouter>
      )}
    </ClientOnly>
  
  );
}
