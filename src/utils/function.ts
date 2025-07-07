export const formatSortOrder = (order?: string): "ASC" | "DESC" | undefined => {
  if (order === "ascend") return "ASC";
  if (order === "descend") return "DESC";
  return undefined;
};

export const getSortBy = (columnKey?: string, order?: string) =>
  columnKey && order ? [[columnKey, formatSortOrder(order)]] : [];

export const mapStatusColor = (status: string) => {
  switch (status) {
    case "active":
    case "approved":
    case "confirmed":
      return "success";
    case "pending":
      return "default";
    case "deactivated":
    case "rejected":
      return "error";
    default:
      return "default";
  }
};

export const formatAmount = (value: any) => value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
