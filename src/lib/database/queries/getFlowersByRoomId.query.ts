import { DB } from "$lib/database/connection";
import { flowers } from "$lib/database/schema";
import { eq } from "drizzle-orm";

export function getFlowersByRoomId(roomId: number) {
	return DB.query.flowers.findMany({
		where: eq(flowers.roomId, roomId),
		with: {
			conditions: true,
			watering: true,
		},
	});
}
