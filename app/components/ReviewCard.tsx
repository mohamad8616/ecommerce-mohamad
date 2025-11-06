import { User } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import StarRating from "./ui/starRating";
import { DummyReview } from "@prisma/client";

const ReviewCard = ({ review }: { review: DummyReview }) => {
  const persianDate = new Date(review.date).toLocaleDateString("fa-IR");

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <User className="h-5 w-5 text-primary" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="mb-2 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <div>
                <h4 className="text-sm font-semibold">{review.reviewerName}</h4>
                <p className="text-xs text-gray-500">{review.reviewerEmail}</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>{persianDate}</span>
                <StarRating rating={review.rating} size="sm" />
              </div>
            </div>

            <p className="text-sm leading-relaxed text-gray-700">
              {review.comment}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default ReviewCard;
