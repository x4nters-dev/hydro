import { deleteWateringHistoryMutation } from "$lib/database/mutations/deleteWateringHistory.mutation";
import { getWateringHistoryQuery } from "$lib/database/queries/getWateringHistory.query";
import type { WateringHistoryInterface } from "$lib/interfaces/wateringHistory.interface";
import { type Actions, redirect } from "@sveltejs/kit";

interface PageDataInterface {
	wateringHistory: WateringHistoryInterface[];
}

export async function load(): Promise<PageDataInterface> {
	const wateringHistory = await getWateringHistoryQuery();

	return {
		wateringHistory: wateringHistory.map((h) => ({
			id: h.id,
			date: h.date,
			amount: h.amount,
			flowerId: h.flowerId,
			flowerName: h.flower.name,
		})),
	};
}

export const actions: Actions = {
	clearHistory: async () => {
		await deleteWateringHistoryMutation();

		return redirect(302, "/history");
	},
};
