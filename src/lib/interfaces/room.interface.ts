import type { FlowerInterface } from "$lib/interfaces/flower.interface";

export interface RoomInterface {
	id: number;
	name: string | null;
	image: string | null;
	flowers: FlowerInterface[];
}
