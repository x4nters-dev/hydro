import type { ConditionsInterface } from "$lib/interfaces/conditions.interface";
import type { PhotoInterface } from "$lib/interfaces/photo.interface";
import type { WateringInterface } from "$lib/interfaces/watering.interface";
import type { WateringHistoryInterface } from "$lib/interfaces/wateringHistory.interface";

export interface FlowerInterface {
	id: number;
	name: string | null;
	image: string;

	roomId: number | null;
	roomName: string | null;

	watering: WateringInterface;
	conditions: ConditionsInterface;
	wateringHistory: WateringHistoryInterface[];
	photos: PhotoInterface[];
}
