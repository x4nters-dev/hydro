import { DB } from "$lib/database/connection";
import { flowers } from "$lib/database/schema";
import type { ResultSet } from "@libsql/client";
import { eq } from "drizzle-orm";

export interface DeleteFlowerMutationInterface {
	flowerId: number;
}

export async function deleteFlowerMutation(
	params: DeleteFlowerMutationInterface,
): Promise<ResultSet> {
	return DB.delete(flowers).where(eq(flowers.id, params.flowerId));
}
