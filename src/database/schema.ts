import {
  index,
  int,
  mysqlTable,
  bigint,
  varchar,
  datetime,
} from "drizzle-orm/mysql-core";

export const stockAudit = mysqlTable(
  "stock_audit",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    containerId: bigint("containerId", { mode: "number" }),
    containerLabel: varchar("containerLabel", { length: 30 }),
    type: varchar("type", { length: 30 }),
    quantity: bigint("quantity", { mode: "number" }),
    user: varchar("user", { length: 30 }),
    fromLocationSiteId: bigint("from_location_site_id", { mode: "number" }),
    fromLocationSiteName: varchar("from_location_site_name", { length: 255 }),
    fromLocationId: bigint("from_location_id", { mode: "number" }),
    fromLocationnName: varchar("from_location_name", { length: 255 }),
    fromLocationHub: int("from_location_hub"),
    toLocationSiteId: bigint("to_location_site_id", { mode: "number" }),
    toLocationSiteName: varchar("to_location_site_name", { length: 255 }),
    toLocationId: bigint("to_location_id", { mode: "number" }),
    toLocationnName: varchar("to_location_name", { length: 255 }),
    toLocationHub: int("to_location_hub"),
    eventTime: datetime("event_time"),
    createdAt: datetime("created_at"),
  },
  (stockAudit) => ({
    containerLabelIndex: index("container_label_index").on(
      stockAudit.containerLabel
    ),
  })
);
