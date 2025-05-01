"use client"
import Link from "next/link"
import Image from "next/image"
import {
    Users,
    Building2,
    LineChart,
    PieChart,
    ListTodo,
    Plus,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import DealsCountChart from "./_components/DealsCountChart";
import RevenueChart from "./_components/RevenueChart";
import TasksProgressChart from "./_components/TasksProgressChart";
export default function DashboardPage() {


    return (
            <div className="flex-1">
                {/* Content */}
                <main className="p-6">
                    {/* KPI Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <Card className="bg-white">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-3 mb-4 text-gray-500">
                                    <Building2 size={20}/>
                                    <span>Number of Companies</span>
                                </div>
                                <div className="text-4xl font-bold">32</div>
                            </CardContent>
                        </Card>

                        <Card className="bg-white">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-3 mb-4 text-gray-500">
                                    <Users size={20}/>
                                    <span>Number of Contacts</span>
                                </div>
                                <div className="text-4xl font-bold">108</div>
                            </CardContent>
                        </Card>

                        <Card className="bg-white">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-3 mb-4 text-gray-500">
                                    <LineChart size={20}/>
                                    <span>Total Deals in pipeline</span>
                                </div>
                                <div className="text-4xl font-bold">293</div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Charts */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center gap-3 px-6 text-gray-500">
                                    <PieChart size={20}/>
                                    <span>Total revenues (yearly)</span>
                                </div>
                                <RevenueChart/>
                                <div className="flex justify-between text-sm px-6 pb-6">
                                    <div>expected 45,905$</div>
                                    <div>total 38,765$</div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-white">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    {/* Header */}
                                    <div className="flex items-center gap-3 text-gray-500">
                                        <span>Deals</span>
                                    </div>
                                    <Button variant="outline" size="sm" className="text-xs flex items-center gap-1">
                                        <Plus size={14}/>
                                        See Pipelines
                                    </Button>
                                </div>
                                <div className="flex justify-center">
                                    {/* Recharts integration */}
                                    <DealsCountChart/>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <TasksProgressChart/>
                    </div>
                </main>
            </div>
    )
}




