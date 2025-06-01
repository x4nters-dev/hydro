import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
	schema: "./src/lib/database/schema.ts",
	dialect: "sqlite",
	dbCredentials: {
		url: String(process.env.VITE_DB_FILE),
	},
});
