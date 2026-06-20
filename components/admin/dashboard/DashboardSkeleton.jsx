const DashboardSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-4 py-4 animate-pulse">
      <div className="h-8 bg-slate-800 rounded w-48 mb-6" />

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-20 bg-slate-800 rounded-2xl" />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-80 bg-slate-800 rounded-2xl" />
        <div className="h-80 bg-slate-800 rounded-2xl" />
      </div>
    </div>
  );
};

export default DashboardSkeleton;
