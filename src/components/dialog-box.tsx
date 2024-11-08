import React, { useState } from "react";
import Algo from "@/pages/algo";
import { XIcon, MinusIcon, MaximizeIcon } from "lucide-react";
import "tailwindcss/tailwind.css";
import Image from "next/image";

const DialogBox = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-0 rounded shadow-lg">
            <div className="bg-gradient-to-t from-gray-800 to-gray-600 text-white p-2 rounded-t flex justify-between items-center">
              <div className="text-sm font-bold inline-flex gap-2">
                <Image src={'/imgs/traffic_light.png'} className="w-5 h-5" width={30} height={30} alt="trafficlight"/>
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