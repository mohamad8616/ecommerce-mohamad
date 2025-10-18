import Image from "next/image";
import { getSession } from "../_customhooks/hooks";
import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import Link from "next/link";

import { Button } from "../components/ui/Button";
import EditProfileSheet from "../components/profile/EditProfileSheet";
import ChangePasswordSheet from "../components/profile/ChangePasswordSheet";

const page = async () => {
  const session = await getSession();
  const user = session?.user;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 px-1 py-8 md:px-4 dark:from-slate-900 dark:to-slate-800">
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
          <CardHeader className="bg-background p-4 md:p-8">
            <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center md:gap-6">
              <div className="flex flex-col items-start gap-3 md:flex-row md:items-center lg:gap-6">
                <div className="relative h-16 w-16 md:h-32 md:w-32">
                  <Image
                    src={user?.image || "/avatar.png"}
                    alt={user?.name || "User"}
                    fill
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
                  <h2 className=" mb-2 font-bold sm:text-lg md:text-2xl">
                    {user?.name}
                  </h2>
                  <p className=" opacity-90">{user?.email}</p>
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
                  <StatusItem
                    label="ایمیل"
                    status={user?.emailVerified ? "تأیید شده" : "تأیید نشده"}
                    success={user?.emailVerified}
                  />
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 border-t border-slate-200 pt-6 dark:border-slate-700">
              <h3 className="mb-4 text-lg font-semibold text-slate-700 dark:text-slate-300">
                اقدامات سریع
              </h3>
              <div className="flex flex-wrap gap-3">
                <EditProfileSheet user={user} />
                <ChangePasswordSheet userId={user?.id} />
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

export default page;
