import { DATA_FOLDER } from "$lib/consts/dataFolder.const";

export const DB_CONNECTION_STRING = `${DATA_FOLDER}${import.meta.env.VITE_DB_FILE}`;
