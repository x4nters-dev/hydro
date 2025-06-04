import type { DailyTaskInterface } from "$lib/interfaces/dailyTask.interface";
import type { FlowerInterface } from "$lib/interfaces/flower.interface";
import { differenceInDays } from "date-fns";

export function getDailyTasks(
	flowers: FlowerInterface[],
): DailyTaskInterface[] {
	const tasks: DailyTaskInterface[] = [];
	const currentDate = new Date();

	for (const flower of flowers) {
		let needsWatering = false;
		const lastWatering = flower.wateringHistory?.[0]?.date;

		if (lastWatering) {
			const diff = differenceInDays(lastWatering, currentDate);

			if (flower.watering?.frequency) {
				needsWatering = diff > flower.watering.frequency;
			} else {
				needsWatering = diff >= 1;
			}
		} else {
			needsWatering = true;
		}

		tasks.push({
			id: flower.id,
			flower: {
				id: flower.id,
				name: flower.name,
				image: flower.photos.at(0)?.thumbnail ?? null,
			},
			done: !needsWatering,
			conditions: {
				maxTemperature: flower.conditions?.maxTemperature,
				soilType: flower.conditions?.soilType,
				minTemperature: flower.conditions?.minTemperature,
			},
			watering: {
				amount: flower.watering?.amount,
				lastWateringData: flower.wateringHistory?.[0]?.date ?? null,
				frequency: flower.watering?.frequency,
			},
			history: flower.wateringHistory?.map((h) => ({
				date: h.date,
				amount: h.amount,
			})),
		});
	}

	return tasks;
}
