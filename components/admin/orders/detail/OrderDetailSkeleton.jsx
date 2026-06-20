const OrderDetailSkeleton = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8 animate-pulse">
      <div className="h-8 bg-slate-800 rounded w-48 mb-6" />
      <div className="h-20 bg-slate-800 rounded-2xl mb-6" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="h-64 bg-slate-800 rounded-2xl" />
          <div className="h-32 bg-slate-800 rounded-2xl" />
        </div>
        <div className="space-y-6">
          <div className="h-40 bg-slate-800 rounded-2xl" />
          <div className="h-48 bg-slate-800 rounded-2xl" />
        </div>
      </div>
    </div>
  );
};

export default OrderDetailSkeleton;
