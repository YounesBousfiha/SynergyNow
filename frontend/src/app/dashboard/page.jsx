"use client"

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
import { useEffect, useState } from "react"
import {getStatistiques} from "../../services/statistiqueService";
export default function DashboardPage() {

    const [statsData, setStatsData] = useState({});
    const [dealchart, setDealChart] = useState({});
    const [revenueChart, setRevenueChart] = useState([]);
    const [tasksProgress, setTasksProgress] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getStatistiques();
                setStatsData(response.data);
                setDealChart(response.data.stats.dealsChart);
                setRevenueChart(response.data.stats.revenueChart);
                setTasksProgress(response.data.stats.tasksChart);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);

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
                                <div className="text-4xl font-bold">{statsData.clientsCount}</div>
                            </CardContent>
                        </Card>

                        <Card className="bg-white">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-3 mb-4 text-gray-500">
                                    <Users size={20}/>
                                    <span>Number of Contacts</span>
                                </div>
                                <div className="text-4xl font-bold">{statsData.contactsCount}</div>
                            </CardContent>
                        </Card>

                        <Card className="bg-white">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-3 mb-4 text-gray-500">
                                    <LineChart size={20}/>
                                    <span>Total Deals in pipeline</span>
                                </div>
                                <div className="text-4xl font-bold">{statsData.dealsCount}</div>
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
                                <RevenueChart data={revenueChart}/>
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
                                    <DealsCountChart data={dealchart}/>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <TasksProgressChart data={tasksProgress}/>
                    </div>
                </main>
            </div>
    )
}




