import { createWateringHistoryMutation } from "$lib/database/mutations/createWateringHistory.mutation";
import { error, json } from "@sveltejs/kit";

export async function PUT({ request }): Promise<Response> {
	const body = await request.json();

	const result = await createWateringHistoryMutation({
		amount: body.task.watering.amount,
		flowerId: body.task.flower.id,
		date: new Date(),
	});

	if (result.rowsAffected === 0) {
		return error(400, {
			message: "No changes",
		});
	}

	return json(result.rows);
}
