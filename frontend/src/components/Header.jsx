import Link from "next/link";

export default function Navbar() {
    return (
        <header className="py-4 relative">
            <div className="container mx-auto px-4">
                <div className="flex justify-center items-center">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <div className="bg-[#06ae6f] rounded-full p-2">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M12 16L16 12L12 8"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path d="M8 12H16" stroke="white" strokeWidth="2" strokeLinecap="round"
                                      strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <span className="font-bold text-lg">SynergyNow</span>
                    </div>

                    {/* Hamburger Menu */}
                    <label className="md:hidden cursor-pointer" htmlFor="nav-toggle">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M4 6h16M4 12h16M4 18h16"/>
                        </svg>
                    </label>
                    <input type="checkbox" id="nav-toggle" className="hidden peer"/>

                    {/* Navigation Links */}
                    <div className="fixed md:static top-[4rem] left-0 w-full md:w-auto
                                  bg-[#f3f3f6] md:bg-transparent
                                  hidden peer-checked:block md:block
                                  transition-all duration-300
                                  md:flex md:items-center md:justify-between md:flex-1 md:ml-8">
                        <nav className="flex flex-col md:flex-row items-start md:items-center md:justify-center gap-4 md:gap-8 p-4 md:p-0">
                            <Link href="/" className="text-black hover:text-[#06ae6f] w-full md:w-auto">
                            Home
                            </Link>
                            <Link href="/about" className="text-black hover:text-[#06ae6f] w-full md:w-auto">
                                About Us
                            </Link>
                            <Link href="/pricing" className="text-black hover:text-[#06ae6f] w-full md:w-auto">
                                Pricing
                            </Link>
                            <Link href="/contact" className="text-black hover:text-[#06ae6f] w-full md:w-auto">
                                Contact Us
                            </Link>
                        </nav>

                        {/* Auth Buttons */}
                        <div className="flex flex-col md:flex-row items-center gap-4 p-4 md:p-0
                                      border-t md:border-t-0 border-gray-200">
                            <Link href="/login" className="text-black hover:text-[#06ae6f] w-full md:w-auto text-center">
                                SignIn
                            </Link>
                            <Link href="/register"
                                  className="bg-black text-white px-6 py-2 rounded-full hover:bg-opacity-80
                                           w-full md:w-auto text-center">
                                SignUp
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}