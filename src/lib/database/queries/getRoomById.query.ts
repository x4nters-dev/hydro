import { DB } from "$lib/database/connection";
import { rooms } from "$lib/database/schema";
import { eq } from "drizzle-orm";
import { bufferToDataUrl } from "$lib/utils/bufferToDataUrl.util";
import { getFlowersByRoomId } from "$lib/database/queries/getFlowersByRoomId.query";

export async function getRoomByIdQuery(params: {
	roomId: number;
	omitFlowerImages?: boolean;
}) {
	const room = await DB.query.rooms.findFirst({
		where: eq(rooms.id, params.roomId),
		columns: {
			id: true,
			name: true,
			image: true,
		},
	});

	const flowers = await getFlowersByRoomId(params.roomId);

	return {
		...room,
		image:
			room?.image?.byteLength! > 0
				? bufferToDataUrl(room?.image as Buffer)
				: null,
		flowers: flowers.map((f) => ({
			...f,
			image:
				f.image?.byteLength! > 0 ? bufferToDataUrl(f?.image as Buffer) : null,
		})),
	};
}
