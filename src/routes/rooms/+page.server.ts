import {
	type CreateRoomMutationInterface,
	createRoomMutation,
} from "$lib/database/mutations/createRoom.mutation";
import { deleteRoomMutation } from "$lib/database/mutations/deleteRoom.mutation";
import {
	type UpdateRoomMutationInterface,
	updateRoomMutation,
} from "$lib/database/mutations/updateRoom.mutation";
import { getRoomsQuery } from "$lib/database/queries/getRooms.query";
import type { RoomInterface } from "$lib/interfaces/room.interface";
import { bufferToDataUrl } from "$lib/utils/bufferToDataUrl.util";
import { parseFormData } from "$lib/utils/parseFormData.util";
import type { Actions } from "@sveltejs/kit";

export async function load() {
	const rooms = ((await getRoomsQuery()) as RoomInterface[]).map((r) => ({
		...r,
		image:
			r.image && (r.image as Buffer).byteLength > 0
				? bufferToDataUrl(r.image as Buffer)
				: null,
	}));

	return { rooms };
}

export const actions: Actions = {
	addRoom: async ({ request }) => {
		const payload = (await parseFormData(
			await request.formData(),
		)) as CreateRoomMutationInterface;
		const result = await createRoomMutation(payload);

		return { success: result.rowsAffected > 0 };
	},
	editRoom: async ({ request }) => {
		const payload = (await parseFormData(
			await request.formData(),
		)) as UpdateRoomMutationInterface;
		await updateRoomMutation(payload);

		return { success: true };
	},
	deleteRoom: async ({ request }) => {
		const payload = (await parseFormData(await request.formData())) as {
			roomId: string;
		};
		const roomId = Number(payload.roomId);
		const result = await deleteRoomMutation({ roomId });

		return { success: result.rowsAffected > 0 };
	},
};
