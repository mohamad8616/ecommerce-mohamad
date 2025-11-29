import { Suspense } from "react";
import Loading from "../components/Loading";
import ThanksPageClient from "../components/ThanksPage";

export default function ThanksPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ThanksPageClient />
    </Suspense>
  );
}
