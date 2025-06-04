import { DB } from "$lib/database/connection";
import { photos, rooms } from "$lib/database/schema";
import { desc, eq } from "drizzle-orm";

export function getRoomByIdQuery(params: {
	roomId: number;
}) {
	return DB.query.rooms.findFirst({
		where: eq(rooms.id, params.roomId),
		columns: {
			id: true,
			name: true,
			image: false,
			thumbnail: true,
		},
		with: {
			flowers: {
				with: {
					conditions: true,
					watering: true,
					photos: {
						limit: 1,
						orderBy: desc(photos.date),
						columns: {
							id: true,
							date: true,
							file: false,
							thumbnail: true,
							filename: false,
							flowerId: false,
						},
					},
				},
			},
		},
	});
}
