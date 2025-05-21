import { metadata } from "@/app/layout";
import LayoutBody from "@/components/LayoutBody/page";
import RegisterNutritionist from "@/components/registerNutritionist/page";

export default function Home() {
  const title: string = "Registrar Nutricionista";
  metadata.title = metadata.other?.prefix + title;

  return <LayoutBody main={<RegisterNutritionist />} />;
}
