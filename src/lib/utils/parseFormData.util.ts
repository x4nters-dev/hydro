import { bufferToDataUrl } from "$lib/utils/bufferToDataUrl.util";

export async function parseFormData<T extends Record<keyof T, unknown>>(
	formData: FormData,
): Promise<T> {
	const data: Record<keyof T, unknown> = {} as T;

	for (const [key, value] of formData.entries()) {
		const keyOfT = key as keyof T;
		if (value instanceof File) {
			if (value.size > 0) {
				const bytes = Buffer.from(await value.arrayBuffer());
				data[keyOfT] = bufferToDataUrl(bytes ?? null);
			} else {
				data[keyOfT] = null;
			}
		} else {
			data[keyOfT] = value;
		}
	}

	return data as T;
}
