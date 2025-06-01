import type { ConditionsInterface } from "$lib/interfaces/conditions.interface";
import type { RoomInterface } from "$lib/interfaces/room.interface";
import type { WateringInterface } from "$lib/interfaces/watering.interface";
import type { WateringHistoryInterface } from "$lib/interfaces/wateringHistory.interface";

export interface FlowerInterface {
	id: number;
	name: string | null;
	image: Buffer | string | null;

	roomId: number | null;
	room?: RoomInterface | null;

	watering: WateringInterface;
	conditions: ConditionsInterface;
	wateringHistory?: WateringHistoryInterface[] | null;
}
