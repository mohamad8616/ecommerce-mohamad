import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Separator } from "@/app/components/ui/Separator";
import { isDummyProduct, Product } from "@/lib/definitions";
import { getInvoiceById } from "@/lib/queries";
import { cn, price } from "@/lib/utils";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const fetchProduct = async (id: string) => {
  const res = await fetch(`${process.env.APP_URL}/api/single?id=${id}`);
  if (!res.ok) {
    throw new Error("Product not found");
  }
  const data: Product = await res.json();
  return data;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `فاکتور شماره ${id}`,
    description: `جزئیات فاکتور شماره ${id}`,
  };
}

export default async function SingleInvoicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const invoice = await getInvoiceById(+id);
  if (!invoice) {
    return (
      <main className="h-11/12 w-full items-center justify-center">
        <p>خطا در برقراری ارتباط با سرور</p>
      </main>
    );
  }

  const products = await Promise.all(
    invoice.items.map(
      async (item) => await fetchProduct(item.productId.toString()),
    ),
  );

  return (
    <main className="container mx-auto max-w-2xl px-4 py-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-xl font-bold text-primary">جزییات فاکتور</h1>
        <p className="text-sm text-muted-foreground">
          شناسه فاکتور: {invoice.invoiceNumber}
        </p>
      </div>

      {/* Invoice Card */}
      <Card className="border border-border shadow-sm">
        <CardHeader>
          <div className="flex flex-col gap-1">
            <CardTitle className="flex items-center justify-between text-lg font-semibold">
              <span>اطلاعات خریدار</span>
              <Badge
                className={cn(
                  invoice.status === "paid" && "bg-green-500",
                  invoice.status === "pending" && "bg-yellow-500",
                  invoice.status === "canceled" && "bg-red-500",
                )}
              >
                {invoice.status === "paid" && "پرداخت شده"}
                {invoice.status === "pending" && "در انتظار پرداخت"}
                {invoice.status === "canceled" && "لغو شده"}
              </Badge>
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Customer Info */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-muted-foreground">نام:</p>
              <p>{invoice.firstname}</p>
            </div>
            <div>
              <p className="text-muted-foreground">نام خانوادگی:</p>
              <p>{invoice.lastname}</p>
            </div>
            <div>
              <p className="text-muted-foreground">ایمیل:</p>
              <p>{invoice.email}</p>
            </div>
            <div>
              <p className="text-muted-foreground">شماره موبایل:</p>
              <p>{invoice.mobile}</p>
            </div>
          </div>

          <div className="text-sm">
            <p className="text-muted-foreground">آدرس:</p>
            <p>{invoice.address}</p>
          </div>

          <Separator />

          {/* Items List */}
          <div>
            <h3 className="mb-3 font-semibold text-primary">محصولات</h3>

            <div className="space-y-3">
              {invoice.items.map((item) => {
                const product = products.find(
                  (product) => product.id === item.productId,
                )!;
                const isDummy = isDummyProduct(product);
                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-x-3 rounded-lg border p-3 text-sm"
                  >
                    <div className="relative aspect-square h-20 w-20 shrink-0">
                      <Image
                        fill
                        src={isDummy ? product.thumbnail! : product.image!}
                        alt={product.title.substring(0, 6)}
                        className="object-contain"
                      />
                    </div>

                    <div>
                      <p className="line-clamp-1">
                        محصول:
                        {product.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        تعداد: {digitsEnToFa(item.quantity)}
                      </p>
                    </div>
                    <p className="font-medium">{price(+item.price)}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <Separator />

          {/* Total */}
          <div className="flex items-center justify-between text-base font-semibold">
            <span>جمع کل:</span>
            <span className="text-primary">{price(+invoice.totalPrice)} </span>
          </div>
        </CardContent>
      </Card>

      {/* Back Button */}
      <div className="mt-6">
        <Link href="/invoices">
          <Button variant="outline" className="w-full">
            بازگشت
          </Button>
        </Link>
      </div>
    </main>
  );
}
