import { CompressionLevelsEnum } from "$lib/enums/compressionLevels.enum";

const COMPRESSION_LEVELS_MAP: Record<
	CompressionLevelsEnum,
	{ height: number; width: number }
> = {
	[CompressionLevelsEnum.VERY_LOW]: { width: 320, height: 240 },
	[CompressionLevelsEnum.LOW]: { width: 640, height: 480 },
	[CompressionLevelsEnum.MEDIUM]: { width: 800, height: 600 },
	[CompressionLevelsEnum.BALANCED]: { width: 1024, height: 768 },
	[CompressionLevelsEnum.GOOD]: { width: 1280, height: 960 },
	[CompressionLevelsEnum.HIGH]: { width: 1600, height: 1200 },
	[CompressionLevelsEnum.FULL_HD]: { width: 1920, height: 1080 },
	[CompressionLevelsEnum.VERY_HIGH]: { width: 2560, height: 1440 },
	[CompressionLevelsEnum.ULTRA_HD]: { width: 3840, height: 2160 },
};

const level = import.meta.env
	.VITE_COMPRESSION_LEVEL as CompressionLevelsEnum | null;
const defaultLevel = CompressionLevelsEnum.LOW;

export const IMAGE_COMPRESSION = COMPRESSION_LEVELS_MAP[level ?? defaultLevel];
