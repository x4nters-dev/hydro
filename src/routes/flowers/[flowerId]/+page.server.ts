import { deleteFlowerMutation } from "$lib/database/mutations/deleteFlower.mutation";
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
import { parseFormData } from "$lib/utils/parseFormData.util";
import { redirect } from "@sveltejs/kit";
import { addMonths } from "date-fns";

export async function load({ params }) {
	const flowerId = Number(params.flowerId);
	const currentDate = new Date();
	const flower = await getFlowerByIdQuery({
		flowerId,
		history: {
			start: addMonths(currentDate, -1),
			end: currentDate,
		},
	});

	if (!flower) {
		redirect(304, "/flowers");
	}

	const rooms = await getRoomsQuery({ omitImage: true });

	return { flower, rooms };
}

export const actions = {
	editFlower: async ({ request }) => {
		const payload = (await parseFormData(
			await request.formData(),
		)) as UpdateFlowerMutationInterface;
		await updateFlowerMutation(payload);

		return redirect(302, `/flowers/${payload.flowerId}`);
	},
	deleteFlower: async ({ request }) => {
		const payload = (await parseFormData(await request.formData())) as {
			flowerId: string;
		};
		const flowerId = Number(payload.flowerId);
		await deleteFlowerMutation({ flowerId });

		return redirect(302, "/flowers");
	},
	clearHistory: async ({ request }) => {
		const payload = (await parseFormData(
			await request.formData(),
		)) as DeleteWateringHistoryByFlowerIdMutationInterface;
		const flowerId = Number(payload.flowerId);
		await deleteWateringHistoryByFlowerIdMutation({ flowerId });

		return redirect(302, `/flowers/${payload.flowerId}`);
	},
};
