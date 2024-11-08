import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <aside className="absolute left-0 top-0 h-full  px-4 py-8 flex flex-col items-start">
        <div className="text-gray-900 flex flex-col space-y-4 bg-white bg-opacity-30 p-3 rounded-md backdrop-blur-lg">
          {" "}
          <a
            href="https://www.linkedin.com/in/hd-dananjaya/"
            className="flex flex-col items-center hover:underline text-sm"
            target="_blank"
          >
            <img src="/imgs/linkedin.png" alt="LinkedIn" className="w-8" />
            LinkedIn
          </a>
          <a
            href="mailto:akiladananjaya79@gmail.com"
            className="flex flex-col items-center hover:underline text-sm"
            target="_blank"
          >
            <img src="/imgs/private_mail.png" alt="Email" className="w-8" />
            Email
          </a>
          <a
            href="https://hddananjaya.wordpress.com/"
            className="flex flex-col items-center hover:underline text-sm"
            target="_blank"
          >
            <img src="/imgs/blogging.png" alt="LinkedIn" className="w-8" />
            Blog
          </a>
          <a
            href="https://github.com/hddananjaya"
            className="flex flex-col items-center hover:underline text-sm"
            target="_blank"
          >
            <img src="/imgs/terminal.png" alt="LinkedIn" className="w-8" />
            GitHub
          </a>
        </div>
      </aside>
      <div className="">
        <Component {...pageProps} />
      </div>
    </>
  );
}
