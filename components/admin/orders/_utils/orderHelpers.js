export const STATUS_FLOW = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
];

export function getStatusBadgeStyle(status) {
  switch (status) {
    case "pending":
      return "bg-yellow-500/10 text-yellow-400 border-yellow-500/30";
    case "confirmed":
      return "bg-blue-500/10 text-blue-400 border-blue-500/30";
    case "processing":
      return "bg-purple-500/10 text-purple-400 border-purple-500/30";
    case "shipped":
      return "bg-cyan-500/10 text-cyan-400 border-cyan-500/30";
    case "delivered":
      return "bg-green-500/10 text-green-400 border-green-500/30";
    case "cancelled":
      return "bg-red-500/10 text-red-400 border-red-500/30";
    default:
      return "bg-gray-500/10 text-gray-400 border-gray-500/30";
  }
}

export function getNextStatus(currentStatus) {
  const index = STATUS_FLOW.indexOf(currentStatus);
  if (index === -1 || index === STATUS_FLOW.length - 1) return null;
  return STATUS_FLOW[index + 1];
}

export function canCancel(status) {
  return ["pending", "confirmed", "processing"].includes(status);
}
