import React from "react";
import { ConversationHeader, ConversationList } from "@minchat/react-chat-ui";
import "../style/conversationslist.css";

function ConversationsList({ conversations, setGroup }) {
  return (
    <div className="conversation-list">
      <h1>ConversationHeader</h1>
      <ConversationList
        selectedConversationId="1"
        currentUserId="dan"
        conversations={conversations}
        onConversationClick={(i) => {
          setGroup(conversations[i].id);
        }}
      />
    </div>
  );
}

export default ConversationsList;
