import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

export const DB = drizzle(import.meta.env.VITE_DB_FILE, { schema });
