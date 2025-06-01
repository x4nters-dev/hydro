import { deleteWateringHistoryMutation } from "$lib/database/mutations/deleteWateringHistory.mutation";
import { error, json } from "@sveltejs/kit";

export async function DELETE(): Promise<Response> {
	const result = await deleteWateringHistoryMutation();

	if (!result.lastInsertRowid || Number(result.lastInsertRowid) === 0) {
		return error(400, {
			message: "No change",
		});
	}

	return json({
		success: true,
	});
}
