import React from "react";
import Header from "@/components/header";
import dynamic from "next/dynamic";

// Dynamically import Chatbot with SSR disabled
const Chatbot = dynamic(() => import('@/components/chatbot'), { ssr: false });

export default function Index() {
  return (
    <div className="w-ful h-screen bg-gradient-to-r from-[#00F260] to-[#0575E6] font-mono">
      <Header />
      <Chatbot />
    </div>
  );
}
