import { getFlowersQuery } from "$lib/database/queries/getFlowers.query";
import type { FlowerInterface } from "$lib/interfaces/flower.interface";
import { getDailyTasks } from "$lib/utils/getDailyTasks.util";

export async function load() {
	const flowers = await getFlowersQuery();
	const tasks = getDailyTasks(flowers as unknown as FlowerInterface[]);

	return { tasks };
}
