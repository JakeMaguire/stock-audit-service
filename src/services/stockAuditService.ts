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
    const fromLocation = {
      siteId: containerAudit.fromLocationSiteId,
      siteName: containerAudit.fromLocationSiteName,
      locationId: containerAudit.fromLocationSiteId,
      locationName: containerAudit.fromLocationnName,
      hub: containerAudit.fromLocationHub,
    };

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
      quantity: containerAudit.quantity,
      user: containerAudit.user,
      fromLocation,
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
    quantity: stockAudit.quantity,
    user: stockAudit.user,
    fromLocationSiteId: stockAudit.fromSite.siteId,
    fromLocationSiteName: stockAudit.fromSite.siteName,
    fromLocationId: stockAudit.fromSite.locationId,
    fromLocationnName: stockAudit.fromSite.locationName,
    fromLocationHub: stockAudit.fromSite.hub,
    toLocationSiteId: stockAudit.toSite.siteId,
    toLocationSiteName: stockAudit.toSite.siteName,
    toLocationId: stockAudit.toSite.locationId,
    toLocationnName: stockAudit.toSite.locationName,
    toLocationHub: stockAudit.toSite.hub,
    eventTime: new Date(stockAudit.eventTime),
  };

  await createStockAuditForContainer(transormedStockAudit);
};
