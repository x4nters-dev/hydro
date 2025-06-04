import { DB } from "$lib/database/connection";
import { photos, rooms } from "$lib/database/schema";
import { desc, eq } from "drizzle-orm";

export function getRoomByIdQuery(params: {
	roomId: number;
}) {
	return DB.query.rooms.findFirst({
		where: eq(rooms.id, params.roomId),
		with: {
			flowers: {
				with: {
					conditions: true,
					watering: true,
					photos: {
						limit: 1,
						orderBy: desc(photos.date),
					},
				},
			},
		},
	});
}
