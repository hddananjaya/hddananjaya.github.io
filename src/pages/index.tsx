import DialogBox from "@/components/dialog-box";
import StartMenu from "@/components/start-menu";
import Head from "next/head";


export default function Home() {
  return (

    <>
      <Head>
        <title>Akila Dananjaya - Techie at Heart, Software Engineer by Day</title>
      </Head>
      <DialogBox />
      <StartMenu />
    </>

  );
}