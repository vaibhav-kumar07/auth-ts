import Redis from "ioredis";
import CommonVariables from "../../../config";

export default class RedisDB {
    private static client: Redis | null = null;
    private static REDIS_URI = CommonVariables.REDIS_URI as string;

    static connect(): void {
        console.log("🔄 Trying to connect Redis with URI:", this.REDIS_URI);

        try {
            this.client = new Redis(this.REDIS_URI);

            this.client.on("connect", () => console.log("✅ Connected to Redis."));
            this.client.on("error", (err) => {
                console.error("❌ Redis Error:", err);
            });

        } catch (error) {
            console.error("🚨 Redis Connection Failed:", error);
        }
    }

    static getClient(): Redis {
        if (!this.client) throw new Error("⚠️ Redis not connected.");
        return this.client;
    }

    static async disconnect(): Promise<void> {
        if (this.client) {
            await this.client.quit();
            this.client = null;
            console.log("🚪 Disconnected from Redis.");
        }
    }
}
