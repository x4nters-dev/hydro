import { DB } from "$lib/database/connection";
import { flowers } from "$lib/database/schema";
import { eq } from "drizzle-orm";

export interface AssignFlowerToRoomMutationInterface {
	roomId: number;
	flowerId: number;
}

export function assignFlowerToRoomMutation(
	params: AssignFlowerToRoomMutationInterface,
) {
	return DB.update(flowers)
		.set({
			roomId: params.roomId,
		})
		.where(eq(flowers.id, params.flowerId));
}
