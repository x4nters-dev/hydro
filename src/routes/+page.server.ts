import { redirect } from "@sveltejs/kit";

export function load(): void {
	redirect(302, "/daily");
}
