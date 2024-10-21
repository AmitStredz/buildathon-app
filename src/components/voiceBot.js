import React, { useEffect, useState } from "react";
import { FaMicrophone } from "react-icons/fa6";
import { BsFillStopCircleFill } from "react-icons/bs";
import axios from "axios";

import { Actor, HttpAgent } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client"; // Used for authentication
import canisterIDL from "./your_canister_idl"; // Import the IDL of your canister
import { Principal } from "@dfinity/principal";

const canisterId = "zkfwe-6yaaa-aaaab-qacca-cai";

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
    const storedKey = localStorage.getItem("key");
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
        // uploadTranscript(transcript);
        handleSubmit(transcript);
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
        // uploadTranscript(transcript);
        handleSubmit(transcript);
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

  // Handle form submission
  const handleSubmit = async (text) => {
    // setLoading(true);
    console.log("uploading to pinata...");

    const hash = await uploadToPinata(text);
    console.log("Succeffully uploaded to pinata...>");

    if (hash) {
      console.log("IPFS Hash:", hash);
      // setIpfsHash(hash);

      // Pass the hash to the smart contract
      console.log("Passing to Smart Contract...");

      await passToCanister(hash);
      console.log("SUccessfully uploaded to smart contract...");

      setTranscript("");
      onSuccess();
    }
    // setLoading(false);
  };

  const pinataApiKey = "e4bd028e7f7272ebb152";
  const pinataSecretApiKey =
    "ac592733c1860bce078f0ca0034d65d5ea3cb4779e8881c5ecfea61fe6d204ea";

  // Upload the text to Pinata IPFS
  const uploadToPinata = async (text) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    const data = {
      textContent: text,
    };

    try {
      const res = await axios.post(url, data, {
        headers: {
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key: pinataSecretApiKey,
        },
      });

      return res.data.IpfsHash; // Pinata returns the IPFS hash
    } catch (error) {
      onFailure();
      console.error("Error uploading to Pinata:", error);
      return null;
    }
  };

  const passToCanister = async (ipfsHash) => {
    try {
      // Initialize authentication client
      const authClient = await AuthClient.create();

      // Request the user to authenticate (connect to ICP wallet)
      await authClient.login({
        identityProvider: "https://identity.ic0.app/#authorize",
      });

      const identity = await authClient.getIdentity();

      // Create an HttpAgent to interact with the ICP canister
      const agent = new HttpAgent({ identity });

      // If you're working locally, use this line to connect to a local replica:
      // agent.fetchRootKey();

      // Create an Actor to interact with the canister
      const actor = Actor.createActor(canisterIDL, {
        agent,
        canisterId: canisterId,
      });

      // Call the canister function to store IPFS hash
      const result = await actor.add(ipfsHash);

      console.log("Transaction successful:", result);
    } catch (error) {
      console.error("Error calling canister:", error);
    }
  };

  // // Interact with the smart contract
  // const passToSmartContract = async (ipfsHash) => {
  //   try {
  //     return;
  //     // Request user to connect wallet (MetaMask)
  //     await window.ethereum.request({ method: "eth_requestAccounts" });

  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     const signer = provider.getSigner();

  //     // Create a contract instance
  //     const contract = new ethers.Contract(
  //       contractAddress,
  //       contractABI,
  //       signer
  //     );

  //     // Call the contract function to store IPFS hash
  //     const tx = await contract.storeIpfsHash(ipfsHash);
  //     await tx.wait(); // Wait for the transaction to be confirmed
  //     console.log("Transaction successful:", tx);
  //   } catch (error) {
  //     console.error("Error calling smart contract:", error);
  //   }
  // };

  // const [date, setDate] = useState("");
  // const [cid, setCid] = useState("");
  // const [retrieveDate, setRetrieveDate] = useState("");
  // const [result, setResult] = useState("");

  // // Function to add CID
  // const addCID = async () => {
  //   try {
  //     const tx = await ipfsContract.addCID(date, cid);
  //     await tx.wait(); // Wait for the transaction to be mined
  //     alert("CID added successfully!");
  //   } catch (error) {
  //     console.error("Failed to add CID:", error);
  //     alert("Failed to add CID: " + error.message);
  //   }
  // };

  // // Function to retrieve CIDs by date
  // const getCIDs = async () => {
  //   try {
  //     const cids = await ipfsContract.getCIDs(retrieveDate);
  //     setResult(`CIDs for ${retrieveDate}: ${cids.join(", ")}`);
  //   } catch (error) {
  //     console.error("Failed to retrieve CIDs:", error);
  //     alert("Failed to retrieve CIDs: " + error.message);
  //   }
  // };

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
