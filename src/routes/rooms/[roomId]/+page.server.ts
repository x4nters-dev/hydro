import { getRoomByIdQuery } from "$lib/database/queries/getRoomById.query";
import { type Actions, fail, redirect } from "@sveltejs/kit";
import { parseFormData } from "$lib/utils/parseFormData.util";
import { deleteRoomMutation } from "$lib/database/mutations/deleteRoom.mutation";
import {
	updateRoomMutation,
	type UpdateRoomMutationInterface,
} from "$lib/database/mutations/updateRoom.mutation";

export async function load({ params }) {
	const roomId = Number(params.roomId);
	const room = await getRoomByIdQuery({
		roomId,
		omitFlowerImages: false,
	});

	if (!room) {
		return redirect(304, "/rooms");
	}

	return { room };
}

export const actions: Actions = {
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

		if (result.rowsAffected > 0) {
			return redirect(302, "/rooms");
		}

		return fail(400);
	},
};
