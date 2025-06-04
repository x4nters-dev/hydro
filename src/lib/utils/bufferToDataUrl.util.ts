export function bufferToDataUrl(buffer: Buffer | null, mimeType = "image/png") {
	if (!buffer) return null;

	const base64 = buffer.toString("base64");

	return `data:${mimeType};base64,${base64}`;
}
