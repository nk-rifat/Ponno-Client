export function getStatusBadge(stock) {
  if (stock === 0) return { label: "Out of Stock", color: "bg-red-500" };
  if (stock < 5) return { label: "Low Stock", color: "bg-yellow-500" };
  return { label: "Active", color: "bg-green-500" };
}
