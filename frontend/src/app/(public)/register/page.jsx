import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "../../../components/ui/card";
import RegisterForm from "./_componenets/RegisterForm";


export default function RegisterPage() {
    return (
        <main className="flex-grow bg-[#f3f3f6] py-16">
            <div className="container mx-auto px-4">
                <Card className="max-w-5xl mx-auto overflow-hidden">
                    <CardContent className="p-0">
                        <div className="grid md:grid-cols-2">
                            {/* Left Column - Sign Up Form */}
                            <div className="bg-white p-8">
                                <div className="flex justify-center mb-6">
                                    <div className="flex items-center gap-2">
                                        <div className="bg-[#06ae6f] rounded-full p-2">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
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
                                                <path
                                                    d="M8 12H16"
                                                    stroke="white"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </div>
                                        <span className="font-bold text-lg">SynergyNow</span>
                                    </div>
                                </div>

                                <h1 className="text-3xl font-bold text-center mb-4">Get Started</h1>
                                <p className="text-center mb-8">
                                    Already have an account ?{" "}
                                    <Link href="/login" className="text-[#06ae6f] hover:underline font-medium">
                                        Sign In
                                    </Link>
                                </p>
                                <RegisterForm />
                            </div>

                            {/* Right Column - Illustration */}
                            <div className="bg-[#296c5c] text-white mr-3 p-8 flex flex-col justify-between min-h-[500px]">
                                <div className="flex-1 flex items-center justify-center">
                                    <Image
                                        src="https://res.cloudinary.com/dashccxm0/image/upload/v1744206373/10733831_4505770-removebg-preview_1_2x_zhkkfo.png"
                                        alt="Person working at desk with laptop"
                                        width={400}
                                        height={400}
                                        className="max-w-full h-auto"
                                    />
                                </div>
                                <div className="mt-4">
                                    <h2 className="text-2xl font-bold">
                                        Get Started with our revolutionary
                                        <br/>
                                        AI-Driven CRM
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}