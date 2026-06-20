const StatCard = ({ icon: Icon, label, value, accent = "emerald" }) => {
  const accentStyles = {
    emerald: "bg-emerald-500/10 text-emerald-400",
    yellow: "bg-yellow-500/10 text-yellow-400",
    red: "bg-red-500/10 text-red-400",
    blue: "bg-blue-500/10 text-blue-400",
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 flex items-center gap-4">
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${accentStyles[accent]}`}
      >
        <Icon className="text-lg" />
      </div>
      <div className="min-w-0">
        <p className="text-gray-400 text-xs">{label}</p>
        <p className="text-white text-xl font-semibold mt-0.5 truncate">
          {value}
        </p>
      </div>
    </div>
  );
};

export default StatCard;
