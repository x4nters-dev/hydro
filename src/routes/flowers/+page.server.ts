import { getFlowersQuery } from "$lib/database/queries/getFlowers.query";
import type { FlowerInterface } from "$lib/interfaces/flower.interface";
import { parseFormData } from "$lib/utils/parseFormData.util";
import { createFlowerMutation } from "$lib/database/mutations/createFlower.mutation";
import { bufferToDataUrl } from "$lib/utils/bufferToDataUrl.util";
import { deleteFlowerMutation } from "$lib/database/mutations/deleteFlower.mutation";
import { getRoomsQuery } from "$lib/database/queries/getRooms.query";
import {
	updateFlowerMutation,
	type UpdateFlowerMutationInterface,
} from "$lib/database/mutations/updateFlower.mutation";

export async function load() {
	const flowers = (await getFlowersQuery()).map((f) => ({
		...f,
		image: f.image && f.image.byteLength > 0 ? bufferToDataUrl(f.image) : null,
	}));

	const rooms = await getRoomsQuery({ omitImage: true });

	return { flowers, rooms };
}

export const actions = {
	addFlower: async ({ request }) => {
		const payload = (await parseFormData(
			await request.formData(),
		)) as FlowerInterface;
		const id = await createFlowerMutation(payload);

		return { id };
	},
	editFlower: async ({ request }) => {
		const payload = (await parseFormData(
			await request.formData(),
		)) as UpdateFlowerMutationInterface;
		await updateFlowerMutation(payload);

		return { success: true };
	},
	deleteFlower: async ({ request }) => {
		const payload = (await parseFormData(await request.formData())) as {
			flowerId: string;
		};
		const flowerId = Number(payload.flowerId);
		const result = await deleteFlowerMutation({ flowerId });

		return { success: result.rowsAffected > 0 };
	},
};
