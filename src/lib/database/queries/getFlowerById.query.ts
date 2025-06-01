import { DB } from "$lib/database/connection";
import { flowers, wateringHistory } from "$lib/database/schema";
import { between, eq } from "drizzle-orm";
import { bufferToDataUrl } from "$lib/utils/bufferToDataUrl.util";

export async function getFlowerByIdQuery(params: {
	flowerId: number;
	history: { start: Date; end: Date };
}) {
	const flower = await DB.query.flowers.findFirst({
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
					params.history.start,
					params.history.end,
				),
			},
		},
	});

	if (!flower) return null;

	return {
		...flower,
		image:
			flower.image && flower.image.byteLength > 0
				? bufferToDataUrl(flower.image)
				: null,
	};
}
