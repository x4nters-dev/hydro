import { DB_CONNECTION_STRING } from "$lib/consts/databaseConnectionString.const";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

export const DB = drizzle({
	connection: {
		url: DB_CONNECTION_STRING,
	},
	schema,
});
