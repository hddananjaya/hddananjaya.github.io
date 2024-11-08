import DialogBox from "@/components/dialog-box";
import StartMenu from "@/components/start-menu";
import Head from "next/head";


export default function Home() {
  return (

    <>
      <Head>
        <title>Akila Dananjaya - Techie at Heart, Software Engineer by Day</title>

      </Head>
      <div className={`flex gap-32 absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]`}>
        <div className="flex-1">
          <DialogBox />
        </div>
      </div>
      <StartMenu />
    </>

  );
}