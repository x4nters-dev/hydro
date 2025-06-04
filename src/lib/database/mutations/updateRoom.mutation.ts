import { DB } from "$lib/database/connection";
import { rooms } from "$lib/database/schema";
import { eq } from "drizzle-orm";

export interface UpdateRoomMutationInterface {
	roomId: number;
	name: string | null;
	image: string | null;
}

export function updateRoomMutation(params: UpdateRoomMutationInterface) {
	const roomUpdate: Record<string, unknown> = {
		name: params.name,
	};

	if (params.image && params.image.length > 0) {
		roomUpdate.image = params.image;
	}

	return DB.update(rooms).set(roomUpdate).where(eq(rooms.id, params.roomId));
}
