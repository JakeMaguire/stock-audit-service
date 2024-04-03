import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import { createConnection } from "mysql2";
// import { connection, db } from "../database/db";
import * as schema from "../database/schema";
import { eq } from "drizzle-orm";

export const getAuditForContainer = async (containerLabel: string) => {
  // Move this out of here
  const connection = await createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true,
  });

  const db = drizzle(connection, { schema, mode: "default" });

  return await db
    .select()
    .from(schema.stockAudit)
    .where(eq(schema.stockAudit.containerLabel, containerLabel));
};

export const createStockAuditForContainer = async (
  stockAudit: schema.NewStockAudit
) => {
  // Move this out of here
  const connection = await createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true,
  });

  const db = drizzle(connection, { schema, mode: "default" });

  return db
    .insert(schema.stockAudit)
    .values({ ...stockAudit, createdAt: new Date() });
};
