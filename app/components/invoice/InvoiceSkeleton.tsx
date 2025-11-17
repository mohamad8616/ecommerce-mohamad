import { Card } from "../ui/card";
import { Skeleton } from "../ui/Skeleton";

function UserInvoicesSkeleton() {
  return (
    <main className="mx-auto max-w-3xl space-y-4 p-4">
      <Skeleton className="mx-auto h-6 w-32" />
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card
            key={i}
            className="space-y-3 rounded-2xl border border-border p-4"
          >
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </Card>
        ))}
      </div>
    </main>
  );
}
export default UserInvoicesSkeleton;
