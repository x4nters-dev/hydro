import { DB } from "$lib/database/connection";
import { flowers, photos, wateringHistory } from "$lib/database/schema";
import { addMonths } from "date-fns";
import { between, desc, eq } from "drizzle-orm";

export function getFlowerByIdQuery(params: {
	flowerId: number;
}) {
	return DB.query.flowers.findFirst({
		where: eq(flowers.id, params.flowerId),
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
				where: between(
					wateringHistory.date,
					addMonths(new Date(), -1),
					new Date(),
				),
			},
			photos: {
				orderBy: desc(photos.date),
			},
		},
	});
}
