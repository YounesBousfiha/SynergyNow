import { ArrowRight, Play, AlarmClock, Bell } from 'lucide-react';
import { Card, CardContent, CardHeader} from "../../components/ui/card";
import Image from "next/image";


export default function HeroSection() {
    return (
        <>
            <div className="flex flex-col items-center space-y-12 py-8 bg-[#F3F3F6]">
                <span className="border-2 rounded-4xl p-2 px-6 sm:text-xl bg-white">
                    <strong>100+ Company</strong> using SynergyNow
                </span>

                <strong className="text-center text-2xl sm:text-4xl sm:px-56">
                    Empower Your business with our Seamless CRM Solutions
                </strong>

                <strong className="text-center text-xl font-light text-gray-800 sm:px-64">
                    Boost Productivity, enhance customer relationships, and drive growth with our all-in-one CRM
                    platform
                </strong>

                <div className="flex justify-center space-x-6 sm:space-x-12">
                    <button
                        className="bg-[#296C5C] flex items-center rounded-2xl border-gray-300 py-2 px-6 sm:px-8 text-md sm:text-lg text-white hover:bg-[#1F4F3F] hover:transation-all hover:duration-300">
                        Try for free
                        <ArrowRight size={30}/>
                    </button>

                    <button
                        className="bg-white flex items-center border-2 rounded-2xl border-gray-300 text-black py-2 px-6 sm:px-8 text-md sm:text-lg">
                        <Play size={30}/>
                        Watch Video
                    </button>
                </div>

                <div className="w-full grid grid-cols-3 gap-4 place-items-center">
                    <Card className="bg-[#DDFFF2] w-5/6 h-[495px]">
                        <CardContent>
                            <Card  className="px-4">
                                <p className="text-lg font-bold">Weekly Team meeting</p>
                                <p className="font-light text-gray-500 text-lg">3:00PM - 4:30 PM</p>
                                <div className="bg-[#296C5C] rounded-2xl text-white w-full flex justify-between px-6 py-2">
                                    <span className="flex items-center">
                                        <AlarmClock size={20} strokeWidth={2.5} absoluteStrokeWidth />
                                        <strong className="ml-3">Today</strong>
                                    </span>
                                    <span>Join meting</span>
                                </div>
                            </Card>
                            <Card>
                                <CardHeader className="flex space-x-4">
                                    <Bell size={20} strokeWidth={4} absoluteStrokeWidth/>
                                    <strong>Notification</strong>
                                </CardHeader>
                                <hr className="border-gray-200 w-full"/>
                                <CardContent className="flex space-x-4 px-2">
                                    <div
                                        className="w-12 h-12 rounded-full">
                                        <Image
                                            src="https://res.cloudinary.com/dashccxm0/image/upload/v1744244164/Ellipse_4_azkyht.png"
                                            width={32}
                                            height={32}
                                            alt="Avatar"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p>John Doe add a note on Task</p>
                                        <div>Project Planing</div>
                                        <blockquote>Awaiting for the feedback From the team</blockquote>
                                    </div>
                                </CardContent>
                            </Card>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <Image src="https://res.cloudinary.com/dashccxm0/image/upload/v1744233959/Box2_eh4ksw.png"
                                   width={300} height={200} alt="Box2"/>
                        </CardContent>
                    </Card>

                    <Card className="bg-[#DDFFF2] w-5/6">
                        <CardContent className="p-4">
                            Card3
                        </CardContent>
                        <CardContent className="p-4">
                            Card3
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
);
}