import type { FlowerInterface } from "$lib/interfaces/flower.interface";

export interface RoomInterface {
	id: number;
	name: string | null;
	image: Buffer | string | null;
	flowers?: Partial<FlowerInterface>[];
}
