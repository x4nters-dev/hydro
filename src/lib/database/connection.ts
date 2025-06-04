import * as fs from "node:fs";
import { DATA_FOLDER } from "$lib/consts/dataFolder.const";
import { DB_CONNECTION_STRING } from "$lib/consts/databaseConnectionString.const";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import * as schema from "./schema";

fs.mkdirSync(DATA_FOLDER, { recursive: true });

const sqlite = new Database(DB_CONNECTION_STRING);
sqlite.pragma("journal_mode = WAL");
sqlite.pragma("temp_store = MEMORY");
sqlite.pragma("cache_size = -256000");
sqlite.pragma("foreign_keys = ON");
sqlite.pragma("synchronous = NORMAL");

export const DB = drizzle(sqlite, {
	schema,
});

migrate(DB, { migrationsFolder: "drizzle" });
