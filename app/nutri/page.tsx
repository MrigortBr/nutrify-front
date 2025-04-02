import { metadata } from "../layout";
import LayoutBody from "@/components/LayoutBody/page";
import MenuComponent from "@/components/menu/page";
import NutriComponent from "@/components/NutriComponent/page";

export default function Home() {
  const title: string = "Nutricionista";
  metadata.title = metadata.other?.prefix + title;

  return <LayoutBody header={<MenuComponent />} main={<NutriComponent />}></LayoutBody>;
}
