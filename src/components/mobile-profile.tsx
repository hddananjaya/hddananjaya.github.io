import Image from 'next/image';

const MobileProfile = () => {
    return (
        <div className="flex md:hidden flex-col items-center p-4 bg-gray-100 bg-opacity-40 min-h-screen pt-16">
            <div className="w-32 h-32 mb-4">
                <Image
                    src="/imgs/pyramid-72.png"
                    alt="Profile Picture"
                    width={128}
                    height={128}
                    className="rounded-full"
                />
            </div>
            <h1 className="text-2xl text-gray-900 font-bold mb-2">Akila Dananjaya</h1>
            <p className="text-center text-gray-700 mb-4">
                Techie at Heart, <br /> Software Engineer by Day.
            </p>
            <ul className="flex flex-col items-center space-y-2">

                <li>
                    <a href="https://linkedin.com/in/hd-dananjaya" className="flex items-center space-x-2">
                        <Image src="/imgs/blogging.png" alt="Blog" width={24} height={24} />
                        <span className="text-blue-500">Blog</span>
                    </a>
                </li>
                <li>
                    <a href="mailto:akiladananjaya79@gmail.com" className="flex items-center space-x-2">
                        <Image src="/imgs/private_mail.png" alt="Email" width={24} height={24} />
                        <span className="text-blue-500">Email</span>
                    </a>
                </li>
                <li>
                    <a href="https://github.com/hddananjaya" className="flex items-center space-x-2">
                        <Image src="/imgs/terminal.png" alt="GitHub" width={24} height={24} />
                        <span className="text-blue-500">GitHub</span>
                    </a>
                </li>
                <li>
                    <a href="https://linkedin.com/in/hd-dananjaya" className="flex items-center space-x-2">
                        <Image src="/imgs/linkedin.png" alt="LinkedIn" width={24} height={24} />
                        <span className="text-blue-500">LinkedIn</span>
                    </a>
                </li>

            </ul>
        </div>
    );
};

export default MobileProfile;