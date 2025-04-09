import { Card, CardContent } from "../../../components/ui/card";
import LoginForm from "./_componenets/LoginForm";
export default function LoginPage() {
    return (
        <main className="flex-grow bg-[#f3f3f6] py-16">
            <div className="container mx-auto px-4">
                <Card className="max-w-5xl mx-auto overflow-hidden">
                    <CardContent className="p-0">
                        <div className="grid md:grid-cols-2">
                            {/* Left Column - Illustration */}
                            <div
                                className="bg-[#296c5c] text-white p-8 flex flex-col justify-between min-h-[500px]">
                                <div className="flex-1 flex items-center justify-center">
                                    <Image
                                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SynenergyNow-nnyXJCBMri1P5gl1mzRj0ek8kAyH78.png"
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

                            {/* Right Column - Sign In Form */}
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
                                    new user? Create Account Here{" "}
                                    <Link href="/signup" className="text-[#06ae6f] hover:underline font-medium">
                                        Sign Up
                                    </Link>
                                </p>

                                <div className="mt-6">
                                    <Button variant="outline"
                                            className="w-full border-gray-300 flex items-center justify-center gap-2">
                                        <svg width="20" height="20" viewBox="0 0 24 24">
                                            <path
                                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                                fill="#4285F4"
                                            />
                                            <path
                                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                                fill="#34A853"
                                            />
                                            <path
                                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                                fill="#FBBC05"
                                            />
                                            <path
                                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                                fill="#EA4335"
                                            />
                                            <path d="M1 1h22v22H1z" fill="none"/>
                                        </svg>
                                        Sign In With Google
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}