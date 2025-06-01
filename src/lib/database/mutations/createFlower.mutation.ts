import { DB } from "$lib/database/connection";
import { conditions, flowers, watering } from "$lib/database/schema";
import type { SoilTypeEnum } from "$lib/enums/soilType.enum";

export interface CreateFlowerMutationInterface {
	name: string | null;
	image: Buffer | string | null;
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

export async function createFlowerMutation(
	params: CreateFlowerMutationInterface,
): Promise<number> {
	return DB.transaction(async (tx) => {
		const [result] = await tx
			.insert(flowers)
			.values({
				name: params.name,
				image: params.image as Buffer | null,
			})
			.returning({ id: flowers.id });

		await tx.insert(watering).values({
			flowerId: result.id,
			amount: params.watering.amount,
			frequency: params.watering.frequency,
		});

		await tx.insert(conditions).values({
			flowerId: result.id,
			soilType: params.conditions.soilType,
			maxTemperature: params.conditions.maxTemperature,
			minTemperature: params.conditions.minTemperature,
		});

		return result.id;
	});
}
