import { HttpAgent } from "@dfinity/agent";

export const initializeAgent = () => {
  const agent = new HttpAgent({
    host: "https://ic0.app", // or your local network
  });

  if (process.env.NODE_ENV !== "production") {
    agent.fetchRootKey().catch(console.error);
  }

  return agent;
};