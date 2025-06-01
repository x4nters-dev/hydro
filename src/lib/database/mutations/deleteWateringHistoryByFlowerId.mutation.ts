import { DB } from "$lib/database/connection";
import { wateringHistory } from "$lib/database/schema";
import type { ResultSet } from "@libsql/client";
import { eq } from "drizzle-orm";

export interface DeleteWateringHistoryByFlowerIdMutationInterface {
	flowerId: number;
}

export async function deleteWateringHistoryByFlowerIdMutation(
	params: DeleteWateringHistoryByFlowerIdMutationInterface,
): Promise<ResultSet> {
	return DB.delete(wateringHistory).where(
		eq(wateringHistory.flowerId, params.flowerId),
	);
}
