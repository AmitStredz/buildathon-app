import { Actor } from "@dfinity/agent";
import { initializeAgent } from "./icp-agent";

export class CCIDTrackerService {
  constructor(canisterId) {
    this.canisterId = canisterId;
    this.actor = null;
  }

  async initialize() {
    if (!this.actor) {
      const agent = initializeAgent();
      // Note: You'll need to import your actual IDL factory
      this.actor = Actor.createActor(idlFactory, {
        agent,
        canisterId: this.canisterId,
      });
    }
    return this.actor;
  }

  async add(text) {
    await this.initialize();
    return this.actor.add(text);
  }

  async getDateData(date) {
    await this.initialize();
    const result = await this.actor.get_date_data(date);
    return result[0] || undefined; // Converting opt to undefined if empty
  }

  async getAllData() {
    await this.initialize();
    return this.actor.get_all_data();
  }

  async formatDate(date) {
    await this.initialize();
    return this.actor.format_date(date);
  }
}