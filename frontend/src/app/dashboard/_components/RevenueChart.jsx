'use client';

import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// const mockData = [
//     { name: 'Jan', value: 50000 },
//     { name: 'Feb', value: 65000 },
//     { name: 'Mar', value: 45000 },
//     { name: 'Apr', value: 85000 },
//     { name: 'May', value: 55000 },
//     { name: 'Jun', value: 75000 }
// ];

export default function  RevenueChart ({ data }) {
    const [isClient, setIsClient] = useState(false);
    const [chartData, setChartData] = useState([]);
    useEffect(() => {
        setIsClient(true);

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

    if (!isClient) return null;



    return (
        <div suppressHydrationWarning>
            <BarChart width={700} height={400} data={chartData}>
                <CartesianGrid stroke="#f5f5f5"/>
                <XAxis dataKey="month"/>
                <YAxis tickFormatter={(value) => `$${value / 1000}k`}/>
                <Tooltip
                    formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
                />
                <Legend/>
                <Bar
                    name="Revenue"
                    dataKey="total"
                    barSize={20}
                    fill="#413ea0"
                />
            </BarChart>
        </div>
    );
};