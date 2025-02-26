import { metadata } from "../layout";
import LayoutBody from "@/components/LayoutBody/page";
import MenuComponent from "@/components/menu/page";
import ProfileComponent from "@/components/profile/page";

export default function Home() {
  const title: string = "Perfil";
  metadata.title = metadata.other?.prefix + title;

  return <LayoutBody header={<MenuComponent />} main={<ProfileComponent />}></LayoutBody>;
}
