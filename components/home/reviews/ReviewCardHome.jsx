import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaStar } from "react-icons/fa";

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
          <Avatar className="h-9 w-9">
            <AvatarImage src={userId?.profilePic} alt={userId?.firstName} />
            <AvatarFallback className="bg-emerald-100 text-emerald-700 font-semibold text-sm">
              {userId?.firstName?.[0]?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>

          <div>
            <p className="text-sm font-medium text-gray-800">
              {userId?.firstName || "Anonymous"}
            </p>
            {productId?.productName && (
              <p className="text-xs text-gray-400 line-clamp-1">
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
