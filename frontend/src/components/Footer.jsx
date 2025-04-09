import Link from "next/link"
import { LinkedinIcon, MessageCircleIcon } from "lucide-react"

import { Button } from "./ui/button"
import { Input } from "./ui/input"

export default function Footer() {
    return (
        <footer className="bg-[#06ae6f] text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="bg-white rounded-full p-2">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                        stroke="#06ae6f"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M12 16L16 12L12 8"
                                        stroke="#06ae6f"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path d="M8 12H16" stroke="#06ae6f" strokeWidth="2" strokeLinecap="round"
                                          strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <span className="font-bold text-lg">SynergyNow</span>
                        </div>

                        <div className="space-y-2">
                            <p>Join Our Newsletter to stay updates to features and releases</p>
                            <div className="flex gap-2">
                                <Input type="email" placeholder="Enter Your Email" className="bg-white text-black"/>
                                <Button className="bg-white text-[#06ae6f] hover:bg-white/90 whitespace-nowrap">Sign
                                    Up</Button>
                            </div>
                        </div>
                    </div>

                    {/* Solutions */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Solutions</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="#" className="hover:underline">
                                    CEO/Executive
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:underline">
                                    Ops Director
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:underline">
                                    HR Head
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:underline">
                                    Creative Director
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Company</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/about" className="hover:underline">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:underline">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Connect</h3>
                        <div className="flex gap-4">
                            <Link href="#" className="hover:opacity-80">
                                <LinkedinIcon size={24}/>
                            </Link>
                            <Link href="#" className="hover:opacity-80">
                                <MessageCircleIcon size={24}/>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div
                    className="border-t border-[#296c5c] mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p>Copyright@YouCode-CodeShogun 2025</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link href="#" className="hover:underline">
                            Privacy Policy
                        </Link>
                        <Link href="#" className="hover:underline">
                            Termes of services
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}