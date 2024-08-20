import React, { useState } from "react";
import {
  MinChatUiProvider,
  MainContainer,
  ConversationList,
} from "@minchat/react-chat-ui";
import Conversation from "./Conversation";
import ConversationsList from "./ConversationsList";
import Header from "./Header";
import Register from "./Register";
import Group from "./Group";

const messages = [
  { user: { id: "12", name: "John Doe" }, text: "Hello!" },
  { user: { id: "13", name: "You" }, text: "Hi, John!" },

  { user: { id: "11", name: "Jane Smith" }, text: "Let’s meet at 3 PM" },
  { user: { id: "12", name: "You" }, text: "Perfect, see you then!" },
];

const conversations = [
  {
    id: "1",
    title: "John Doe",
    lastMessage: {
      user: { id: "11", name: "GGGG" },
      id: "121",
      text: "Hello, how are you?",
      //media?: MediaType;
      // createdAt?: newDate();
      // seen?: true;
    },
  },
  {
    id: "2",
    title: "Jane Smith",
    lastMessage: {
      user: { id: "11", name: "HHHHH" },
      id: "111",
      text: "Are we still on for the meeting?",
      //media?: MediaType;
      // createdAt?: newDate();
      // seen?: true;
    },
  },
];
const initState = { group: false, user: false };
function Messages() {
  const [open, setOpen] = useState(initState);
  const handleOpen = (key) => {
    setOpen({ ...initState, [key]: true });
  };
  const handleClose = () => {
    setOpen(initState);
  };
  const onUsers = () => {
    console.log("users clicked");
    handleOpen("user");
  };
  const onCreateGroup = () => {
    console.log("group clicked");
    handleOpen("group");
  };
  return (
    <div>
      {" "}
      <Header onUsers={onUsers} onCreateGroup={onCreateGroup} />
      <Register handleClose={handleClose} open={open.user} />
      <Group handleClose={handleClose} open={open.group} />
      <MinChatUiProvider theme="#6ea9d7">
        <MainContainer style={{ height: "85vh", display: "flex" }}>
          <ConversationsList conversations={conversations} />
          <Conversation messages={messages} />
        </MainContainer>
      </MinChatUiProvider>
    </div>
  );
}

export default Messages;
