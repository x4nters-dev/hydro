import type { FlowerInterface } from "$lib/interfaces/flower.interface";

export interface WateringInterface {
	id: number;
	frequency: number | null;
	amount: number | null;
	flower?: FlowerInterface;
}
