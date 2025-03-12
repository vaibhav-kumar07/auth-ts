import dotenv from "dotenv";
dotenv.config();

export default class CommonVariables {
    static readonly PORT: string = process.env.PORT || "6001";
    static readonly MONGO_URI: string = process.env.MONGO_URI || "";
    static readonly MONGO_DB_NAME: string = process.env.MONGO_DB_NAME || "Service";
    static readonly MONGO_TIMEOUT: number = Number(process.env.MONGO_TIMEOUT) || 10000;
    static readonly NODE_ENV: string = process.env.NODE_ENV || "development";
    static readonly APP_SERVICE_NAME: string = process.env.APP_SERVICE_NAME || "AuthService";
    static readonly JWT_SECRET: string = process.env.JWT_SECRET || "";
    static readonly JWT_SECRET_TIMEOUT: any = process.env.JWT_SECRET_TIMEOUT;
    static readonly ENCRYPTION_KEY: string = process.env.CRYPTO_ENCRYPTION_KEY || "";
    static readonly REDIS_URI: string = process.env.REDIS_URI || "";
    static readonly ALLOWED_DATABASES: string[] = process.env.ALLOWED_DATABASES
        ? process.env.ALLOWED_DATABASES.split(",").map((db) => db.trim())
        : [];

    static Initiate() {
        const requiredVars = ["MONGO_URI", "JWT_SECRET", "JWT_SECRET_TIMEOUT", "CRYPTO_ENCRYPTION_KEY", "REDIS_URI"];

        requiredVars.forEach((variable) => {
            const value = process.env[variable]?.trim();
            if (!value) {
                throw new Error(`❌ Missing or empty environment variable: ${variable}`);
            }
        });

        // Validate MONGO_DB_NAME against allowed databases
        if (!CommonVariables.ALLOWED_DATABASES.includes(CommonVariables.MONGO_DB_NAME)) {
            throw new Error(`❌ Unauthorized Database Access: ${CommonVariables.MONGO_DB_NAME} is not in the allowed list.`);
        }

        console.log("✅ Common Variables Initiated Successfully!");
    }

    static getAccessTokenSecret(): string {
        if (!CommonVariables.JWT_SECRET_TIMEOUT) {
            throw new Error("❌ Access token secret not found in environment variables.");
        }
        return CommonVariables.JWT_SECRET_TIMEOUT;
    }
}
