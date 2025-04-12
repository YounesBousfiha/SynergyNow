import { ArrowRight, Play, AlarmClock, Bell, Coins, MoveUp, StickyNote, FilePenLine, CalendarFold } from 'lucide-react';
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

                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center">
                    <Card className="bg-[#DDFFF2] w-[350px] min-h-[495px]">
                        <CardContent className="space-y-12">
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

                            <Card className="py-2 !block space-y-3">
                                <CardHeader className="flex space-x-4 pt-2">
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
                                        <p className="font-light"><strong className="font-bold">John Doe</strong> add a note on Task</p>
                                        <div className="w-full bg-[#FFDAFA] py-2 border-l-4 border-[#FC00D8] text-[#FC00D8] font-extrabold pl-3 my-2">Project Planing</div>
                                        <span className="font-light"><q>Awaiting for the feedback From the team</q></span>
                                    </div>
                                </CardContent>
                            </Card>
                        </CardContent>
                    </Card>

                    <Card className="bg-[#DDFFF2] w-[350px] min-h-[495px]">
                        <CardContent>
                            <Image src="https://res.cloudinary.com/dashccxm0/image/upload/v1744233959/Box2_eh4ksw.png"
                                   width={300} height={200} alt="Box2"/>
                        </CardContent>
                    </Card>

                    <Card className="bg-[#DDFFF2] w-[350px] h-[495px]">
                        <CardContent className="space-y-12">
                            <Card className="px-4 py-2">
                                <p className="bg-[#F3F3F6] p-2 w-[3rem] rounded-lg flex justify-center"><Coins size={30} color={"#296C5C"} /></p>
                                <p className="font-light text-gray-500 text-lg">Total Sales</p>
                                <div className="flex space-x-20 items-center">
                                   <span className="font-extrabold text-xl">$23,564</span>
                                   <div className="text-xl flex bg-[#DDFFF2] p-1 rounded-xl">
                                       <MoveUp strokeWidth={3} color={"#06AE6F"} absoluteStrokeWidth />
                                    <span className="text-[#06AE6F]">
                                        10.5%
                                    </span>
                                   </div>
                                </div>
                            </Card>

                            <Card className="py-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center px-2">
                                        <div className="w-full px-3">
                                            <span className="font-extrabold">Make Proposal to CTO</span>
                                        </div>
                                        <FilePenLine size={30} color={"gray"} absoluteStrokeWidth/>
                                    </div>
                                    <div className="px-4 space-x-4">
                                        <span className="bg-[#FFE9C1] py-1 px-2 rounded-lg text-[#FFA600] font-extrabold">To-do</span>
                                        <span className="bg-[#FFC9C5] py-1 px-2 rounded-lg text-[#FD584C] font-extrabold">High</span>
                                    </div>

                                    <div className="flex px-2 relative">
                                        <div
                                            className="w-12 h-12 rounded-full absolute border-1 border-white">
                                            <Image
                                                src="https://res.cloudinary.com/dashccxm0/image/upload/v1744244164/Ellipse_4_azkyht.png"
                                                width={32}
                                                height={32}
                                                alt="Avatar"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div
                                            className="w-12 h-12 absolute left-7 rounded-full">
                                            <Image
                                                src="https://res.cloudinary.com/dashccxm0/image/upload/v1744244164/Ellipse_4_azkyht.png"
                                                width={32}
                                                height={32}
                                                alt="Avatar"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div
                                            className="w-12 h-12 left-14 rounded-full">
                                            <Image
                                                src="https://res.cloudinary.com/dashccxm0/image/upload/v1744244164/Ellipse_4_azkyht.png"
                                                width={32}
                                                height={32}
                                                alt="Avatar"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>

                                    <hr></hr>
                                    <div className="flex justify-between px-4 py-2">
                                        <div className="flex items-center">
                                            <StickyNote size={24} color={"gray"} absoluteStrokeWidth/>
                                            <span className="text-lg text-gray-500">1</span>
                                        </div>
                                        <div className="flex items-center">
                                            <CalendarFold size={24} color={"gray"} absoluteStrokeWidth />
                                            <span className="text-lg text-gray-500">Aug 10</span>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}