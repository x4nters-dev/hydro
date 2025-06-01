import { DB } from "$lib/database/connection";
import { eq } from "drizzle-orm";
import { flowers } from "$lib/database/schema";

export function getFlowersByRoomId(roomId: number) {
	return DB.query.flowers.findMany({
		where: eq(flowers.roomId, roomId),
		with: {
			conditions: true,
			watering: true,
		},
	});
}
