import { metadata } from "../layout";
import { Suspense } from "react";
import { VerifyPage } from "@/components/verifyPage/page";

export default function Home() {
  const title: string = "Verificação de email";
  metadata.title = metadata.other?.prefix + title;

  return (
    <Suspense>
      <VerifyPage />
    </Suspense>
  );
}
