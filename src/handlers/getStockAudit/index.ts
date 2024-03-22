import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import httpHeaderNormalizer from "@middy/http-header-normalizer";
import type { APIGatewayProxyEventV2 } from "aws-lambda";
import { z } from "zod";
import { getStockAudit } from "../../services/stockAuditService";

export const stockAuditSchema = z
  .object({
    container_label: z.string(),
  })
  .transform((val) => {
    return { containerLabel: val.container_label };
  });

const getStockAuditHandler = async (event: APIGatewayProxyEventV2) => {
  const { containerLabel } = stockAuditSchema.parse(
    event.queryStringParameters
  );

  const stockAudit = await getStockAudit(containerLabel);

  return {
    statusCode: 200,
    body: JSON.stringify({
      stockAudit,
    }),
  };
};

export const handler = middy()
  .use(httpHeaderNormalizer())
  .use(httpErrorHandler())
  .handler(getStockAuditHandler);
