import Image from "next/image";
import promotionImage from "@/public/image1.jpg";

export default function Home() {
  return (
    <div className='h-screen w-full bg-slate-100 dark:bg-stone-900 text-slate-100 dark:text-slate-200'>
      <Image
        src={promotionImage}
        alt='Description'
        className='object-cover w-full h-full'
      />
    </div>
  );
}
