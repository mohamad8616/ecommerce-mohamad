import Image from "next/image";
import { getSession } from "../_customhooks/hooks";

const page = async () => {
  const session = await getSession();
  const user = session?.user;

  const pStyle = "w-[350px] border-2 text-sm py-2 px-3 rounded-sm my-3";
  return (
    <main className=" space-y-7 text-stone-900 dark:text-stone-200">
      <h1 className="mb-4 text-4xl font-bold">پروفایل</h1>
      <div className="mb-4 flex w-full items-center justify-evenly">
        <h3 className="mt-2 ">خوش آمدید، {user?.name}</h3>
        <Image
          src={user?.image || ""}
          alt={user?.name || ""}
          width={120}
          height={120}
          className="rounded-full"
        />
      </div>

      <section>
        <h2 className="text-xl font-bold">اطلاعات حساب</h2>
        <p className={pStyle}>ایمیل: {user?.email}</p>
        <p className={pStyle}>نام: {user?.name}</p>
        <p className={pStyle}>
          تاریخ عضویت: {user?.createdAt?.toLocaleDateString()}
        </p>
      </section>
    </main>
  );
};

export default page;
