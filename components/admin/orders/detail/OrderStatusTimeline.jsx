const OrderStatusTimeline = ({ statusHistory }) => {
  const sorted = [...statusHistory].reverse(); // latest first

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 sm:p-5">
      <h2 className="text-white font-medium mb-4">Status History</h2>

      <div className="space-y-4">
        {sorted.map((entry, index) => (
          <div key={index} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span
                className={`w-2.5 h-2.5 rounded-full ${getStatusDotColor(entry.status)}`}
              />
              {index !== sorted.length - 1 && (
                <span className="w-px flex-1 bg-slate-700 mt-1" />
              )}
            </div>
            <div className="pb-4">
              <p className="text-white text-sm capitalize font-medium">
                {entry.status}
              </p>
              {entry.note && (
                <p className="text-gray-400 text-xs mt-0.5">{entry.note}</p>
              )}
              <p className="text-gray-500 text-xs mt-0.5">
                {new Date(entry.changedAt || entry.createdAt).toLocaleString(
                  "en-GB",
                  {
                    day: "numeric",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  },
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

function getStatusDotColor(status) {
  switch (status) {
    case "pending":
      return "bg-yellow-500";
    case "confirmed":
      return "bg-blue-500";
    case "processing":
      return "bg-purple-500";
    case "shipped":
      return "bg-cyan-500";
    case "delivered":
      return "bg-green-500";
    case "cancelled":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
}

export default OrderStatusTimeline;
