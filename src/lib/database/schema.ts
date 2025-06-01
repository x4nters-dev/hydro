import { relations } from "drizzle-orm";
import { blob, int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import type { SoilTypeEnum } from "../enums/soilType.enum";

export const rooms = sqliteTable("rooms", {
	id: int().primaryKey({ autoIncrement: true }),
	name: text({ length: 100 }),
	image: blob({ mode: "buffer" }),
});

export const flowers = sqliteTable("flowers", {
	id: int().primaryKey({ autoIncrement: true }),
	name: text({ length: 100 }),
	image: blob({ mode: "buffer" }),
	roomId: int().references(() => rooms.id, {
		onDelete: "set null",
	}),
});

export const watering = sqliteTable("watering", {
	flowerId: int()
		.primaryKey()
		.references(() => flowers.id, { onDelete: "cascade" }),
	frequency: int({ mode: "number" }),
	amount: int({ mode: "number" }),
});

export const conditions = sqliteTable("conditions", {
	flowerId: int()
		.primaryKey()
		.references(() => flowers.id, { onDelete: "cascade" }),
	minTemperature: int({ mode: "number" }),
	maxTemperature: int({ mode: "number" }),
	soilType: text().$type<SoilTypeEnum>(),
});

export const wateringHistory = sqliteTable("wateringHistory", {
	id: int().primaryKey({ autoIncrement: true }),
	date: int({ mode: "timestamp" }).notNull(),
	amount: int({ mode: "number" }),
	flowerId: int().references(() => flowers.id, {
		onDelete: "cascade",
	}),
});

export const roomRelations = relations(rooms, ({ many }) => ({
	flowers: many(flowers),
}));

export const flowerRelations = relations(flowers, ({ many, one }) => ({
	room: one(rooms, {
		fields: [flowers.roomId],
		references: [rooms.id],
	}),
	watering: one(watering, {
		fields: [flowers.id],
		references: [watering.flowerId],
	}),
	conditions: one(conditions, {
		fields: [flowers.id],
		references: [conditions.flowerId],
	}),
	wateringHistory: many(wateringHistory),
}));

export const wateringRelations = relations(watering, ({ one }) => ({
	flower: one(flowers, {
		fields: [watering.flowerId],
		references: [flowers.id],
	}),
}));

export const conditionsRelations = relations(conditions, ({ one }) => ({
	flower: one(flowers, {
		fields: [conditions.flowerId],
		references: [flowers.id],
	}),
}));

export const wateringHistoryRelations = relations(
	wateringHistory,
	({ one }) => ({
		flower: one(flowers, {
			fields: [wateringHistory.flowerId],
			references: [flowers.id],
		}),
	}),
);
