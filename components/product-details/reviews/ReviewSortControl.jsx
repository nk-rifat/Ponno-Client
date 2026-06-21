const ReviewSortControl = ({ sort, onSortChange, visible }) => {
  if (!visible) return null;

  return (
    <div className="flex justify-end mb-3">
      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
        className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        <option value="newest">Newest</option>
        <option value="highest">Highest rated</option>
        <option value="lowest">Lowest rated</option>
      </select>
    </div>
  );
};

export default ReviewSortControl;
