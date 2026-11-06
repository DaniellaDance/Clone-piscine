CREATE TABLE `employees` (
	`id` text PRIMARY KEY NOT NULL,
	`data` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `escalations` (
	`id` text PRIMARY KEY NOT NULL,
	`ticket` text NOT NULL,
	`data` text NOT NULL,
	`created` integer NOT NULL
);
