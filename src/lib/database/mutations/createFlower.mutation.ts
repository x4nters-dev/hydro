import { DB } from "$lib/database/connection";
import { conditions, flowers, photos, watering } from "$lib/database/schema";
import type { SoilTypeEnum } from "$lib/enums/soilType.enum";

export interface CreateFlowerMutationInterface {
	name: string | null;
	image: string | null;
	filename: string | null;

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

export function createFlowerMutation(params: CreateFlowerMutationInterface) {
	return DB.transaction(async (tx) => {
		const [result] = await tx
			.insert(flowers)
			.values({
				name: params.name,
			})
			.returning({ id: flowers.id });

		if (params.image) {
			await tx.insert(photos).values({
				flowerId: result.id,
				date: new Date(),
				file: params.image,
				filename: params.filename as string,
			});
		}

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
