import {Card, CardContent, CardHeader} from '../../components/ui/card';
import {Coins, MoveDown, MoveUp, ArrowRight, ListChecks, LoaderCircle, Calendar} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CTASection() {

    const featData = [
        {
            data: "360-Degree View of Customer"
        },
        {
            data: "Data-Driven Insights"
        },
        {
            data: "Real-time Data Reporting"
        },
        {
            data: "Deals Management Pipelines"
        },
        {
            data: "Drag and Drop Facility"
        },
        {
            data: "Smart Email Generations"
        }
        ]
    return (
      <div className="grid gap-4 place-items-center sm:space-y-5 sm:grid-cols-2 py-4">
          <Card className="w-3/5 bg-[#E6EEEB] hidden sm:block">
              <CardContent className="p-4 space-y-6">
                      <Card className="px-4 py-6">
                          <p className="bg-[#F3F3F6] p-2 w-[3rem] rounded-lg flex justify-center"><Coins size={30} color={"#296C5C"} /></p>
                          <p className="font-light text-gray-500 text-lg">Contacts</p>
                          <div className="flex justify-between items-center">
                              <span className="font-extrabold text-xl">7,831</span>
                              <div className="text-xl flex bg-[#DDFFF2] p-1 rounded-xl">
                                  <MoveUp strokeWidth={3} color={"#06AE6F"} absoluteStrokeWidth />
                                  <span className="text-[#06AE6F]">
                                        10.5%
                                    </span>
                              </div>
                          </div>
                  </Card>

                  <Card className="px-4 py-6">
                      <p className="bg-[#F3F3F6] p-2 w-[3rem] rounded-lg flex justify-center"><Coins size={30} color={"#296C5C"} /></p>
                      <p className="font-light text-gray-500 text-lg">Project Open's</p>
                      <div className="flex justify-between items-center">
                          <span className="font-extrabold text-xl">1,338</span>
                          <div className="text-xl flex bg-[#FFC7C7] p-1 rounded-xl">
                              <MoveDown strokeWidth={3} color={"#FD584C"} absoluteStrokeWidth />
                              <span className="text-[#FD584C]">
                                    9.5%
                                </span>
                          </div>
                      </div>
                  </Card>
              </CardContent>
          </Card>

          <Card className="mx-3 w-5/6 border-0 shadow-none">
              <CardHeader>
                  <span className="text-2xl font-extrabold sm:text-4xl text-center">Comprehensive Custom Inshight</span>
              </CardHeader>
              <CardContent className="space-y-16">
                  <p className="text-xl sm:text-2xl text-center text-gray-500">
                      Our CRM system centralize all customer data in one place allowing your team to track preference, anticipate needs, and deliver personalized experience that drive loyalt and staisfaction.
                  </p>
                  <ul className="space-y-5">
                      {featData.slice(0, 3).map((element, index) => {
                          return (
                              <FeatList key={index} data={element.data} />
                          )
                      })}
                  </ul>
                  <div className="border-1 border-gray-300 w-[150px] text-center flex justify-center items-center space-x-2">
                      <Link className="py-2 text-lg" href={"/register"}>Learn More</Link>
                      <ArrowRight size={24} />
                  </div>
              </CardContent>
          </Card>

          <Card className="mx-3 w-5/6 border-0 shadow-none">
              <CardHeader>
                  <span className="text-2xl font-extrabold sm:text-4xl text-center">Automate Task Management and Email Generation</span>
              </CardHeader>
              <CardContent className="space-y-16">
                  <p className="text-xl sm:text-2xl text-center text-gray-500">
                      Sett up Automated reminders, and task assignments, ensure you team stay focus on high-priority tasks.<br></br>
                      Boost Email Generation Templates using AI Power to enhance Efficiency communication.
                  </p>
                  <ul className="space-y-5">
                      {featData.slice(3, 6).map((element, index) => {
                          return (
                              <FeatList key={index} data={element.data} />
                          )
                      })}
                  </ul>
                  <div className="border-1 border-gray-300 w-[150px] text-center flex justify-center items-center space-x-2">
                      <Link className="py-2 text-lg" href={"/register"}>Learn More</Link>
                      <ArrowRight size={24} />
                  </div>
              </CardContent>
          </Card>

          <Card className="w-3/5 bg-[#E6EEEB] p-4 hidden sm:block">
              <Card className="bg-white">
                  <CardHeader className="flex justify-between items-center bg-white">
                      <div className="flex items-center space-x-4">
                          <ListChecks size={30}/>
                          <span className="text-xl font-bold">Task</span>
                      </div>
                      <div
                          className="py-2 text-center border-2 border-gray-300 font-extrabold w-1/3 text-gray-400 bg-white">
                          <span>+ Add Task </span>
                      </div>
                  </CardHeader>
                  <div className="border-1 border-gray-200 mt-2 px-4 mx-6"></div>
                  <CardContent className="space-y-3">
                      <div className="space-y-3">
                          <span className="flex items-center space-x-4 text-xl font-bold">
                              <LoaderCircle size={24}/>
                              <strong>Project Planning</strong>
                          </span>
                          <div className="px-6">
                              <q className="text-gray-500">
                                  Awaiting for Approval From development team
                              </q>
                              <div className="flex justify-between pt-3">
                                  <span
                                      className="bg-[#FFE9C1] text-[#FFA600] py-1 px-4 text-lg font-bold rounded-lg">To-do</span>
                                  <span
                                      className="bg-[#FFC9C5] text-[#FD584C] py-1 px-4 text-lg font-bold rounded-lg">HIGH</span>
                                  <p className="flex items-center space-x-2 text-gray-500 font-bold text-lg">
                                      <Calendar size={30}/>
                                      <span>Aug 2</span>
                                  </p>
                              </div>
                          </div>
                      </div>
                  </CardContent>
                  <div className="border-1 border-gray-200 mt-2 px-4 mx-6"></div>
                  <CardContent className="space-y-3">
                      <div className="space-y-3">
                          <span className="flex items-center space-x-4 text-xl font-bold">
                            <Image src="https://res.cloudinary.com/dashccxm0/image/upload/v1744503471/check-circle_yqdj4k.png" alt={"Check Mark"} width={24} height={24} />
                              <strong>Backend API Setup</strong>
                          </span>
                          <div className="px-6">
                              <q className="text-gray-500">
                                  Base Functionality Implemented
                              </q>
                              <div className="flex justify-between pt-3">
                                  <span
                                      className="bg-[#FFE9C1] text-[#FFA600] py-1 px-4 text-lg font-bold rounded-lg">To-do</span>
                                  <span
                                      className="bg-[#FFC9C5] text-[#FD584C] py-1 px-4 text-lg font-bold rounded-lg">HIGH</span>
                                  <p className="flex items-center space-x-2 text-gray-500 font-bold text-lg">
                                      <Calendar size={30}/>
                                      <span>Aug 2</span>
                                  </p>
                              </div>
                          </div>
                      </div>
                  </CardContent>
                  <div className="border-1 border-gray-200 mt-2 px-4 mx-6"></div>
                  <CardContent className="space-y-3">
                      <div className="space-y-3">
                          <span className="flex items-center space-x-4 text-xl font-bold">
                            <Image src="https://res.cloudinary.com/dashccxm0/image/upload/v1744503471/check-circle_yqdj4k.png" alt={"Check Mark"} width={24} height={24} />
                              <strong>Write Documentation</strong>
                          </span>
                          <div className="px-6">
                              <q className="text-gray-500">
                                  Include API and end-user guide
                              </q>
                              <div className="flex justify-between pt-3">
                                  <span
                                      className="bg-[#FFE9C1] text-[#FFA600] py-1 px-4 text-lg font-bold rounded-lg">To-do</span>
                                  <span
                                      className="bg-[#FFC9C5] text-[#FD584C] py-1 px-4 text-lg font-bold rounded-lg">HIGH</span>
                                  <p className="flex items-center space-x-2 text-gray-500 font-bold text-lg">
                                      <Calendar size={30}/>
                                      <span>Aug 2</span>
                                  </p>
                              </div>
                          </div>
                      </div>
                  </CardContent>
                  <div className="border-1 border-gray-200 mt-2 px-4 mx-6"></div>

                  <CardContent className="bg-white">
                  </CardContent>
              </Card>
          </Card>
      </div>
    );
}

function FeatList({data}) {
    return (
        <>
            <li className="flex items-center space-x-4">
                <Image src="https://res.cloudinary.com/dashccxm0/image/upload/v1744503471/check-circle_yqdj4k.png" alt={data} width={30} height={30} />
                <span className="text-xl">{data}</span>
            </li>
        </>
    );
}