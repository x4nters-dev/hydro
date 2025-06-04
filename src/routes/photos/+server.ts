import { getPhotoFileById } from "$lib/database/queries/getPhotoFileById.query";
import { dataUrlToBlob } from "$lib/utils/dataUrlToBlob.util";
import { error } from "@sveltejs/kit";

export async function GET({ url }) {
	const photoId = url.searchParams.get("photoId");
	if (!photoId) {
		throw error(404);
	}

	const result = await getPhotoFileById(Number(photoId));

	if (!result) {
		throw error(404);
	}

	const file = dataUrlToBlob(result.file);

	return new Response(file, {
		headers: {
			"Content-Type": "application/octet-stream",
			"Content-Disposition": `attachment; filename="${result.filename}"`,
		},
	});
}
