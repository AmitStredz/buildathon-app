import React, { useEffect, useState } from "react";
import { FaMicrophone } from "react-icons/fa6";
import { BsFillStopCircleFill } from "react-icons/bs";
import axios from "axios";

const VoiceRecorder = ({
  padding,
  size,
  inputMessage = () => {},
  onSuccess = () => {},
  onFailure = () => {},
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [recognition, setRecognition] = useState(null);
  const [key, setKey] = useState(null);

  useEffect(() => {
    // This runs only on the client-side
    const storedKey = localStorage.getItem('key');
    setKey(storedKey);
  }, []);

  // const key = localStorage.getItem("key");

  const initializeRecognition = () => {
    const recognitionInstance = new window.webkitSpeechRecognition(); // Use 'SpeechRecognition' for non-Chrome browsers
    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = true;
    recognitionInstance.lang = "en-US";

    recognitionInstance.onresult = (event) => {
      const transcriptText = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      setTranscript(transcriptText);
      inputMessage(transcriptText);
    };

    recognitionInstance.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognitionInstance.onend = () => {
      setIsRecording(false);
      // Call API to upload the transcript once the recording stops
      if (transcript) {
        uploadTranscript(transcript);
        inputMessage(transcript);
      }
    };

    setRecognition(recognitionInstance);
  };

  const toggleRecording = () => {
    if (isRecording) {
      console.log("Recording stopped...");
      recognition.stop();
      if (transcript) {
        uploadTranscript(transcript);
      }
      setIsRecording(false);
    } else {
      console.log("Recording started...");
      recognition.start();
      setIsRecording(true);
    }
  };
  
  const uploadTranscript = async (text) => {
    const data = {
      msg: text,
      date: "",
    };

    console.log("Voicedata: ", data);

    try {
      console.log("Uploading transcript to the backend...");

      const response = await axios.post("http://127.0.0.1:8000/aichat/", data, {
        headers: {
          Authorization: `token ${key}`,
        },
      });

      console.log("response: ", response);

      if (response?.data) {
        setTranscript("");
        onSuccess();
        convertTextToSpeech(response.data); // Call the function to convert the response to speech
        return response?.data;
      } else {
        console.error("Invalid response data:", response.data);
        onFailure();
      }
    } catch (error) {
      onFailure();
      console.error("Error uploading transcript:", error);
    }
  };

  const convertTextToSpeech = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US"; // Set language (adjust as needed)
    speech.pitch = 1; // You can modify pitch, rate, and volume
    speech.rate = 1;
    window.speechSynthesis.speak(speech);
  };

  React.useEffect(() => {
    if (!recognition) {
      initializeRecognition();
    }
  }, [recognition]);

  const dynamicPaddingClass = `p-${padding}`;

  return (
    <div className=" relative">
      <button
        onClick={toggleRecording}
        className={`flex items-center justify-center bg-[#358be2cc] ${dynamicPaddingClass} rounded-full cursor-pointer`}
      >
        {isRecording ? (
          <BsFillStopCircleFill size={size} />
        ) : (
          <FaMicrophone size={size} />
        )}
      </button>
      {/* {transcript && (
        <div className="absolute right-0 bottom-5 w-screen flex justify-center items-center -z-10">
          <p className=" bg-black bg-opacity-40 text-white p-1 px-2  max-w-[70rem] rounded-lg">
            {transcript}
          </p>
        </div>
      )} */}
    </div>
  );
};

export default VoiceRecorder;
