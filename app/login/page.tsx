import LoginComponent from "@/components/login/page";
import { metadata } from "../layout";
import LayoutBody from "@/components/LayoutBody/page";
import { Suspense } from "react";

export default function Home() {
  const title: string = "login";
  metadata.title = metadata.other?.prefix + title;

  return (
    <Suspense>
      <LayoutBody main={<LoginComponent />} />
    </Suspense>
  );
}
