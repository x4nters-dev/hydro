import { DATE_FORMAT } from "$lib/consts/dateFormat.const";
import { formatDate } from "date-fns";

export function toDateFormat(date: Date | null | undefined): string {
	if (!date) return "";

	return formatDate(date, DATE_FORMAT);
}
