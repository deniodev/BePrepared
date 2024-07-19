import { createClient, RedisClientType } from "redis";

class Redis {
  #client?: RedisClientType;

  constructor() {
    this.#initializeClient();
  }

  async #initializeClient() {
    this.#client = createClient();

    this.#client.on("error", (err) => {
      console.error("Redis Client Error", err);
      throw new Error("Redis connection failed");
    });

    try {
      await this.#client.connect();
      console.log("Successfully connected to Redis!");
    } catch (err) {
      console.error("Redis connection error", err);
      throw new Error("Redis connection failed");
    }
  }

  async set(key: string, value: string | number, duration: number) {
    if (!this.#client) {
      await this.#initializeClient();
    }
    await this.#client!.set(key, value, {
      EX: duration,
    });
  }

  async get(key: string) {
    if (!this.#client) {
      await this.#initializeClient();
    }
    const value = await this.#client!.get(key);
    return value !== null ? value : null;
  }

  async delete(key: string) {
    if (!this.#client) {
      await this.#initializeClient();
    }
    await this.#client!.del(key);
  }
}

export const redis = new Redis();
