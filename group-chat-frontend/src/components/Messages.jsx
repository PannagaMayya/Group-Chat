import React, { useEffect, useState } from "react";
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
import axiosInstance from "../axiosInstance";
import "../style/messages.css";

const messagesExample = [
  { user: { id: "12", name: "John Doe" }, text: "Hello!" },
  { user: { id: "13", name: "You" }, text: "Hi, John!" },

  { user: { id: "11", name: "Jane Smith" }, text: "Let’s meet at 3 PM" },
  { user: { id: "12", name: "You" }, text: "Perfect, see you then!" },
];

const conversationsExample = [
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
  const [conversations, setConversations] = useState(conversationsExample);
  const [messages, setMessages] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(initState);
  const [group, setGroup] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axiosInstance.get(
          "/messages?id=66c4f57243e559b63a3b670c"
        );
        console.log(response.data);
        setConversations(
          response.data?.map((e) => ({
            id: e.group?._id,
            title: e.group?.name,
            lastMessage: {
              user: { id: e.sender?._id, name: e.sender?.username },
              id: e.lastMessage?._id,
              text: e.lastMessage?.content,
              createdAt: new Date(e.lastMessageTimestamp),
            },
          }))
        );
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchMessagesData = async () => {
      try {
        let response = await axiosInstance.get(`/messages/${group}`);
        console.log(response.data);
        setMessages(
          response.data?.map((e) => ({
            user: {
              id: e.sender?._id,
              name: e.sender?.username,
            },
            createdAt: new Date(e.timestamp),
            text: e.content,
          }))
        );
      } catch (err) {
        console.log(err);
      }
    };

    group && fetchMessagesData();
  }, [group]);

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
  const sendMessage = async (text) => {
    try {
      let response = await axiosInstance.post("/messages/send", {
        groupId: group,
        senderId: "66c4f57243e559b63a3b670c",
        content: text,
      });
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  if (loading) return <p>Loading...</p>;

  return (
    <div className="message-container">
      {" "}
      <Header onUsers={onUsers} onCreateGroup={onCreateGroup} />
      <Register handleClose={handleClose} open={open.user} />
      <Group handleClose={handleClose} open={open.group} />
      <div style={{ height: "85vh" }}>
        <MinChatUiProvider theme="#6ea9d7">
          <MainContainer style={{ display: "flex" }}>
            <ConversationsList
              conversations={conversations}
              setGroup={setGroup}
            />
            <Conversation messages={messages} sendMessage={sendMessage} />
          </MainContainer>
        </MinChatUiProvider>
      </div>
    </div>
  );
}

export default Messages;
