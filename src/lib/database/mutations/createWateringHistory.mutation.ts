import { DB } from "$lib/database/connection";
import { wateringHistory } from "$lib/database/schema";
import type { ResultSet } from "@libsql/client";

export interface CreateWateringHistoryMutationInterface {
	flowerId: number;
	amount: number | null;
}

export async function createWateringHistoryMutation(
	params: CreateWateringHistoryMutationInterface,
): Promise<ResultSet> {
	return DB.insert(wateringHistory).values({
		amount: params.amount,
		flowerId: params.flowerId,
		date: new Date(),
	});
}
