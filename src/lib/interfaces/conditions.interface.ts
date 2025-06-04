import type { SoilTypeEnum } from "$lib/enums/soilType.enum";

export interface ConditionsInterface {
	flowerId: number;
	minTemperature: number | null;
	maxTemperature: number | null;
	soilType: SoilTypeEnum | null;
}
