import type { SoilTypeEnum } from "$lib/enums/soilType.enum";

export interface DailyTaskInterface {
	id: number;
	done: boolean;
	flower: {
		id: number;
		name: string | null;
		image: string | null;
	};
	watering: {
		amount?: number | null;
		frequency?: number | null;
		lastWateringData: Date | null;
	};
	conditions: {
		minTemperature?: number | null;
		maxTemperature?: number | null;
		soilType?: SoilTypeEnum | null;
	};
	history: {
		date: Date;
		amount: number | null;
	}[];
}
