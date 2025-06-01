import { DB } from "$lib/database/connection";
import { rooms } from "$lib/database/schema";
import type { ResultSet } from "@libsql/client";

export interface CreateRoomMutationInterface {
	id: number;
	name: string | null;
	image: Buffer | null;
}

export async function createRoomMutation(
	params: CreateRoomMutationInterface,
): Promise<ResultSet> {
	return DB.insert(rooms).values(params);
}
