import { DEFAULT_FLOWER_IMAGE } from "$lib/consts/defaultFlowerImage.const";
import {
	type CreateFlowerMutationInterface,
	createFlowerMutation,
} from "$lib/database/mutations/createFlower.mutation";
import { deleteFlowerMutation } from "$lib/database/mutations/deleteFlower.mutation";
import {
	type UpdateFlowerMutationInterface,
	updateFlowerMutation,
} from "$lib/database/mutations/updateFlower.mutation";
import { getFlowersQuery } from "$lib/database/queries/getFlowers.query";
import { getRoomsQuery } from "$lib/database/queries/getRooms.query";
import type { FlowerInterface } from "$lib/interfaces/flower.interface";
import type { RoomInterface } from "$lib/interfaces/room.interface";
import { bufferToDataUrl } from "$lib/utils/bufferToDataUrl.util";
import { compressImage } from "$lib/utils/compressImage.util";
import { parseFormData } from "$lib/utils/parseFormData.util";
import { redirect } from "@sveltejs/kit";

interface PageDataInterface {
	flowers: FlowerInterface[];
	rooms: RoomInterface[];
}

export async function load(): Promise<PageDataInterface> {
	const flowers = await getFlowersQuery();
	const rooms = await getRoomsQuery();

	return {
		flowers: flowers.map((f) => ({
			id: f.id,
			name: f.name || String(f.id),
			image: f.photos[0]?.thumbnail ?? DEFAULT_FLOWER_IMAGE,
			roomId: f.roomId,
			roomName: f.room?.name ?? null,
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
				thumbnail: p.thumbnail,
				flowerId: f.id,
			})),
		})),
		rooms: rooms.map((r) => ({
			id: r.id,
			name: r.name,
			image: r.thumbnail,
			flowers: [],
		})),
	};
}

export const actions = {
	addFlower: async ({ request }) => {
		const formData = await request.formData();
		const payload =
			await parseFormData<CreateFlowerMutationInterface>(formData);

		const image = formData.get("image") as File | null;
		const filename = image?.name ?? null;
		const thumbnail = bufferToDataUrl(await compressImage(image));

		createFlowerMutation({
			...payload,
			filename,
			thumbnail,
		});

		return redirect(302, "/flowers");
	},
	editFlower: async ({ request }) => {
		const formData = await request.formData();
		const payload =
			await parseFormData<UpdateFlowerMutationInterface>(formData);
		await updateFlowerMutation(payload);
		return redirect(302, "/flowers");
	},
	deleteFlower: async ({ request }) => {
		const payload = (await parseFormData(await request.formData())) as {
			flowerId: string;
		};
		const flowerId = Number(payload.flowerId);
		await deleteFlowerMutation({ flowerId });

		return redirect(302, "/flowers");
	},
};
