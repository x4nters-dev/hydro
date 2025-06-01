import qs from "qs";

export async function parseFormData(formData: FormData): Promise<unknown> {
	const simpleValues = new URLSearchParams();
	const complexValues: Record<string, unknown> = {};

	for (const [key, value] of formData.entries()) {
		if (value instanceof File) {
			complexValues[key] = await value.arrayBuffer();
		} else {
			simpleValues.append(key, value);
		}
	}

	return {
		...qs.parse(simpleValues.toString()),
		...complexValues,
	};
}
