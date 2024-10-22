// import { Actor } from "@dfinity/agent";
// import { idlFactory } from "../candid/your_contract.did";
// import { initializeAgent } from "./icp-agent";
// import { ContractData } from "../types/contract";

// export class ContractService {
//   private actor: any;
//   private readonly canisterId: string;

//   constructor(canisterId: string) {
//     this.canisterId = canisterId;
//   }

//   async initialize() {
//     if (!this.actor) {
//       const agent = initializeAgent();
//       this.actor = Actor.createActor(idlFactory, {
//         agent,
//         canisterId: this.canisterId,
//       });
//     }
//     return this.actor;
//   }

//   async getData(): Promise<ContractData> {
//     await this.initialize();
//     return this.actor.getData();
//   }

//   // Add other contract methods here
// }
