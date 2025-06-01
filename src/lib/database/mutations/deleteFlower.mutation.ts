import { DB } from "$lib/database/connection";
import { flowers } from "$lib/database/schema";
import { eq } from "drizzle-orm";
import type { ResultSet } from "@libsql/client";

export interface DeleteFlowerMutationInterface {
	flowerId: number;
}

export async function deleteFlowerMutation(
	params: DeleteFlowerMutationInterface,
): Promise<ResultSet> {
	return DB.delete(flowers).where(eq(flowers.id, params.flowerId));
}
