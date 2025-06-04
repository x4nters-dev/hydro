export async function saveResponseAsFile(response: Response) {
	if (!response.ok) throw Error();

	const blob = await response.blob();
	const contentDisposition = response.headers.get("Content-Disposition");
	const filenameMatch = contentDisposition?.match(/filename="(.+)"/);
	const filename = filenameMatch?.[1] ?? "plik.bin";

	const url = URL.createObjectURL(blob);

	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);

	URL.revokeObjectURL(url);
}
