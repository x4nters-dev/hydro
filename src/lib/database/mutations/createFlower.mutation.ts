import { DB } from "$lib/database/connection";
import { conditions, flowers, photos, watering } from "$lib/database/schema";
import type { SoilTypeEnum } from "$lib/enums/soilType.enum";

export interface CreateFlowerMutationInterface {
	name: string | null;

	image: string | null;
	thumbnail: string | null;
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
	DB.transaction((tx) => {
		const { flowerId } = tx
			.insert(flowers)
			.values({
				name: params.name,
			})
			.returning({ flowerId: flowers.id })
			.get();

		if (params.image) {
			tx.insert(photos)
				.values({
					flowerId,
					date: new Date(),
					file: params.image,
					filename: params.filename as string,
					thumbnail: params.thumbnail as string,
				})
				.run();
		}

		tx.insert(watering)
			.values({
				flowerId,
				amount: params.watering.amount,
				frequency: params.watering.frequency ?? 1,
			})
			.run();

		tx.insert(conditions)
			.values({
				flowerId,
				soilType: params.conditions.soilType,
				maxTemperature: params.conditions.maxTemperature,
				minTemperature: params.conditions.minTemperature,
			})
			.run();
	});
}
