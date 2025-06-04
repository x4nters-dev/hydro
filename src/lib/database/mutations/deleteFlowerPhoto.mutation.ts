import { DB } from "$lib/database/connection";
import { photos } from "$lib/database/schema";
import { eq } from "drizzle-orm";

export interface DeleteFlowerPhotoMutationInterface {
	photoId: number;
}

export async function deleteFlowerPhotoMutation(
	params: DeleteFlowerPhotoMutationInterface,
) {
	return DB.delete(photos).where(eq(photos.id, params.photoId));
}
