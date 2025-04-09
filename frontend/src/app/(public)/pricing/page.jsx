import { Button } from "../../../components/ui/button";
import { Check } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../../components/ui/card";

export default function PricingPage() {
    return (
        <main className="flex-grow bg-[#f3f3f6]">
            <div className="container mx-auto px-4 py-16">
                {/* Pricing Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold mb-4">
                        Find the Perfect Plan
                        <br/>
                        for Your Business
                    </h1>
                    <p className="text-lg">
                        Flexible Pricing to Fit Your Needs - Whether You&apos;re a Startup or an Enterprise
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-20">
                    {/* Free Plan */}
                    <Card className="bg-white">
                        <CardHeader>
                            <CardTitle className="text-2xl">Free</CardTitle>
                            <CardDescription>Free Forever</CardDescription>
                            <div className="mt-4">
                                <span className="text-5xl font-bold">0</span>
                                <span className="text-2xl">$</span>
                                <p className="text-sm text-gray-500 mt-1">per user/month, billed monthly</p>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Button className="w-full bg-white text-black border border-gray-300 hover:bg-gray-100">
                                Get Started
                            </Button>
                            <div>
                                <p className="font-medium mb-2">Key Features:</p>
                                <ul className="space-y-2">
                                    <FeatureItem text="Gestion des Contacts"/>
                                    <FeatureItem text="Communication"/>
                                    <FeatureItem text="Accès à l'IA (Limité)"/>
                                    <FeatureItem text="Gestion des tâches"/>
                                    <FeatureItem text="Stockage de documents"/>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Growth Plan */}
                    <Card className="bg-white">
                        <CardHeader>
                            <CardTitle className="text-2xl">Growth</CardTitle>
                            <CardDescription>Medium-size enterprise</CardDescription>
                            <div className="mt-4">
                                <span className="text-5xl font-bold">20</span>
                                <span className="text-2xl">$</span>
                                <p className="text-sm text-gray-500 mt-1">per user/month, billed monthly</p>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Button className="w-full bg-white text-black border border-gray-300 hover:bg-gray-100">
                                Get Started
                            </Button>
                            <div>
                                <p className="font-medium mb-2">Everything in Free, plus:</p>
                                <ul className="space-y-2">
                                    <FeatureItem text="Analytics Avancée"/>
                                    <FeatureItem text="Logs Communication"/>
                                    <FeatureItem text="Accès à l'IA"/>
                                    <FeatureItem text="Gestion des Deals"/>
                                    <FeatureItem text="Support 24h/7j"/>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>

                    {/* SynergyPro Plan */}
                    <Card className="bg-white">
                        <CardHeader>
                            <CardTitle className="text-2xl">SynergyPro</CardTitle>
                            <CardDescription>Large-size enterprise</CardDescription>
                            <div className="mt-4">
                                <span className="text-3xl font-bold">Custom Price</span>
                                <p className="text-sm text-gray-500 mt-4">per user/month, billed monthly</p>

                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                        <Button className="w-full bg-white text-black border border-gray-300 hover:bg-gray-100">
                                Contact Us
                            </Button>
                            <div>
                                <p className="font-medium mb-2">Everything in Growth, plus:</p>
                                <ul className="space-y-2">
                                    <FeatureItem text="Gestion des Contacts"/>
                                    <FeatureItem text="Communication"/>
                                    <FeatureItem text="Accès à l'IA (Limité)"/>
                                    <FeatureItem text="Gestion des tâches"/>
                                    <FeatureItem text="Stockage de documents"/>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* CTA Section */}
                <div className="bg-white rounded-lg p-8 max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-4">
                                Ready to Revolutionize Your
                                <br/>
                                Customer Management?
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Join thousands of businesses using SynergyNow to streamline their processes and maximize
                                productivity.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Button className="bg-black text-white hover:bg-black/80">Get started</Button>
                                <Button variant="outline" className="border-gray-300">
                                    Compare the prices
                                </Button>
                            </div>
                        </div>
                        <div>
                            <Card className="bg-white border border-gray-200">
                                <CardHeader className="pb-2">
                                    <div className="text-5xl font-bold">
                                        0<span className="text-2xl">$</span>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2">
                                        <FeatureItem text="Stockage des documents"/>
                                        <FeatureItem text="Accès à l'IA"/>
                                        <FeatureItem text="Communication SMTP"/>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

function FeatureItem({ text }) {
    return (
        <li className="flex items-start gap-2">
            <div className="mt-0.5 bg-[#06ae6f] rounded-full p-0.5">
                <Check className="h-4 w-4 text-white" />
            </div>
            <span>{text}</span>
        </li>
    )
}