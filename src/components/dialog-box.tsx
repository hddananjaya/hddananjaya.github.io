import React, { useEffect, useState } from "react";
import Algo from "@/pages/algo";
import { XIcon, MinusIcon, MaximizeIcon } from "lucide-react";
import "tailwindcss/tailwind.css";
import Image from "next/image";
import useIsMobile from "@/hooks/use-mobile";


const DialogBox = () => {
  const [isOpen, setIsOpen] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) setIsOpen(false);
  }, [isMobile]);
  return (
    <>
      <button
        className="text-center justify-center bg-gradient-to-t from-gray-800 to-gray-600 text-white p-2 flex md:hidden items-center w-full flex-1"
        onClick={() => setIsOpen(true)}
      >
        Show me someting interesting
      </button>
      {isOpen && (
        <div className="">
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-0 rounded shadow-lg w-[90vw] md:w-auto">
            <div className="bg-gradient-to-t from-gray-800 to-gray-600 text-white p-2 rounded-t flex justify-between items-center">
              <div className="text-sm font-bold inline-flex gap-2">
                <Image src={'/imgs/traffic_light.png'} className="w-5 h-5" width={30} height={30} alt="trafficlight" />
                Dijkstra&apos;s Shortest Path
              </div>
              <div className="flex space-x-2">
                <button className="text-white hover:text-gray-300">
                  <MinusIcon className="w-4 h-4" />
                </button>
                <button className="text-white hover:text-gray-300">
                  <MaximizeIcon className="w-4 h-4" />
                </button>
                <button className="text-white hover:text-gray-300" onClick={() => setIsOpen(false)}>
                  <XIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <Algo />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DialogBox;