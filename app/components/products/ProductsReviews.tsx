"use client";
import { Button } from "@/app/components/ui/Button";
import { Card, CardContent } from "@/app/components/ui/card";
import { DummyReview } from "@prisma/client";
import { Star } from "lucide-react";
import { useState } from "react";
import ReviewCard from "../review/ReviewCard";
import ReviewForm from "../review/ReviewForm";
import StarRating from "../ui/starRating";

const ProductsReviews = ({ reviews }: { reviews: DummyReview[] }) => {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 2);
  const hasMoreReviews = reviews.length > 2;

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  return (
    <section className="mt-12">
      <h2 className="mb-8 text-2xl font-bold">نظرات کاربران</h2>

      {/* Reviews Summary */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-center gap-6 md:flex-row">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">
                {averageRating.toFixed(1)}
              </div>
              <div className="mt-2 flex justify-center">
                <StarRating rating={averageRating} size="sm" />
              </div>
              <div className="mt-1 text-sm text-gray-500">
                {reviews.length} نظر
              </div>
            </div>

            <div className="flex-1">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = reviews.filter((r) => r.rating === star).length;
                const percentage =
                  reviews.length > 0 ? (count / reviews.length) * 100 : 0;

                return (
                  <div key={star} className="mb-1 flex items-center gap-2">
                    <span className="w-4 text-sm">{star}</span>
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <div className="h-2 flex-1 rounded-full bg-gray-200">
                      <div
                        className="h-2 rounded-full bg-yellow-400"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="w-8 text-left text-sm">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Write Review Form */}
      <ReviewForm />

      {/* Reviews List */}
      <div className="space-y-4">
        {displayedReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {/* See More Button */}
      {hasMoreReviews && !showAllReviews && (
        <div className="mt-6 text-center">
          <Button
            variant="outline"
            onClick={() => setShowAllReviews(true)}
            className="mx-auto"
          >
            مشاهده نظرات بیشتر ({reviews.length - 2})
          </Button>
        </div>
      )}

      {/* Show Less Button */}
      {showAllReviews && hasMoreReviews && (
        <div className="mt-6 text-center">
          <Button
            variant="outline"
            onClick={() => setShowAllReviews(false)}
            className="mx-auto"
          >
            بستن نظرات
          </Button>
        </div>
      )}

      {/* No Reviews Message */}
      {reviews.length === 0 && (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-500">
              هنوز نظری برای این محصول ثبت نشده است.
            </p>
            <p className="mt-2 text-sm text-gray-400">
              اولین نفری باشید که نظر می‌دهد
            </p>
          </CardContent>
        </Card>
      )}
    </section>
  );
};

export default ProductsReviews;
