import { DB } from "$lib/database/connection";
import { flowers } from "$lib/database/schema";
import { isNull, ne, or } from "drizzle-orm";

export function getFlowersWithoutRoom(roomId: number) {
	return DB.query.flowers.findMany({
		where: or(isNull(flowers.roomId), ne(flowers.roomId, roomId)),
	});
}
