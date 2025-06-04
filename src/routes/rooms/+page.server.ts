import { DEFAULT_ROOM_IMAGE } from "$lib/consts/defaultRoomImage.const";
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
import { compressImage } from "$lib/utils/compressImage.util";
import { parseFormData } from "$lib/utils/parseFormData.util";
import { type Actions, redirect } from "@sveltejs/kit";

interface PageDataInterface {
	rooms: RoomInterface[];
}

export async function load(): Promise<PageDataInterface> {
	const rooms = await getRoomsQuery();

	return {
		rooms: rooms.map((r) => ({
			id: r.id,
			name: r.name ?? String(r.id),
			image: r.thumbnail ?? DEFAULT_ROOM_IMAGE,
			flowers: r.flowers.map((f) => ({
				id: f.id,
				name: f.name,
				image: f.photos[0]?.thumbnail ?? "",
				roomId: r.id,
				roomName: r.name,
				watering: {
					flowerId: f.watering.flowerId,
					frequency: f.watering.frequency,
					amount: f.watering.amount,
				},
				conditions: {
					flowerId: f.conditions.flowerId,
					minTemperature: f.conditions.minTemperature,
					maxTemperature: f.conditions.maxTemperature,
					soilType: f.conditions.soilType,
				},
				wateringHistory: f.wateringHistory.map((h) => ({
					id: h.id,
					date: h.date,
					amount: h.amount,
					flowerId: h.flowerId,
					flowerName: f.name,
				})),
				photos: f.photos.map((p) => ({
					id: p.id,
					date: p.date,
					flowerId: f.id,
					thumbnail: p.thumbnail,
				})),
			})),
		})),
	};
}

export const actions: Actions = {
	addRoom: async ({ request }) => {
		const formData = await request.formData();
		const payload = await parseFormData<CreateRoomMutationInterface>(formData);

		const image = formData.get("image") as File | null;
		const thumbnail = bufferToDataUrl(await compressImage(image));

		await createRoomMutation({ ...payload, thumbnail });

		return redirect(302, "/rooms");
	},
	editRoom: async ({ request }) => {
		const formData = await request.formData();
		const payload = await parseFormData<UpdateRoomMutationInterface>(formData);

		const image = formData.get("image") as File | null;
		const thumbnail = bufferToDataUrl(await compressImage(image));

		await updateRoomMutation({ ...payload, thumbnail });

		return redirect(302, "/rooms");
	},
	deleteRoom: async ({ request }) => {
		const formData = await request.formData();
		const payload = await parseFormData<{ roomId: string }>(formData);
		const roomId = Number(payload.roomId);
		await deleteRoomMutation({ roomId });

		return redirect(302, "/rooms");
	},
};
