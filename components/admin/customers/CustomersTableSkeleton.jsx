const CustomersTableSkeleton = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="h-8 w-40 bg-slate-700 rounded animate-pulse" />

      {/* Filters */}
      <div className="flex gap-3">
        <div className="h-10 w-64 bg-slate-700 rounded animate-pulse" />
        <div className="h-10 w-40 bg-slate-700 rounded animate-pulse" />
      </div>

      {/* Table */}
      <div className="rounded-xl border border-slate-800 overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-4 gap-4 px-4 py-3 border-b border-slate-800">
          <div className="h-4 w-24 bg-slate-700 rounded animate-pulse" />
          <div className="h-4 w-16 bg-slate-700 rounded animate-pulse" />
          <div className="h-4 w-20 bg-slate-700 rounded animate-pulse" />
          <div className="h-4 w-16 bg-slate-700 rounded animate-pulse ml-auto" />
        </div>

        {/* Rows */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-4 gap-4 px-4 py-4 border-b border-slate-800 items-center"
          >
            {/* Customer cell */}
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-slate-700 animate-pulse shrink-0" />
              <div className="space-y-1.5">
                <div className="h-3.5 w-28 bg-slate-700 rounded animate-pulse" />
                <div className="h-3 w-36 bg-slate-600 rounded animate-pulse" />
              </div>
            </div>
            {/* Status */}
            <div className="h-6 w-16 bg-slate-700 rounded-full animate-pulse" />
            {/* Joined */}
            <div className="h-3.5 w-24 bg-slate-700 rounded animate-pulse" />
            {/* Actions */}
            <div className="h-8 w-8 bg-slate-700 rounded animate-pulse ml-auto" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomersTableSkeleton;
