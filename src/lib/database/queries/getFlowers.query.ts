import { DB } from "$lib/database/connection";
import { wateringHistory } from "$lib/database/schema";
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
				limit: 10,
				orderBy: desc(wateringHistory.date),
			},
		},
	});
}
