import { DB } from "$lib/database/connection";
import { rooms } from "$lib/database/schema";
import type { ResultSet } from "@libsql/client";
import { eq } from "drizzle-orm";

export interface UpdateRoomMutationInterface {
	roomId: number;
	name: string | null;
	image: Buffer | null;
}

export async function updateRoomMutation(
	params: UpdateRoomMutationInterface,
): Promise<ResultSet> {
	const roomUpdate: Record<string, unknown> = {
		name: params.name,
	};

	if (params.image && params.image.byteLength > 0) {
		roomUpdate.image = params.image;
	}

	return DB.update(rooms).set(roomUpdate).where(eq(rooms.id, params.roomId));
}
