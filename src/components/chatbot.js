import React from "react";
import "@elna-ai/chat-widget";

export default function Chatbot() {
  return (
    <div>
      <elna-chat-widget
        agentId="0c61c0c4-8c23-448d-bfc7-96c0bfd1f569"
        logo="/assets/logo4.png"
        headerBackgroundColor="green"
      ></elna-chat-widget>
    </div>
  );
}
