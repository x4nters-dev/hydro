import { DB } from "$lib/database/connection";
import { photos } from "$lib/database/schema";
import { eq } from "drizzle-orm";

export function getPhotoFileById(photoId: number) {
	return DB.query.photos.findFirst({
		where: eq(photos.id, photoId),
		columns: {
			file: true,
			filename: true,
		},
	});
}
