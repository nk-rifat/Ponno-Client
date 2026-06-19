const ProductCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-gray-200 dark:bg-gray-700" />
      <div className="p-6 space-y-3">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
        <div className="flex space-x-2 pt-1">
          <div className="flex-1 h-9 bg-gray-200 dark:bg-gray-700 rounded-lg" />
          <div className="w-10 h-9 bg-gray-200 dark:bg-gray-700 rounded-lg" />
          <div className="w-10 h-9 bg-gray-200 dark:bg-gray-700 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
