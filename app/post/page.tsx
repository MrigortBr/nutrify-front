import { metadata } from "../layout";
import LayoutBody from "@/components/LayoutBody/page";
import RegisterComponent from "@/components/register/page";
import MenuComponent from "@/components/menu/page";
import Post from "@/components/post/page";

export default function Home() {
  const title: string = "Adicionar publicação";
  metadata.title = metadata.other?.prefix + title;

  return <LayoutBody header={<MenuComponent />} main={<Post />}></LayoutBody>;
}
