export function dataUrlToBlob(dataUrl: string): Blob {
	const [meta, base64] = dataUrl.split(",");
	const mimeMatch = meta.match(/:(.*?);/);
	const mime = mimeMatch ? mimeMatch[1] : "application/octet-stream";
	const binary = atob(base64);
	const array = new Uint8Array(binary.length);

	for (let i = 0; i < binary.length; i++) {
		array[i] = binary.charCodeAt(i);
	}

	return new Blob([array], { type: mime });
}
