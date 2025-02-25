import { metadata } from "../layout";
import LayoutBody from "@/components/LayoutBody/page";
import RegisterComponent from "@/components/register/page";
import MenuComponent from "@/components/menu/page";
import HomeComponent from "@/components/HomeComponent/page";

export default function Home() {
  const title: string = "Pagina principal";
  metadata.title = metadata.other?.prefix + title;

  return <LayoutBody header={<MenuComponent />} main={<HomeComponent />}></LayoutBody>;
}
