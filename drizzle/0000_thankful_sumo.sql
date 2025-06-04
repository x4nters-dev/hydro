CREATE TABLE `conditions` (
	`flowerId` integer PRIMARY KEY NOT NULL,
	`minTemperature` integer,
	`maxTemperature` integer,
	`soilType` text,
	FOREIGN KEY (`flowerId`) REFERENCES `flowers`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `flowers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(100),
	`roomId` integer,
	FOREIGN KEY (`roomId`) REFERENCES `rooms`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `photos` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`date` integer NOT NULL,
	`file` text NOT NULL,
	`filename` text NOT NULL,
	`flowerId` integer NOT NULL,
	FOREIGN KEY (`flowerId`) REFERENCES `flowers`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `rooms` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(100),
	`image` text
);
--> statement-breakpoint
CREATE TABLE `watering` (
	`flowerId` integer PRIMARY KEY NOT NULL,
	`frequency` integer,
	`amount` integer,
	FOREIGN KEY (`flowerId`) REFERENCES `flowers`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `wateringHistory` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`date` integer NOT NULL,
	`amount` integer,
	`flowerId` integer NOT NULL,
	FOREIGN KEY (`flowerId`) REFERENCES `flowers`(`id`) ON UPDATE no action ON DELETE cascade
);
