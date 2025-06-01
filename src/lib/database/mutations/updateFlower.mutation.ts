import { DB } from "$lib/database/connection";
import { conditions, flowers, watering } from "$lib/database/schema";
import type { SoilTypeEnum } from "$lib/enums/soilType.enum";
import { eq } from "drizzle-orm";

export interface UpdateFlowerMutationInterface {
	flowerId: number;
	name: string | null;
	image: Buffer | null;

	roomId: number | null;

	watering: {
		frequency: number | null;
		amount: number | null;
	};
	conditions: {
		minTemperature: number | null;
		maxTemperature: number | null;
		soilType: SoilTypeEnum | null;
	};
}

export async function updateFlowerMutation(
	params: UpdateFlowerMutationInterface,
): Promise<void> {
	const flowerUpdate: Record<string, unknown> = {
		name: params.name,
		roomId: params.roomId ?? null,
	};

	if (params.image && params.image.byteLength > 0) {
		flowerUpdate.image = params.image;
	}

	await DB.update(flowers)
		.set(flowerUpdate)
		.where(eq(flowers.id, params.flowerId));

	await DB.update(watering)
		.set({
			amount: params.watering.amount,
			frequency: params.watering.frequency,
		})
		.where(eq(watering.flowerId, params.flowerId));

	await DB.update(conditions)
		.set({
			minTemperature: params.conditions.minTemperature,
			soilType: params.conditions.soilType,
			maxTemperature: params.conditions.maxTemperature,
		})
		.where(eq(conditions.flowerId, params.flowerId));
}
