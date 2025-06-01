import { DB } from "$lib/database/connection";
import { rooms } from "$lib/database/schema";
import type { ResultSet } from "@libsql/client";
import { eq } from "drizzle-orm";

export interface DeleteRoomMutationInterface {
	roomId: number;
}

export async function deleteRoomMutation(
	params: DeleteRoomMutationInterface,
): Promise<ResultSet> {
	return DB.delete(rooms).where(eq(rooms.id, params.roomId));
}
