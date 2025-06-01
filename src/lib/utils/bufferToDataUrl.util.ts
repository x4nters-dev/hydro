export function bufferToDataUrl(
	buffer: Buffer,
	mimeType = "image/png",
): string {
	const base64 = buffer.toString("base64");

	return `data:${mimeType};base64,${base64}`;
}
