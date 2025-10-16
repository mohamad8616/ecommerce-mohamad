// import Image from "next/image";
// import { getSession } from "../_customhooks/hooks";

// const page = async () => {
//   const session = await getSession();
//   const user = session?.user;

//   const pStyle = "w-[350px] border-2 text-sm py-2 px-3 rounded-sm my-3";
//   return (
//     <main className=" space-y-7 text-stone-900 dark:text-stone-200">
//       <h1 className="mb-4 text-4xl font-bold">پروفایل</h1>
//       <div className="mb-4 flex w-full items-center justify-evenly">
//         <h3 className="mt-2 ">خوش آمدید، {user?.name}</h3>
//         <Image
//           src={user?.image || ""}
//           alt={user?.name || ""}
//           width={120}
//           height={120}
//           className="rounded-full"
//         />
//       </div>

//       <section>
//         <h2 className="text-xl font-bold">اطلاعات حساب</h2>
//         <p className={pStyle}>ایمیل: {user?.email}</p>
//         <p className={pStyle}>نام: {user?.name}</p>
//         <p className={pStyle}>
//           تاریخ عضویت: {user?.createdAt?.toLocaleDateString()}
//         </p>
//       </section>
//     </main>
//   );
// };

// export default page;
import Image from "next/image";
import { getSession } from "../_customhooks/hooks";
import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";

const page = async () => {
  const session = await getSession();
  const user = session?.user;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 px-4 py-8 dark:from-slate-900 dark:to-slate-800">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text py-1 text-4xl font-bold text-transparent">
            پروفایل کاربری
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            مدیریت اطلاعات حساب کاربری شما
          </p>
        </div>

        {/* Profile Card */}
        <Card className="overflow-hidden rounded-2xl border-slate-200 bg-white/80 shadow-xl backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800/80">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 p-8 text-white">
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Image
                    src={user?.image || "/default-avatar.png"}
                    alt={user?.name || "User"}
                    width={120}
                    height={120}
                    className="rounded-full border-4 border-white/20 shadow-lg"
                  />
                  <div className="absolute -right-2 -bottom-2">
                    <Badge
                      variant="secondary"
                      className="border-0 bg-green-500 text-white"
                    >
                      فعال
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <h2 className="mb-2 text-2xl font-bold">{user?.name}</h2>
                  <p className="text-blue-100 opacity-90">{user?.email}</p>
                </div>
              </div>

              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2">
                  <span className="text-sm">عضویت از</span>
                  <span className="font-semibold">
                    {user?.createdAt?.toLocaleDateString("fa-IR")}
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-700 dark:text-slate-300">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  اطلاعات شخصی
                </h3>

                <InfoField label="نام کامل" value={user?.name} />
                <InfoField label="آدرس ایمیل" value={user?.email} />
                <InfoField
                  label="تاریخ عضویت"
                  value={user?.createdAt?.toLocaleDateString("fa-IR")}
                />
              </div>

              {/* Account Status */}
              <div className="space-y-4">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-700 dark:text-slate-300">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  وضعیت حساب
                </h3>

                <div className="space-y-3 rounded-lg bg-slate-50 p-4 dark:bg-slate-700/50">
                  <StatusItem label="احراز هویت" status="تکمیل شده" success />
                  <StatusItem label="پروفایل" status="فعال" success />
                  <StatusItem label="ایمیل" status="تأیید شده" success />
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 border-t border-slate-200 pt-6 dark:border-slate-700">
              <h3 className="mb-4 text-lg font-semibold text-slate-700 dark:text-slate-300">
                اقدامات سریع
              </h3>
              <div className="flex flex-wrap gap-3">
                <ActionButton>ویرایش پروفایل</ActionButton>
                <ActionButton variant="outline">تغییر رمز عبور</ActionButton>
                <ActionButton variant="outline">تنظیمات اعلانات</ActionButton>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

// Reusable Components
const InfoField = ({ label, value }: { label: string; value?: string }) => (
  <div className="flex flex-col justify-between rounded-lg bg-slate-50 p-3 sm:flex-row sm:items-center dark:bg-slate-700/30">
    <span className="mb-1 text-sm font-medium text-slate-500 sm:mb-0 dark:text-slate-400">
      {label}
    </span>
    <span className="text-right font-semibold text-slate-800 dark:text-slate-200">
      {value || "---"}
    </span>
  </div>
);

const StatusItem = ({
  label,
  status,
  success,
}: {
  label: string;
  status: string;
  success?: boolean;
}) => (
  <div className="flex items-center justify-between">
    <span className="text-slate-600 dark:text-slate-400">{label}</span>
    <Badge
      variant={success ? "default" : "secondary"}
      className={
        success
          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
          : ""
      }
    >
      {status}
    </Badge>
  </div>
);

const ActionButton = ({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "outline";
}) => (
  <button
    className={`
    rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200
    ${
      variant === "default"
        ? "bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:shadow-lg"
        : "border border-slate-300 text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
    }
  `}
  >
    {children}
  </button>
);

export default page;
