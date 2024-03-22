CREATE TABLE `stock_audit` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`containerId` bigint,
	`containerLabel` varchar(30),
	`type` varchar(30),
	`quantity` bigint,
	`user` varchar(30),
	`from_location_site_id` bigint,
	`from_location_site_name` varchar(255),
	`from_location_id` bigint,
	`from_location_name` varchar(255),
	`from_location_hub` int,
	`to_location_site_id` bigint,
	`to_location_site_name` varchar(255),
	`to_location_id` bigint,
	`to_location_name` varchar(255),
	`to_location_hub` int,
	`event_time` datetime,
	`created_at` datetime,
	CONSTRAINT `stock_audit_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `container_label_index` ON `stock_audit` (`containerLabel`);