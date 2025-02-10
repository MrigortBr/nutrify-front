import { metadata } from "../layout";
import LayoutBody from "@/components/LayoutBody/page";
import RegisterComponent from "@/components/register/page";

export default function Home() {
  const title: string = "Registrar";
  metadata.title = metadata.other?.prefix + title;

  return <LayoutBody main={<RegisterComponent />} />;
}
