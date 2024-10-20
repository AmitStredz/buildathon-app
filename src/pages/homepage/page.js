import React, { useState } from "react";

import Header from "@/components/header";
import VoiceRecorder from "@/components/voiceBot";

import dynamic from "next/dynamic";
const Chatbot = dynamic(() => import('@/components/chatbot'), { ssr: false });

export default function HomePage() {
  const [successPopup, setSuccessPopup] = useState(false);
  const [failurePopup, setFailurePopUp] = useState(false);
  const [transcript, setTranscript] = useState("");

  const handleTranscript = (transcript) => {
    console.log("transcript: ", transcript);

    setTranscript(transcript);
  };

  const handleSuccess = () => {
    console.log("success...");

    setSuccessPopup(true);
    setTranscript("");
    setTimeout(() => {
      setSuccessPopup(false);
    }, 3000);
  };
  const handleFailure = () => {
    console.log("failure...");

    setFailurePopUp(true);
    setTranscript("");
    setTimeout(() => {
      setFailurePopUp(false);
    }, 3000);
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-r from-[#00F260] to-[#0575E6] font-mono">
      <Header />

      <div className="w-full p-20 flex justify-center items-center">
        <div className="flex flex-col w-full p-20">
          <h1 className="text-[50px] font-bold leading-8">Hey Sinnu!</h1>
          <span className="text-[40px] ">
            I'm Bayaxx, your personal healthcare assistant.
          </span>
          <span className="text-[20px]">How can I help you today?</span>
        </div>
      </div>

      <div className="z-50 absolute bottom-0 left-0 p-5">
        <VoiceRecorder
          size={30}
          padding={5}
          inputMessage={handleTranscript}
          onSuccess={handleSuccess}
          onFailure={handleFailure}
        />
      </div>

      {transcript && (
        <div className="absolute right-0 bottom-5 w-screen flex justify-center items-center z-10">
          <p className=" bg-black bg-opacity-40 text-white p-1 px-2  max-w-[70rem] rounded-lg">
            {transcript}
          </p>
        </div>
      )}

      {failurePopup && (
        <div
          className={`absolute bottom-10 text-center w-screen left-0 transition-all ${
            failurePopup
              ? "opacity-100 transition-all"
              : "opacity-0 transition-all"
          }`}
          //   data-aos="fade-in"
        >
          <span className="bg-red-500 p-3 rounded-xl">
            Failed to save message...
          </span>
        </div>
      )}

      {successPopup && (
        <div
          className={`absolute bottom-10 text-center w-screen left-0 transition-all ${
            successPopup
              ? "opacity-100 transition-all"
              : "opacity-0 transition-all"
          }`}
          //   data-aos="fade-in"
        >
          <span className="bg-green-500 p-3 rounded-xl">
            Message Successfully saved...
          </span>
        </div>
      )}
      <Chatbot />

    </div>
  );
}
