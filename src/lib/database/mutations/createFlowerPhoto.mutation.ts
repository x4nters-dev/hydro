import { DB } from "$lib/database/connection";
import { photos } from "$lib/database/schema";

export interface CreateFlowerPhotoMutationInterface {
	file: string;
	flowerId: number;
	filename: string;
}

export function createFlowerPhotoMutation(
	params: CreateFlowerPhotoMutationInterface,
) {
	return DB.insert(photos).values({
		flowerId: params.flowerId,
		file: params.file,
		filename: params.filename,
		date: new Date(),
	});
}
