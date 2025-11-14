import React, { useState } from "react";
import { Input } from "@/app/components/ui/Input";
import { Label } from "@/app/components/ui/Label";
import { Textarea } from "@/app/components/ui/textarea";
import { Star } from "lucide-react";
import { Button } from "../ui/Button";
import { Card, CardContent } from "../ui/card";

const ReviewForm = () => {
  const [reviewForm, setReviewForm] = useState({
    rating: 0,
    comment: "",
    reviewerName: "",
    reviewerEmail: "",
  });
  const [hoverRating, setHoverRating] = useState(0);
  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <form className="space-y-4">
          {/* Rating Stars */}
          <div>
            <Label htmlFor="rating" className="mb-2 block">
              امتیاز شما
            </Label>
            <div className="flex gap-1" dir="ltr">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-8 w-8 transition-colors ${
                      star <= (hoverRating || reviewForm.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Comment */}
          <div>
            <Label htmlFor="comment" className="mb-2 block">
              نظر شما
            </Label>
            <Textarea
              id="comment"
              value={reviewForm.comment}
              onChange={(e) =>
                setReviewForm((prev) => ({
                  ...prev,
                  comment: e.target.value,
                }))
              }
              placeholder="نظر خود را درباره این محصول بنویسید..."
              className="min-h-[100px] resize-none"
              required
            />
          </div>

          {/* Name and Email */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="name" className="mb-2 block">
                نام
              </Label>
              <Input
                id="name"
                type="text"
                value={reviewForm.reviewerName}
                onChange={(e) =>
                  setReviewForm((prev) => ({
                    ...prev,
                    reviewerName: e.target.value,
                  }))
                }
                placeholder="نام خود را وارد کنید"
                required
              />
            </div>
            <div>
              <Label htmlFor="email" className="mb-2 block">
                ایمیل
              </Label>
              <Input
                id="email"
                type="email"
                value={reviewForm.reviewerEmail}
                onChange={(e) =>
                  setReviewForm((prev) => ({
                    ...prev,
                    reviewerEmail: e.target.value,
                  }))
                }
                placeholder="email@example.com"
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full md:w-auto">
            ثبت نظر
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ReviewForm;
