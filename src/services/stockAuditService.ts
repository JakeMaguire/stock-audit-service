import { getAuditForContainer } from "../repository/StockAuditRepository";

export const getStockAudit = async (containerLabel: string) => {
  const containerAuditResults = await getAuditForContainer(containerLabel);
  const id = containerAuditResults[0].id;
  const containerId = containerAuditResults[0].containerId;

  const mappedEvents = containerAuditResults.map((containerAudit) => {
    const fromSite = {
      siteId: containerAudit.fromLocationSiteId,
      siteName: containerAudit.fromLocationSiteName,
      locationId: containerAudit.fromLocationSiteId,
      locationName: containerAudit.fromLocationnName,
      hub: containerAudit.fromLocationHub,
    };

    const toSite = {
      siteId: containerAudit.toLocationSiteId,
      siteName: containerAudit.toLocationSiteName,
      locationId: containerAudit.toLocationSiteId,
      locationName: containerAudit.toLocationnName,
      hub: containerAudit.toLocationHub,
    };

    return {
      type: containerAudit.type,
      quantity: containerAudit.quantity,
      user: containerAudit.user,
      fromSite,
      toSite,
      eventTime: containerAudit.eventTime,
      createdAt: containerAudit.createdAt,
    };
  });

  return {
    id,
    containerId,
    containerLabel,
    events: mappedEvents,
  };
};
