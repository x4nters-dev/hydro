import { DB } from "$lib/database/connection";
import { wateringHistory } from "$lib/database/schema";
import { addMonths } from "date-fns";
import { between } from "drizzle-orm";

export function getWateringHistoryQuery() {
	return DB.query.wateringHistory.findMany({
		with: {
			flower: {
				columns: {
					id: true,
					name: true,
				},
			},
		},
		where: between(wateringHistory.date, addMonths(new Date(), -1), new Date()),
	});
}
