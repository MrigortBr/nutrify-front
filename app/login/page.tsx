import LoginComponent from "@/components/login/page";
import { metadata } from "../layout";
import LayoutBody from "@/components/LayoutBody/page";

export default function Home() {
  const title: string = "login";
  metadata.title = metadata.other?.prefix + title;

  return (
    <>
      <LayoutBody main={<LoginComponent />} />
    </>
  );
}
