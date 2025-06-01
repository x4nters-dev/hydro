import { goto } from "$app/navigation";

export function invalidateServerPage(): Promise<void> {
	return goto(location.href, { invalidateAll: true });
}
