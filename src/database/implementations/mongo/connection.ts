import mongoose from "mongoose";
import CommonVariables from "../../../config";


export default class MongoDB {
    private static isConnected = false;

    /**
     * @returns {Promise<void>}
     */

    static async connect(): Promise<void> {
        if (this.isConnected) {
            console.log("✅ Already connected to MongoDB.");
            return;
        }

        const { MONGO_URI, MONGO_DB_NAME, MONGO_TIMEOUT } = CommonVariables;
        if (!MONGO_URI) {
            throw new Error("❌ MONGO_URI is not defined in environment variables.");
        }

        try {
            console.log(`🔗 Connecting to MongoDB... : ${MONGO_URI}`);
            await mongoose.connect(MONGO_URI, {
                dbName: MONGO_DB_NAME
            });

            this.isConnected = true;
            console.log("✅ Successfully connected to MongoDB.");
        } catch (error) {
            console.error("❌ MongoDB connection failed:", error);
            process.exit(1);
        }
    }

    /**
     * Disconnect from MongoDB database
     * @returns {Promise<void>}
     */
    static async disconnect(): Promise<void> {
        if (!this.isConnected) {
            console.log("⚠️ Not connected to MongoDB, skipping disconnect.");
            return;
        }

        try {
            await mongoose.disconnect();
            this.isConnected = false;
            console.log("🚪 Disconnected from MongoDB.");
        } catch (error) {
            console.error("❌ Error disconnecting from MongoDB:", error);
        }
    }
}
