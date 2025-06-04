import { DEFAULT_FLOWER_IMAGE } from "$lib/consts/defaultFlowerImage.const";
import { DEFAULT_ROOM_IMAGE } from "$lib/consts/defaultRoomImage.const";
import {
	type CreateFlowerPhotoMutationInterface,
	createFlowerPhotoMutation,
} from "$lib/database/mutations/createFlowerPhoto.mutation";
import { deleteFlowerMutation } from "$lib/database/mutations/deleteFlower.mutation";
import { deleteFlowerPhotoMutation } from "$lib/database/mutations/deleteFlowerPhoto.mutation";
import {
	type DeleteWateringHistoryByFlowerIdMutationInterface,
	deleteWateringHistoryByFlowerIdMutation,
} from "$lib/database/mutations/deleteWateringHistoryByFlowerId.mutation";
import {
	type UpdateFlowerMutationInterface,
	updateFlowerMutation,
} from "$lib/database/mutations/updateFlower.mutation";
import { getFlowerByIdQuery } from "$lib/database/queries/getFlowerById.query";
import { getRoomsQuery } from "$lib/database/queries/getRooms.query";
import type { FlowerInterface } from "$lib/interfaces/flower.interface";
import type { RoomInterface } from "$lib/interfaces/room.interface";
import { parseFormData } from "$lib/utils/parseFormData.util";
import { redirect } from "@sveltejs/kit";

interface PageDataInterface {
	flower: FlowerInterface;
	rooms: RoomInterface[];
}

export async function load({ params }): Promise<PageDataInterface> {
	const flowerId = Number(params.flowerId);
	const flower = await getFlowerByIdQuery({ flowerId });

	if (!flower) {
		redirect(304, "/flowers");
	}

	const rooms = await getRoomsQuery();

	return {
		flower: {
			photos: flower.photos.map((p) => ({
				flowerId: p.flowerId,
				date: p.date,
				file: p.file ?? DEFAULT_FLOWER_IMAGE,
				filename: p.filename,

				id: p.id,
			})),
			wateringHistory: flower.wateringHistory.map((h) => ({
				flowerId: h.flowerId,
				date: h.date,
				id: h.id,
				amount: h.amount,
				flowerName: flower.name,
			})),
			image: flower.photos?.[0]?.file ?? DEFAULT_FLOWER_IMAGE,
			roomName: flower.room?.name ?? null,
			roomId: flower.roomId,
			name: flower.name || String(flower.id),
			watering: flower.watering,
			conditions: flower.conditions,
			id: flower.id,
		},
		rooms: rooms.map((r) => ({
			id: r.id,
			name: r.name,
			image: r.image ?? DEFAULT_ROOM_IMAGE,
			flowers: [],
		})),
	};
}

export const actions = {
	editFlower: async ({ request }) => {
		const formData = await request.formData();
		const payload =
			await parseFormData<UpdateFlowerMutationInterface>(formData);
		await updateFlowerMutation(payload);

		return redirect(302, `/flowers/${payload.flowerId}`);
	},
	deleteFlower: async ({ request }) => {
		const formData = await request.formData();
		const payload = await parseFormData<{ flowerId: string }>(formData);
		const flowerId = Number(payload.flowerId);
		await deleteFlowerMutation({ flowerId });

		return redirect(302, "/flowers");
	},
	clearHistory: async ({ request }) => {
		const formData = await request.formData();
		const payload =
			await parseFormData<DeleteWateringHistoryByFlowerIdMutationInterface>(
				formData,
			);
		const flowerId = Number(payload.flowerId);
		await deleteWateringHistoryByFlowerIdMutation({ flowerId });

		return redirect(302, `/flowers/${payload.flowerId}`);
	},
	addPhoto: async ({ request }) => {
		const formData = await request.formData();
		const payload =
			await parseFormData<CreateFlowerPhotoMutationInterface>(formData);

		const image = formData.get("file") as File;
		const filename = image.name;
		await createFlowerPhotoMutation({ ...payload, filename });

		return redirect(302, `/flowers/${payload.flowerId}`);
	},
	deletePhoto: async ({ request }) => {
		const formData = await request.formData();
		const payload = await parseFormData<{ photoId: number; flowerId: number }>(
			formData,
		);
		await deleteFlowerPhotoMutation({
			photoId: payload.photoId,
		});

		return redirect(302, `/flowers/${payload.flowerId}`);
	},
};
