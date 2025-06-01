import { DB } from "$lib/database/connection";
import { wateringHistory } from "$lib/database/schema";
import type { ResultSet } from "@libsql/client";

export async function deleteWateringHistoryMutation(): Promise<ResultSet> {
	return DB.delete(wateringHistory);
}
