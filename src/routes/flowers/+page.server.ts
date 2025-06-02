import { createFlowerMutation } from "$lib/database/mutations/createFlower.mutation";
import { deleteFlowerMutation } from "$lib/database/mutations/deleteFlower.mutation";
import {
	type UpdateFlowerMutationInterface,
	updateFlowerMutation,
} from "$lib/database/mutations/updateFlower.mutation";
import { getFlowersQuery } from "$lib/database/queries/getFlowers.query";
import { getRoomsQuery } from "$lib/database/queries/getRooms.query";
import type { FlowerInterface } from "$lib/interfaces/flower.interface";
import { bufferToDataUrl } from "$lib/utils/bufferToDataUrl.util";
import { parseFormData } from "$lib/utils/parseFormData.util";
import { redirect } from "@sveltejs/kit";

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
		await createFlowerMutation(payload);

		return redirect(302, "/flowers");
	},
	editFlower: async ({ request }) => {
		const payload = (await parseFormData(
			await request.formData(),
		)) as UpdateFlowerMutationInterface;
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
