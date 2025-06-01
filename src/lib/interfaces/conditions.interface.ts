import type { SoilTypeEnum } from "$lib/enums/soilType.enum";
import type { FlowerInterface } from "$lib/interfaces/flower.interface";

export interface ConditionsInterface {
	id: number;
	minTemperature: number | null;
	maxTemperature: number | null;
	soilType: SoilTypeEnum | null;

	flowerId?: number;
	flower?: FlowerInterface;
}
