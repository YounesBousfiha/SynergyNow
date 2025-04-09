import {Button} from "../../components/ui/button";
import { ArrowRight, Play } from 'lucide-react';


export default function HeroSection() {
    return (
        <>
            <div className="flex flex-col items-center space-y-12 py-8">
                <span className="border-2 rounded-4xl p-2 px-6 sm:text-xl">
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
            </div>


        </>
    );
}