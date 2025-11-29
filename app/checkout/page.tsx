import type { Metadata } from "next";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { redirect } from "next/navigation";
import { getSession } from "../_customhooks/hooks";
import InvoiceForm from "../components/invoice/invoiceForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordian";
import { Package, CreditCard, MapPin, HelpCircle } from "lucide-react";
import ShoppingStatus from "../components/ShoppingStatus";

export const metadata: Metadata = {
  title: "صورت حساب خرید",
  description: "صفحه سبد خرید و صورت‌حساب",
};

const InvoicePage = async () => {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/30 px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <ShoppingStatus status="checkout" />
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
            صورت‌حساب خرید
          </h1>
          <p className="mt-2 text-muted-foreground">
            لطفاً اطلاعات ارسال را وارد کنید
          </p>
        </div>

        {/* Main Grid: Form + FAQ */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
          {/* Form Section - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden border-0 shadow-lg">
              <CardHeader className="border-b bg-primary/5">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <MapPin className="h-6 w-6 text-primary" />
                  اطلاعات ارسال و پرداخت
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 sm:p-8">
                <InvoiceForm
                  email={session.user.email}
                  name={session.user.name}
                />
              </CardContent>
            </Card>
          </div>

          {/* FAQ Accordion Section */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 h-fit border-0 shadow-lg">
              <CardHeader className="border-b bg-primary/5">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <HelpCircle className="h-6 w-6 text-primary" />
                  سوالات متداول
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <Accordion
                  type="single"
                  collapsible
                  className="w-full space-y-3"
                >
                  {faqItems.map((item, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="overflow-hidden rounded-lg border transition-all hover:border-primary/50"
                    >
                      <AccordionTrigger className="cursor-pointer px-5 py-4 text-right font-medium text-foreground transition-colors hover:bg-primary/5 hover:no-underline">
                        <span className="flex items-center gap-3">
                          {item.icon}
                          {item.question}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="px-5 pt-2 pb-5 leading-relaxed text-muted-foreground">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Payment information */}
          <div className="lg:col-span-3">
            <Card className="border-0 shadow-lg">
              <CardHeader className="border-b bg-primary/5">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <CreditCard className="h-6 w-6 text-primary" />
                  اطلاعات پرداخت
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 sm:p-8">
                <div className="space-y-4">
                  <div>
                    <h3 className="mb-2 font-semibold text-foreground">
                      پرداخت امن
                    </h3>
                    <p className="text-muted-foreground">
                      پرداخت امن به وسیله کلیه کارت‌های عضو شتاب از طریق درگاه
                      زرین‌پال
                    </p>
                  </div>
                  <div className="rounded-lg border border-primary/10 bg-primary/5 p-4">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      اطلاعات شخصی شما برای پردازش سفارش شما، پشتیبانی از تجربه
                      شما در سراسر این وب سایت و برای اهدافی که در سیاست حفظ
                      حریم خصوصی ذکر شده است استفاده می شود.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
};

// FAQ Data with Icons
const faqItems = [
  {
    question: "تا چند روز بسته پس از خرید به دستم می‌رسد؟",
    answer:
      "بسته‌های خریداری شده معمولاً ظرف ۳ تا ۷ روز کاری به دست شما می‌رسد، بسته به موقعیت جغرافیایی و روش ارسال انتخاب شده.",
    icon: <Package className="h-5 w-5 text-primary" />,
  },
  {
    question: "روش پرداخت چگونه است؟",
    answer:
      "ما روش پرداخت امن از طریق درگاه زرین‌پال ارائه می‌دهیم که از اطلاعات کارت شما کاملاً محافظت می‌کند.",
    icon: <CreditCard className="h-5 w-5 text-primary" />,
  },
  {
    question: "چرا باید اطلاعات دقیق خود را وارد کنم؟",
    answer:
      "وارد کردن اطلاعات دقیق برای اطمینان از تحویل صحیح و به موقع بسته شما ضروری است.",
    icon: <MapPin className="h-5 w-5 text-primary" />,
  },
  {
    question: "چرا بسته سفارش من هنوز نرسیده است؟",
    answer:
      "اگر بسته شما هنوز نرسیده است، لطفاً ابتدا وضعیت ارسال را بررسی کنید و در صورت نیاز با پشتیبانی مشتریان ما تماس بگیرید.",
    icon: <HelpCircle className="h-5 w-5 text-primary" />,
  },
];

export default InvoicePage;
