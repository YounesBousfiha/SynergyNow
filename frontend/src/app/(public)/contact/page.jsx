import { Textarea } from "../../../components/ui/textarea";
import { Card, CardContent } from "../../../components/ui/card";
import {Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../../components/ui/accordion";
import { Button } from "../../../components/ui/button";
import { ArrowRight } from "lucide-react";

export default function ContactPage() {
    return (
        <main className="flex-grow bg-[#f3f3f6]">
            <div className="container mx-auto px-4 py-12">
                {/* Contact Form Section */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    <div className="space-y-6">
                        <h1 className="text-4xl font-bold">Contact Us</h1>
                        <p className="text-black">
                            Use the contact form to get in touch or email us at{" "}
                            <a href="mailto:info@synergynow.com" className="text-[#06ae6f] hover:underline">
                                info@synergynow.com
                            </a>
                            .
                            <br/>
                            We&apos;ll get back to you asap.
                        </p>
                        <p className="text-black pt-4">Want to know more about our platform?</p>
                        <Button className="bg-[#296c5c] hover:bg-[#296c5c]/90 text-white">Book A Call</Button>
                    </div>

                    <Card>
                        <CardContent className="p-6">
                            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input id="firstName"/>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input id="lastName"/>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email"/>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone number</Label>
                                    <Input id="phone" type="tel"/>
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="topic">Choose topic</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select one ..."/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="general">General Inquiry</SelectItem>
                                            <SelectItem value="support">Technical Support</SelectItem>
                                            <SelectItem value="sales">Sales</SelectItem>
                                            <SelectItem value="partnership">Partnership</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="message">How we can help you ?</Label>
                                    <Textarea id="message" placeholder="Type your message..." className="resize-none"
                                              rows={5}/>
                                </div>
                                <div className="md:col-span-2">
                                    <Button type="submit"
                                            className="w-full bg-[#296c5c] hover:bg-[#296c5c]/90 text-white">
                                        Get in touch
                                        <ArrowRight className="ml-2 h-4 w-4"/>
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                {/* FAQ Section */}
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Frequently
                        <br/>
                        asked questions
                    </h2>

                    <Accordion type="single" collapsible className="space-y-4">
                        <AccordionItem value="item-1" className="bg-[#f0f0f0] rounded-md overflow-hidden border-none">
                            <AccordionTrigger className="px-4 py-3 hover:no-underline">
                                Q: What is SynergyNow, and who is it for?
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-4 pt-0 border-t border-gray-200">
                                <p className="text-gray-700">
                                    SynergyNow is a comprehensive CRM platform designed specifically for SMEs who need
                                    to centralize
                                    customer information, streamline communication, and automate repetitive tasks. It's
                                    perfect for
                                    businesses looking to improve productivity and enhance customer relationships
                                    through modern
                                    technology.
                                </p>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-2" className="bg-[#f0f0f0] rounded-md overflow-hidden border-none">
                            <AccordionTrigger className="px-4 py-3 hover:no-underline">
                                Q: How does SynergyNow integrate AI into its features?
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-4 pt-0 border-t border-gray-200">
                                <p className="text-gray-700">
                                    SynergyNow leverages AI to automate routine tasks, generate personalized customer
                                    communications,
                                    and provide actionable insights from your data. Our AI tools help predict customer
                                    needs, optimize
                                    your workflow, and ensure you're always one step ahead in managing relationships.
                                </p>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-3" className="bg-[#f0f0f0] rounded-md overflow-hidden border-none">
                            <AccordionTrigger className="px-4 py-3 hover:no-underline">
                                Q: Is my data secure with SynergyNow?
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-4 pt-0 border-t border-gray-200">
                                <p className="text-gray-700">
                                    Absolutely. We implement enterprise-grade security measures including end-to-end
                                    encryption, regular
                                    security audits, and compliance with global data protection regulations. Your data
                                    is stored in
                                    secure, redundant systems with strict access controls to ensure maximum protection.
                                </p>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-4" className="bg-[#f0f0f0] rounded-md overflow-hidden border-none">
                            <AccordionTrigger className="px-4 py-3 hover:no-underline">
                                Q: How can I get started with SynergyNow?
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-4 pt-0 border-t border-gray-200">
                                <p className="text-gray-700">
                                    Getting started is simple. Sign up for a free trial, and our onboarding team will
                                    guide you through
                                    the setup process. We offer comprehensive training resources, personalized support,
                                    and easy data
                                    migration tools to ensure a smooth transition to SynergyNow.
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </main>
    );
}