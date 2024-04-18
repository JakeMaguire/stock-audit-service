ALTER TABLE `stock_audit` RENAME COLUMN `quantity` TO `case_quantity`;--> statement-breakpoint
ALTER TABLE `stock_audit` MODIFY COLUMN `containerId` bigint NOT NULL;--> statement-breakpoint
ALTER TABLE `stock_audit` MODIFY COLUMN `containerLabel` varchar(30) NOT NULL;--> statement-breakpoint
ALTER TABLE `stock_audit` MODIFY COLUMN `type` varchar(30) NOT NULL;--> statement-breakpoint
ALTER TABLE `stock_audit` MODIFY COLUMN `user` varchar(30) NOT NULL;--> statement-breakpoint
ALTER TABLE `stock_audit` MODIFY COLUMN `event_time` datetime NOT NULL;--> statement-breakpoint
ALTER TABLE `stock_audit` MODIFY COLUMN `created_at` datetime NOT NULL;--> statement-breakpoint
ALTER TABLE `stock_audit` ADD `sku` varchar(30);--> statement-breakpoint
ALTER TABLE `stock_audit` ADD `adjustment_quantity` bigint;--> statement-breakpoint
ALTER TABLE `stock_audit` ADD `delivery_id` bigint;--> statement-breakpoint
ALTER TABLE `stock_audit` DROP COLUMN `from_location_site_id`;--> statement-breakpoint
ALTER TABLE `stock_audit` DROP COLUMN `from_location_site_name`;--> statement-breakpoint
ALTER TABLE `stock_audit` DROP COLUMN `from_location_id`;--> statement-breakpoint
ALTER TABLE `stock_audit` DROP COLUMN `from_location_name`;--> statement-breakpoint
ALTER TABLE `stock_audit` DROP COLUMN `from_location_hub`;