import { DB } from "$lib/database/connection";
import { flowers, photos } from "$lib/database/schema";
import { desc, eq } from "drizzle-orm";

export function getFlowersByRoomId(roomId: number) {
	return DB.query.flowers.findMany({
		where: eq(flowers.roomId, roomId),
		with: {
			conditions: true,
			watering: true,
			photos: {
				limit: 1,
				orderBy: desc(photos.date),
			},
		},
	});
}
