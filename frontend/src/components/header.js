import { useRouter } from "next/router";
import React from "react";

export default function Header() {
  const router = useRouter();
  return (
    <div className="flex justify-between w-screen bg-black bg-opacity-10 p-3 px-20">
      <img
        src="/assets/logo3.png"
        className="w-32 cursor-pointer"
        onClick={() => router.push("/")}
      ></img>
      <div className="flex justify-evenly items-center w-full font-mono font-bold text-[20px]">
        <span
          className="hover:underline cursor-pointer transition-all"
          onClick={() => router.push("/chat")}
        >
          Chat
        </span>
        <span className="hover:underline cursor-pointer transition-all">
          Report
        </span>
      </div>
    </div>
  );
}
