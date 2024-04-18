import {
  index,
  int,
  mysqlTable,
  bigint,
  varchar,
  datetime,
} from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";

export const stockAudit = mysqlTable(
  "stock_audit",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    containerId: bigint("containerId", { mode: "number" }).notNull(),
    containerLabel: varchar("containerLabel", { length: 30 }).notNull(),
    type: varchar("type", { length: 30 }).notNull(),
    user: varchar("user", { length: 30 }).notNull(),
    sku: varchar("sku", { length: 30 }),
    caseQuantity: bigint("case_quantity", { mode: "number" }),
    adjustmentQuantity: bigint("adjustment_quantity", { mode: "number" }),
    deliveryId: bigint("delivery_id", { mode: "number" }),
    toLocationSiteId: bigint("to_location_site_id", { mode: "number" }),
    toLocationSiteName: varchar("to_location_site_name", { length: 255 }),
    toLocationId: bigint("to_location_id", { mode: "number" }),
    toLocationnName: varchar("to_location_name", { length: 255 }),
    toLocationHub: int("to_location_hub"),
    eventTime: datetime("event_time").notNull(),
    createdAt: datetime("created_at").notNull(),
  },
  (stockAudit) => ({
    containerLabelIndex: index("container_label_index").on(
      stockAudit.containerLabel
    ),
  })
);

export const insertUserSchema = createInsertSchema(stockAudit);

export type NewStockAudit = Omit<
  typeof stockAudit.$inferInsert,
  "createdAt" | "id"
>;
