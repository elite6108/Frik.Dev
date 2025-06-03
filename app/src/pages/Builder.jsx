import { useState } from "react";
import Chatbox from "../components/BuilderComponents/Chatbox";
import IDE from "../components/BuilderComponents/IDE";
import {Chat} from "../../components/chat/Chat.client"

function Builder() {
  const [codeGenerated, setCodeGenerated] = useState(false);
  return (
    <Chat/>
  );
}

export default Builder;