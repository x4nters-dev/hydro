export interface WateringHistoryInterface {
	id: number;
	date: Date;
	amount: number | null;

	flowerId: number;
	flowerName: string | null;
}
