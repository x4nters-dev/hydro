import { DB } from "$lib/database/connection";
import { rooms } from "$lib/database/schema";

export interface CreateRoomMutationInterface {
	name: string | null;
	image: string | null;
	thumbnail: string | null;
}

export function createRoomMutation(params: CreateRoomMutationInterface) {
	return DB.insert(rooms).values({
		name: params.name,
		image: params.image,
		thumbnail: params.thumbnail,
	});
}
