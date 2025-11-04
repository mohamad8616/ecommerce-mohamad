export default function Loading() {
  return (
    <div className="container mx-auto animate-pulse px-4 py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Image Gallery Skeleton */}
        <div>
          <div className="mb-4 aspect-square w-full rounded-lg bg-gray-200"></div>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-20 w-20 rounded-md bg-gray-200"></div>
            ))}
          </div>
        </div>

        {/* Product Info Skeleton */}
        <div className="space-y-4">
          <div className="h-8 w-3/4 rounded bg-gray-200"></div>
          <div className="h-4 w-1/2 rounded bg-gray-200"></div>
          <div className="h-6 w-1/4 rounded bg-gray-200"></div>
          <div className="h-12 rounded bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
}
