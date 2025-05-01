'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart as LineChartIcon } from "lucide-react";
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {useEffect, useState} from "react";

const mockData = [
    {
        month: 'Jan',
        'New': 4,
        'To Do': 6,
        'In Progress': 3,
        'In Review': 2,
        'Done': 8
    },
    {
        month: 'Feb',
        'New': 3,
        'To Do': 4,
        'In Progress': 5,
        'In Review': 3,
        'Done': 10
    },
    {
        month: 'Mar',
        'New': 5,
        'To Do': 8,
        'In Progress': 4,
        'In Review': 4,
        'Done': 12
    },
    {
        month: 'Apr',
        'New': 2,
        'To Do': 5,
        'In Progress': 6,
        'In Review': 3,
        'Done': 15
    },
    {
        month: 'May',
        'New': 6,
        'To Do': 7,
        'In Progress': 4,
        'In Review': 5,
        'Done': 18
    },
    {
        month: 'Jun',
        'New': 4,
        'To Do': 6,
        'In Progress': 5,
        'In Review': 4,
        'Done': 20
    },
    {
        month: 'Jul',
        'New': 3,
        'To Do': 4,
        'In Progress': 6,
        'In Review': 5,
        'Done': 22
    },
    {
        month: 'Aug',
        'New': 5,
        'To Do': 8,
        'In Progress': 7,
        'In Review': 6,
        'Done': 25
    },
    {
        month: 'Sep',
        'New': 2,
        'To Do': 5,
        'In Progress': 4,
        'In Review': 3,
        'Done': 28
    },
    {
        month: 'Oct',
        'New': 6,
        'To Do': 7,
        'In Progress': 5,
        'In Review': 4,
        'Done': 30
    },
    {
        month: 'Nov',
        'New': 4,
        'To Do': 6,
        'In Progress': 5,
        'In Review': 3,
        'Done': 32
    },
    {
        month: 'Dec',
        'New': 3,
        'To Do': 4,
        'In Progress': 6,
        'In Review': 5,
        'Done': 35
    }
];

const statusColors = {
    'New': '#22c55e',       // Green
    'To Do': '#3b82f6',     // Blue
    'In Progress': '#f59e0b', // Amber
    'In Review': '#8b5cf6',  // Purple
    'Done': '#64748b'       // Slate
};

export default function TasksProgressChart ({ data })  {

    const [ChartData, setChartData] = useState([]);

    useEffect(() => {
        if (Array.isArray(data)) {
            const monthNames = [
                "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ];

            const transformedData = data.map(item => ({
                ...item,
                month: monthNames[item.month - 1]
            }));

            setChartData(transformedData);
        }
    }, [data]);
    return (
        <Card className="bg-white md:col-span-2">
            <CardHeader className="p-6 pb-0">
                <div className="flex items-center gap-3">
                    <LineChartIcon size={20} />
                    <CardTitle>Tasks Progress Overview</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="p-6">
                <div className="h-[400px]" suppressHydrationWarning>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={ChartData}>
                            <CartesianGrid stroke="#f5f5f5" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            {Object.keys(statusColors).map((status) => (
                                <Line
                                    key={status}
                                    type="monotone"
                                    dataKey={status}
                                    name={status}
                                    stroke={statusColors[status]}
                                    strokeWidth={2}
                                    dot={{ r: 4 }}
                                />
                            ))}
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};