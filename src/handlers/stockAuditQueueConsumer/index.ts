import type { SQSEvent } from "aws-lambda";
import { createStockAudit } from "../../services/stockAuditService";
import middy from "@middy/core";
import { z } from "zod";

const messageBodySchema = z.object({
  containerId: z.number(),
  containerLabel: z.string(),
  type: z.string(),
  quantity: z.number(),
  user: z.string(),
  fromSite: z.object({
    siteId: z.number(),
    siteName: z.string(),
    locationId: z.number(),
    locationName: z.string(),
    hub: z.number(),
  }),
  toSite: z.object({
    siteId: z.number(),
    siteName: z.string(),
    locationId: z.number(),
    locationName: z.string(),
    hub: z.number(),
  }),
  eventTime: z.string(),
});

export type StockAudit = z.infer<typeof messageBodySchema>;

const handleStockAuditMessage = async (event: SQSEvent) => {
  for (const record of event.Records) {
    const body = JSON.parse(record.body);
    const parsedBody = messageBodySchema.parse(body);

    await createStockAudit(parsedBody);
    console.log("Stock audit created");
  }
};

export const handler = middy().handler(handleStockAuditMessage);
