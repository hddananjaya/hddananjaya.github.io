import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent } from '@radix-ui/react-dialog';

const Taskbar = () => {
    const [currentTime, setCurrentTime] = useState('');
    const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            let hours = now.getHours();
            const minutes = now.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            const strTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
            setCurrentTime(strTime);
        };

        updateTime();
        const timerId = setInterval(updateTime, 60000); // Update every minute

        return () => clearInterval(timerId); // Cleanup interval on component unmount
    }, []);

    const toggleStartMenu = () => {
        setIsStartMenuOpen(!isStartMenuOpen);
    };

    return (
        <div className="hidden md:flex fixed bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-gray-800 to-gray-600 text-white items-center justify-between pr-4 shadow-lg border-t border-gray-700">
            <div className="flex items-center space-x-4 h-full">
                <button
                    className="h-full px-6 flex items-center space-x-2 bg-green-500 hover:bg-green-400 p-2 rounded-r-3xl shadow-inner border border-green-600 text-white font-bold text-sm transition duration-300 ease-in-out transform"
                    style={{
                        backgroundImage: `linear-gradient(180deg, transparent 65%, #ffffff55)`
                    }}
                    onClick={toggleStartMenu}
                >
                    <Image alt='start icon' src='/imgs/pyramid.png' width={24} height={24} />
                    <span className="hidden md:block text-gray-900">Start</span>
                </button>
            </div>
            <div className="flex items-center space-x-4">
                <button className="hover:bg-gray-700 p-2">
                    <Image alt='notification icon' src='/imgs/notification.png' className='w-4 h-4' width={24} height={24} />
                </button>
                <div className="flex items-center space-x-2">
                    <span className="hidden md:block text-xs">{currentTime}</span>
                </div>
            </div>

            <Dialog open={isStartMenuOpen} onOpenChange={setIsStartMenuOpen}>
                <DialogContent className="h-96 fixed bottom-10 bg-white rounded shadow-lg p-4 w-64 border-8 border-gray-300 windows7-style" style={{ borderImage: 'linear-gradient(to right, #1f2937, #4b5563) 1' }}>
                    <ul className="space-y-2 text-gray-900">
                        <li>
                            <a href="https://www.linkedin.com/in/hd-dananjaya/" target="_blank" className="hover:underline">LinkedIn</a>
                        </li>
                        <li>
                            <a href="https://github.com/hddananjaya" target="_blank" className="hover:underline">GitHub</a>
                        </li>
                        <li>
                            <a href="https://hddananjaya.wordpress.com/" target="_blank" className="hover:underline">Blog</a>
                        </li>
                        <li>
                            <a href="mailto:akiladananjaya79@gmail.com" target="_blank" className="hover:underline">Email</a>
                        </li>
                    </ul>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Taskbar;