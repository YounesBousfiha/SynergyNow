import {Avatar, AvatarFallback, AvatarImage} from "@radix-ui/react-avatar";
import {Button} from "../../../components/ui/button";
import {Input} from "../../../components/ui/input";
import { Mail } from 'lucide-react';

export default function AccountSetting() {
    return (
        <>
            <main className="p-8">
                <h1 className="text-2xl font-bold mb-8">Account Settings</h1>

                <div className="bg-white rounded-md shadow-sm p-8">
                    {/* Profile Section */}
                    <div className="flex items-center justify-between mb-10">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Alexa Rawles"/>
                                <AvatarFallback>AR</AvatarFallback>
                            </Avatar>
                            <div>
                                <h2 className="text-xl font-semibold">Alexa Rawles</h2>
                                <p className="text-gray-500">alexarawles@gmail.com</p>
                            </div>
                        </div>
                        <Button className="bg-[#296c5c] hover:bg-[#296c5c]/90">Edit</Button>
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="fullName" className="block font-medium">
                                Full Name
                            </label>
                            <Input id="fullName" placeholder="Your First Name" className="bg-[#f9f9f9] border-0"/>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="nickName" className="block font-medium">
                                Nick Name
                            </label>
                            <Input id="nickName" placeholder="Your First Name" className="bg-[#f9f9f9] border-0"/>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="gender" className="block font-medium">
                                Gender
                            </label>
                            <Input id="gender" placeholder="Your First Name" className="bg-[#f9f9f9] border-0"/>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="country" className="block font-medium">
                                Country
                            </label>
                            <Input id="country" placeholder="Your First Name" className="bg-[#f9f9f9] border-0"/>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="language" className="block font-medium">
                                Language
                            </label>
                            <Input id="language" placeholder="Your First Name" className="bg-[#f9f9f9] border-0"/>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="timezone" className="block font-medium">
                                Time Zone
                            </label>
                            <Input id="timezone" placeholder="Your First Name" className="bg-[#f9f9f9] border-0"/>
                        </div>
                    </div>

                    {/* Email Section */}
                    <div className="mt-10">
                        <h3 className="text-lg font-semibold mb-4">My email Address</h3>
                        <div className="flex items-center gap-4">
                            <div className="bg-blue-100 rounded-full p-3">
                                <Mail className="h-5 w-5 text-blue-500"/>
                            </div>
                            <div>
                                <p className="font-medium">alexarawles@gmail.com</p>
                                <p className="text-sm text-gray-500">1 month ago</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}