import { getWateringHistoryQuery } from "$lib/database/queries/getWateringHistory.query";
import { addMonths } from "date-fns";
import type { Actions } from "@sveltejs/kit";
import { deleteWateringHistoryMutation } from "$lib/database/mutations/deleteWateringHistory.mutation";

export async function load() {
	const wateringHistory = await getWateringHistoryQuery({
		start: addMonths(new Date(), -1),
		end: new Date(),
	});

	return { wateringHistory };
}

export const actions: Actions = {
	clearHistory: async () => {
		const result = await deleteWateringHistoryMutation();

		return { success: result.rowsAffected > 0 };
	},
};
