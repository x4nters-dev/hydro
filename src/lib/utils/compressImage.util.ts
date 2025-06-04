import { IMAGE_COMPRESSION } from "$lib/consts/imageCompression.const";
import sharp from "sharp";

export async function compressImage(
	image: File | null,
): Promise<Buffer | null> {
	if (!image || image.size === 0) return null;

	const buffer = Buffer.from(await image.arrayBuffer());
	const { width, height } = IMAGE_COMPRESSION;

	return await sharp(buffer).resize(width, height).toBuffer();
}
