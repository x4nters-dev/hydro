import { DB } from "$lib/database/connection";
import { rooms } from "$lib/database/schema";
import { eq } from "drizzle-orm";
import type { ResultSet } from "@libsql/client";

export interface DeleteRoomMutationInterface {
	roomId: number;
}

export async function deleteRoomMutation(
	params: DeleteRoomMutationInterface,
): Promise<ResultSet> {
	return DB.delete(rooms).where(eq(rooms.id, params.roomId));
}
