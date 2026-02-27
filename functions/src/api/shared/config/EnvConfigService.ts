import { ConfigService } from "./ConfigService";
import * as dotenv from "dotenv";

// Load environment variables from the appropriate .env file
const environment = process.env.NODE_ENV || "development";
dotenv.config({ path: `.env.${environment}`, override: true });

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`Loaded environment variables from .env.${environment}`)
console.log(`APP_STORAGE_BASE_URL: ${process.env.APP_STORAGE_BASE_URL}`)


export class EnvConfigService implements ConfigService {
    get(key: string): string | undefined {
        return process.env[key];
    }

    getRequired(key: string): string {
        const value = this.get(key);

        if (value === undefined) {
            throw new Error(`Required config key "${key}" not found`);
        }

        return value;
    }
}
