const OrderRowSkeleton = () => {
  return (
    <tr className="border-b border-slate-700 animate-pulse">
      <td className="px-4 py-4">
        <div className="h-4 bg-slate-700 rounded w-24" />
      </td>
      <td className="px-4 py-4">
        <div className="h-4 bg-slate-700 rounded w-32" />
      </td>
      <td className="px-4 py-4">
        <div className="h-4 bg-slate-700 rounded w-20" />
      </td>
      <td className="px-4 py-4">
        <div className="h-4 bg-slate-700 rounded w-16" />
      </td>
      <td className="px-4 py-4">
        <div className="h-6 bg-slate-700 rounded-full w-20" />
      </td>
      <td className="px-4 py-4">
        <div className="h-8 bg-slate-700 rounded w-28" />
      </td>
    </tr>
  );
};

export default OrderRowSkeleton;
