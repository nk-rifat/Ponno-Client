import { Card, CardContent } from "@/components/ui/card";
import { FaStar } from "react-icons/fa";
import Image from "next/image";

const ReviewCardHome = ({ review }) => {
  const { rating, comment, userId, productId } = review;

  return (
    <Card className="h-full">
      <CardContent className="flex flex-col gap-3 h-full pt-6">
        <div className="flex items-center gap-1 text-yellow-400">
          {Array.from({ length: 5 }).map((_, i) => (
            <FaStar
              key={i}
              className={i < rating ? "text-yellow-400" : "text-gray-200"}
              size={14}
            />
          ))}
        </div>

        <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">
          {comment}
        </p>

        <div className="flex items-center gap-3 mt-auto pt-3 border-t border-gray-100">
          <div className="h-9 w-9 rounded-full overflow-hidden bg-emerald-100 shrink-0 relative">
            {userId?.profilePic ? (
              <Image
                src={userId.profilePic}
                alt={userId?.firstName || "User"}
                fill
                sizes="36px"
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-emerald-700 font-semibold text-sm">
                {userId?.firstName?.[0]?.toUpperCase() || "U"}
              </div>
            )}
          </div>

          <div>
            <p className="text-sm font-medium text-gray-800">
              {userId?.firstName || "Anonymous"}
            </p>
            {productId?.productName && (
              <p className="text-xs text-gray-500 line-clamp-1">
                on {productId.productName}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewCardHome;
