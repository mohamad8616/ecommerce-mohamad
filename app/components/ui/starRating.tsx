import { Star, StarHalf } from "lucide-react";

const StarRating = ({
  rating,
  size = "default",
}: {
  rating: number;
  size?: "sm" | "default";
}) => {
  const starSize = size === "sm" ? "w-4 h-4" : "w-5 h-5";

  return (
    <div className="flex gap-0.5" dir="ltr">
      {[1, 2, 3, 4, 5].map((star) => {
        if (rating >= star) {
          return (
            <Star
              key={star}
              className={`${starSize} fill-yellow-400 text-yellow-400`}
            />
          );
        } else if (rating > star - 1 && rating < star) {
          return (
            <StarHalf
              key={star}
              className={`${starSize} fill-yellow-400 text-yellow-400`}
            />
          );
        } else {
          return <Star key={star} className={`${starSize} text-gray-300`} />;
        }
      })}
    </div>
  );
};
export default StarRating;
