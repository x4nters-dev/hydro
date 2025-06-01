import type { DailyTaskInterface } from "$lib/interfaces/dailyTask.interface";

export interface PutTaskDoneRequestInterface {
	task: DailyTaskInterface;
}

export async function putTaskDone(
	request: PutTaskDoneRequestInterface,
): Promise<Response> {
	return fetch("/daily", {
		method: "PUT",
		body: JSON.stringify(request),
	});
}
