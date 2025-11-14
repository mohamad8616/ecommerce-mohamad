import { Badge } from "@/app//components/ui/badge";
import { Button } from "@/app//components/ui/Button";
import { Card, CardContent } from "@/app//components/ui/card";
import { Skeleton } from "@/app//components/ui/Skeleton";
import { getInvoices } from "@/lib/queries";
import { price } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSession } from "../_customhooks/hooks";

// Accessible status colors using shadcn variables
const statusColors: Record<string, string> = {
  paid: "bg-green-500/15 text-green-700 dark:text-green-400",
  pending: "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400",
  canceled: "bg-red-500/15 text-red-700 dark:text-red-400",
};

export default async function UserInvoicesPage() {
  //Authentication
  const session = await getSession();
  if (!session) {
    return notFound();
  }

  const invoices = await getInvoices(session?.user?.id);

  return (
    <main className="mx-auto max-w-3xl space-y-4 p-4">
      <h1 className="mb-4 text-center text-xl font-semibold text-foreground">
        فاکتورهای شما
      </h1>

      {invoices.length === 0 && (
        <div className="py-16 text-center text-muted-foreground">
          <p className="mb-4">هیچ فاکتوری ثبت نشده است.</p>
          <Button asChild>
            <Link href="/">بازگشت به صفحه اصلی</Link>
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {invoices.map((invoice) => (
          <Card
            key={invoice.id}
            className="rounded-2xl border border-border shadow-sm transition-shadow hover:shadow-md"
          >
            <CardContent className="space-y-3 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  شماره فاکتور:
                </span>
                <span className="text-sm font-bold text-foreground">
                  {Number(invoice.invoiceNumber).toLocaleString("fa-IR")}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  مبلغ:
                </span>
                <span className="text-sm font-semibold text-foreground">
                  {price(+invoice.totalPrice)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  وضعیت:
                </span>
                <Badge
                  className={`${statusColors[invoice.status] || "bg-muted text-foreground"} rounded-full px-3 py-1 text-xs`}
                >
                  {invoice.status === "paid"
                    ? "پرداخت شده"
                    : invoice.status === "pending"
                      ? "در انتظار پرداخت"
                      : invoice.status === "canceled"
                        ? "لغو شده"
                        : invoice.status}
                </Badge>
              </div>

              <div className="flex justify-end pt-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link
                    href={`/invoices/${invoice.id}`}
                    className="flex items-center gap-1 text-primary"
                  >
                    مشاهده فاکتور
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}

export function UserInvoicesSkeleton() {
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
