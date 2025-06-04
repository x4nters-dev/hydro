import { bufferToDataUrl } from "$lib/utils/bufferToDataUrl.util";
import qs from "qs";

export async function parseFormData<T extends Record<keyof T, unknown>>(
	formData: FormData,
): Promise<T> {
	const values = new URLSearchParams();
	const files: Record<string, string | null> = {};

	for (const [key, value] of formData.entries()) {
		if (value instanceof File) {
			if (value.size > 0) {
				const bytes = Buffer.from(await value.arrayBuffer());
				files[key] = bufferToDataUrl(bytes);
			} else {
				files[key] = null;
			}
		} else values.append(key, value as string);
	}

	return {
		...qs.parse(values.toString(), { interpretNumericEntities: true }),
		...files,
	} as T;
}
