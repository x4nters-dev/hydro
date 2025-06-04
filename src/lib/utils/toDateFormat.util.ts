import { DATE_FORMAT } from "$lib/consts/dateFormat.const";
import { formatDate } from "date-fns";

export function toDateFormat(date: Date | null): string {
	return date ? formatDate(date, DATE_FORMAT) : "";
}
