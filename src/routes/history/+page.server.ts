import { deleteWateringHistoryMutation } from "$lib/database/mutations/deleteWateringHistory.mutation";
import { getWateringHistoryQuery } from "$lib/database/queries/getWateringHistory.query";
import { type Actions, redirect } from "@sveltejs/kit";
import { addMonths } from "date-fns";

export async function load() {
	const wateringHistory = await getWateringHistoryQuery({
		start: addMonths(new Date(), -1),
		end: new Date(),
	});

	return { wateringHistory };
}

export const actions: Actions = {
	clearHistory: async () => {
		await deleteWateringHistoryMutation();

		return redirect(302, "/history");
	},
};
