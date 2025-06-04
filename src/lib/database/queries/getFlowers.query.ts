import { DB } from "$lib/database/connection";
import { photos, wateringHistory } from "$lib/database/schema";
import { desc } from "drizzle-orm";

export function getFlowersQuery() {
	return DB.query.flowers.findMany({
		with: {
			room: {
				columns: {
					id: true,
					name: true,
				},
			},
			conditions: true,
			watering: true,
			wateringHistory: {
				limit: 1,
				orderBy: desc(wateringHistory.date),
			},
			photos: {
				limit: 1,
				orderBy: desc(photos.date),
			},
		},
	});
}
