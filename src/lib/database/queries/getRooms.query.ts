import { DB } from "$lib/database/connection";

interface GetRoomsQueryInterface {
	omitImage?: boolean;
}

export async function getRoomsQuery(params?: GetRoomsQueryInterface) {
	return DB.query.rooms.findMany({
		with: {
			flowers: {
				columns: {
					id: true,
					name: true,
				},
			},
		},
		columns: {
			id: true,
			name: true,
			image: !params?.omitImage,
		},
	});
}
