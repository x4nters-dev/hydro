import { DEFAULT_FLOWER_IMAGE } from "$lib/consts/defaultFlowerImage.const";
import { DEFAULT_ROOM_IMAGE } from "$lib/consts/defaultRoomImage.const";
import { assignFlowerToRoomMutation } from "$lib/database/mutations/assignFlowerToRoom.mutation";
import { deleteRoomMutation } from "$lib/database/mutations/deleteRoom.mutation";
import {
	type UpdateRoomMutationInterface,
	updateRoomMutation,
} from "$lib/database/mutations/updateRoom.mutation";
import { getFlowersWithoutRoom } from "$lib/database/queries/getFlowersWithoutRoom.query";
import { getRoomByIdQuery } from "$lib/database/queries/getRoomById.query";
import type { RoomInterface } from "$lib/interfaces/room.interface";
import { parseFormData } from "$lib/utils/parseFormData.util";
import { type Actions, fail, redirect } from "@sveltejs/kit";

interface PageDataInterface {
	room: RoomInterface;
	flowers: { id: number; name: string | null }[];
}

export async function load({ params }): Promise<PageDataInterface> {
	const roomId = Number(params.roomId);
	const room = await getRoomByIdQuery({ roomId });

	if (!room) {
		return redirect(304, "/rooms");
	}

	const flowers = await getFlowersWithoutRoom(roomId);

	return {
		room: {
			flowers: room.flowers.map((f) => ({
				roomId: f.roomId,
				id: f.id,
				conditions: {
					flowerId: f.conditions.flowerId,
					soilType: f.conditions.soilType,
					minTemperature: f.conditions.minTemperature,
					maxTemperature: f.conditions.maxTemperature,
				},
				name: f.name,
				roomName: room.name,
				image: f.photos[0]?.file ?? DEFAULT_FLOWER_IMAGE,
				watering: {
					flowerId: f.watering.flowerId,
					amount: f.watering.amount,
					frequency: f.watering.frequency,
				},
				photos: [],
				wateringHistory: [],
			})),
			name: room.name,
			image: room.image ?? DEFAULT_ROOM_IMAGE,
			id: room.id,
		},
		flowers: flowers.map((f) => ({
			id: f.id,
			name: f.name,
		})),
	};
}

export const actions: Actions = {
	assignFlower: async ({ request }) => {
		const formData = await request.formData();
		const payload = await parseFormData<{ flowerId: number; roomId: number }>(
			formData,
		);
		await assignFlowerToRoomMutation({
			flowerId: payload.flowerId,
			roomId: payload.roomId,
		});
	},
	editRoom: async ({ request }) => {
		const formData = await request.formData();
		const payload = await parseFormData<UpdateRoomMutationInterface>(formData);
		await updateRoomMutation(payload);

		return redirect(302, `/rooms/${payload.roomId}`);
	},
	deleteRoom: async ({ request }) => {
		const formData = await request.formData();
		const payload = await parseFormData<{
			roomId: string;
		}>(formData);
		const roomId = Number(payload.roomId);
		const result = await deleteRoomMutation({ roomId });

		if (result.rowsAffected > 0) {
			return redirect(302, "/rooms");
		}

		return fail(400);
	},
};
