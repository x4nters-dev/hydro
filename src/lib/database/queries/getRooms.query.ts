import { DB } from "$lib/database/connection";
import { photos } from "$lib/database/schema";
import { desc } from "drizzle-orm";

export function getRoomsQuery() {
	return DB.query.rooms.findMany({
		with: {
			flowers: {
				columns: {
					id: true,
					name: true,
				},
				with: {
					photos: {
						limit: 1,
						orderBy: desc(photos.date),
					},
					watering: true,
					conditions: true,
					wateringHistory: true,
				},
			},
		},
		columns: {
			id: true,
			name: true,
			image: true,
		},
	});
}
