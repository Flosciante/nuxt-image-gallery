CREATE TABLE `images` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`base64` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `images_id_index` ON `images` (`id`);