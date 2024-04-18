import type { NewStockAudit } from "../database/schema";
import type { StockAudit } from "../handlers/stockAuditQueueConsumer";
import {
  createStockAuditForContainer,
  getAuditForContainer,
} from "../repository/StockAuditRepository";

export const getStockAudit = async (containerLabel: string) => {
  const containerAuditResults = await getAuditForContainer(containerLabel);
  const containerId = containerAuditResults[0].containerId;

  const mappedEvents = containerAuditResults.map((containerAudit) => {
    const toLocation = {
      siteId: containerAudit.toLocationSiteId,
      siteName: containerAudit.toLocationSiteName,
      locationId: containerAudit.toLocationSiteId,
      locationName: containerAudit.toLocationnName,
      hub: containerAudit.toLocationHub,
    };

    return {
      id: containerAudit.id,
      type: containerAudit.type,
      caseQuantity: containerAudit.caseQuantity,
      user: containerAudit.user,
      deliveryId: containerAudit.deliveryId,
      adjustedQuantity: containerAudit.adjustmentQuantity,
      sku: containerAudit.sku,
      toLocation,
      eventTime: containerAudit.eventTime,
      createdAt: containerAudit.createdAt,
    };
  });

  return {
    containerId,
    containerLabel,
    events: mappedEvents,
  };
};

export const createStockAudit = async (stockAudit: StockAudit) => {
  const transormedStockAudit: NewStockAudit = {
    containerId: stockAudit.containerId,
    containerLabel: stockAudit.containerLabel,
    type: stockAudit.type,
    caseQuantity: stockAudit.quantity,
    user: stockAudit.user,
    toLocationSiteId: stockAudit.toSite.siteId,
    toLocationSiteName: stockAudit.toSite.siteName,
    toLocationId: stockAudit.toSite.locationId,
    toLocationnName: stockAudit.toSite.locationName,
    toLocationHub: stockAudit.toSite.hub,
    eventTime: new Date(stockAudit.eventTime),
  };

  await createStockAuditForContainer(transormedStockAudit);
};
