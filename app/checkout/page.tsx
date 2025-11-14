import { Card, CardContent } from "@/app/components/ui/card";
import { redirect } from "next/navigation";
import { getSession } from "../_customhooks/hooks";
import InvoiceForm from "../components/invoice/invoiceForm";

const InvoicePage = async () => {
  //Authentication
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <main className="flex flex-col overflow-hidden bg-background text-foreground lg:mt-6">
      {/* HEADER */}
      <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur-sm lg:top-20">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-base font-semibold text-primary">صورت‌حساب</h1>
          <span className="text-sm text-muted-foreground">
            لطفاً اطلاعات خود را وارد کنید
          </span>
        </div>
      </header>

      {/* FORM SECTION */}
      <div className="mx-auto w-full max-w-2xl flex-1 px-4 py-6">
        <Card className="border border-border shadow-sm">
          <CardContent className="space-y-4 p-4">
            <InvoiceForm />
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default InvoicePage;
