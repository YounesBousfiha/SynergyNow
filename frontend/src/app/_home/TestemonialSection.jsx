"use client"
import {Card, CardContent, CardFooter} from "../../components/ui/card";
import Image from "next/image";
import {AnimatePresence, motion} from "framer-motion";
import { useEffect, useState} from "react";

export default function TestemonialSection() {
    const [index, setIndex] = useState(0);

    const data = [
        {
            content: "CRM Call synergy have revolutionez our customer management! Its intuitive design, seamless call tracking, and powerful analytics have boosted our efficiency and customer statisfaction. Highly recommend it to any business looking to level up their CRM game!",
            imageUrl: "https://res.cloudinary.com/dashccxm0/image/upload/v1744558255/Person1_fctj1h.png",
            name:"Robert Dinero",
            position: "HR Head"
        },
        {
            content: "CRM Call Synergy has been a lifesaver for our team! The call tracking and automation features are top-notch, and the analytics provide actionable insights. It’s made managing customer relationships so much easier and more efficient. Highly recommend!",
            imageUrl: "https://res.cloudinary.com/dashccxm0/image/upload/v1744558252/PErson2_s6kytg.png",
            name:"Rebicca",
            position: "Creative Directrice"
        },
        {
            content: "Switching to CRM Call Synergy was the best decision for our business. The platform is user-friendly, the support team is fantastic, and the tools have significantly improved our workflow. It’s a must-have for any business serious about CRM!",
            imageUrl: "https://res.cloudinary.com/dashccxm0/image/upload/v1744558261/Person3_km8dul.png",
            name:"Micheal Jackson",
            position: "Global Solution CTO"
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % data.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);
    return (
        <div className="my-12">
            <div className="flex flex-col items-center justify-center p-4 space-y-5">
                <span
                    className="text-2xl font-extrabold border-l-4 border-[#06AE6F] text-[#06AE6F] px-3">Testmonials</span>
                <span
                    className="font-extrabold text-2xl px-16 text-center">What our User says About SynergyNow CRM</span>
                <span className="font-bold text-center text-lg px-16 pt-6">At Synergy Now , our users are at the heart of everything do. Here's what some of them have to say about their expreience with our platform</span>
            </div>


            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{x: -100, opacity: 0}}
                    animate={{x: 0, opacity: 1}}
                    exit={{x: 100, opacity: 0}}
                    transition={{duration: 0.5}}
                >
                    <div className="flex justify-center">
                        <Card className="bg-[#296C5C] flex flex-row w-full sm:px-8 space-y-5 mx-12 text-white">
                            <div className="w-full max-w-[48rem] hidden lg:block">
                                <Image
                                    className="object-cover rounded-lg w-full h-full"
                                    src={data[index].imageUrl}
                                    alt={data[index].name}
                                    width={900}
                                    height={500}
                                />
                            </div>
                            <div className="flex flex-col">
                                <CardContent
                                    className="mx-18 text-center text-xl sm:text-2xl sm:leading-relaxed font-mono italic">
                                    <q>{data[index].content}</q>
                                </CardContent>
                                <CardFooter className="block italic space-y-3">
                                    <p className="text-md font-bold">{data[index].name}</p>
                                    <p className="text-xl font-extrabold">{data[index].position}</p>
                                </CardFooter>
                            </div>
                        </Card>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

