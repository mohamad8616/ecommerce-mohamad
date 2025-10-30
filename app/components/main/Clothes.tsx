// import React from "react";
// import ClothesSlider from "./ClothesSlider";
// import localFont from "next/font/local";

// const myoFont = localFont({
//   src: "../../../fonts/AGhasem.ttf",
//   display: "swap",
// });

// const Clothes = () => {
//   return (
//     <section className="mt-30 flex h-auto min-h-[500px] w-full flex-col lg:flex-row">
//       <div className="flex h-full w-full flex-col items-center justify-center space-y-3 bg-primary p-4 text-secondary lg:w-1/2">
//         <div className="h-1/2 w-full space-y-6 border-4 border-secondary/50 p-8">
//           <p
//             className={
//               myoFont.className + " text-4xl font-bold text-orange-500"
//             }
//           >
//             خرید لوکس، قیمت مناسب
//           </p>
//           <p className="leading-9  tracking-wider lg:text-xl">
//             به دنیای مد و سبک ما خوش آمدید! در اینجا می‌توانید بهترین برندهای
//             لباس را با
//             <span className="font-bold text-orange-400">
//               {" "}
//               تخفیف‌های فوق‌العاده{" "}
//             </span>
//             پیدا کنید. ما با ارائه محصولات اورجینال و باکیفیت، خرید لوکس را برای
//             همه قابل دسترس کرده‌ایم.
//           </p>
//           <ul className="mr-4 list-inside list-disc space-y-2 text-justify text-lg">
//             <li>تخفیف‌های همیشگی تا 70%</li>
//             <li>محصولات اورجینال با گارانتی اصالت</li>
//             <li>جدیدترین ترندهای فصل</li>
//             <li>تحویل سریع در سراسر کشور</li>
//           </ul>
//         </div>
//         <div className="h-1/2 w-full space-y-4 p-8">
//           <p className="text-2xl font-bold text-orange-400">
//             چرا ما را انتخاب کنید؟
//           </p>
//           <p className="text-lg leading-8">
//             زیرا معتقدیم همه حق دارند بهترین باشند! ما پل ارتباطی بین شما و
//             برندهای لوکس جهانی هستیم، بدون اینکه نیاز باشد هزینه گزافی بپردازید.
//             کیفیت عالی، قیمت مناسب و خدمات ممتاز،
//             <span className="font-semibold"> تعهد همیشگی ما به شماست.</span>
//           </p>
//           <p className="mt-4 text-center text-xl font-semibold text-orange-300">
//             همین حالا به خانواده ما بپیوندید!
//           </p>
//         </div>
//       </div>
//       <div className="h-full w-full bg-secondary text-primary lg:w-1/2">
//         <ClothesSlider />
//       </div>
//     </section>
//   );
// };

// export default Clothes;
import React from "react";
import ClothesSlider from "./ClothesSlider";
import localFont from "next/font/local";

const myoFont = localFont({
  src: "../../../fonts/AGhasem.ttf",
  display: "swap",
});

const Clothes = () => {
  return (
    <section className="mt-30 flex w-full flex-col lg:flex-row">
      {/* Text Section */}
      <div className="flex w-full flex-col items-center justify-center space-y-4 bg-secondary p-4 text-primary lg:w-1/2 lg:space-y-6">
        <div className="w-full space-y-4 border-4 border-secondary/50 p-4 lg:space-y-6 lg:p-8">
          <p
            className={`${myoFont.className} text-3xl font-bold text-orange-500 lg:text-4xl`}
          >
            خرید لوکس، قیمت مناسب
          </p>
          <p className="text-base leading-7 tracking-wide lg:text-xl lg:leading-9">
            در اینجا می‌توانید بهترین برندهای لباس را با
            <span className="font-bold text-orange-400">
              {" "}
              تخفیف‌های فوق‌العاده{" "}
            </span>
            پیدا کنید. ما با ارائه محصولات اورجینال و باکیفیت، خرید لوکس را برای
            همه قابل دسترس کرده‌ایم.
          </p>
          <ul className="mr-2 list-inside list-disc space-y-1 text-justify text-sm lg:mr-4 lg:space-y-2 lg:text-lg">
            <li>تخفیف‌های همیشگی تا 70%</li>
            <li>محصولات اورجینال با گارانتی اصالت</li>
            <li>جدیدترین ترندهای فصل</li>
            <li>تحویل سریع در سراسر کشور</li>
          </ul>
        </div>

        <div className="w-full space-y-3 p-4 lg:space-y-4 lg:p-8">
          <p className="text-xl font-bold text-orange-400 lg:text-2xl">
            چرا ما را انتخاب کنید؟
          </p>
          <p className="text-base leading-7 lg:text-lg lg:leading-8">
            زیرا معتقدیم همه حق دارند بهترین باشند! ما پل ارتباطی بین شما و
            برندهای لوکس جهانی هستیم، بدون اینکه نیاز باشد هزینه گزافی بپردازید.
            کیفیت عالی، قیمت مناسب و خدمات ممتاز،
            <span className="font-semibold"> تعهد همیشگی ما به شماست.</span>
          </p>
          <p className="mt-2 text-center text-lg font-semibold text-orange-600 lg:mt-4 lg:text-xl dark:text-orange-300">
            همین حالا به خانواده ما بپیوندید!
          </p>
        </div>
      </div>

      {/* Slider Section */}
      <div className="w-full bg-secondary p-8 text-primary lg:w-1/2">
        <div className="mx-auto h-[600px] lg:h-full">
          <ClothesSlider />
        </div>
      </div>
    </section>
  );
};

export default Clothes;
