import type { FlowerInterface } from "$lib/interfaces/flower.interface";

export interface WateringHistoryInterface {
	id: number;
	date: Date;
	amount: number | null;
	flower?: FlowerInterface | null;
}
