import { DB } from "$lib/database/connection";
import { wateringHistory } from "$lib/database/schema";
import { between } from "drizzle-orm";

export async function getWateringHistoryQuery(params: {
	start: Date;
	end: Date;
}) {
	return DB.query.wateringHistory.findMany({
		with: {
			flower: {
				columns: {
					id: true,
					name: true,
				},
			},
		},
		where: between(wateringHistory.date, params.start, params.end),
	});
}
