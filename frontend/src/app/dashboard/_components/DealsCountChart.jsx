"use client";

import React, {useEffect, useState} from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// const mockData = [
//     { month: 'Jan', dealCount: 3 },
//     { month: 'Feb', dealCount: 8 },
//     { month: 'Mar', dealCount: 1 },
//     { month: 'Apr', dealCount: 4 },
//     { month: 'May', dealCount: 1 },
//     { month: 'Jun', dealCount: 10 },
//     { month: 'Jul', dealCount: 2 },
//     { month: 'Aug', dealCount: 5 },
//     { month: 'Sep', dealCount: 7 },
//     { month: 'Oct', dealCount: 6 },
//     { month: 'Nov', dealCount: 9 },
//     { month: 'Dec', dealCount: 11 }
// ];

const DealsCountChart = ({ data }) => {
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

    if (!isClient) {
        return null;
    }


    return (
        <div suppressHydrationWarning>
        <BarChart width={600} height={400} data={chartData}>
            <CartesianGrid stroke="#f5f5f5"/>
            <XAxis dataKey="month"/>
            <YAxis/>
            <Tooltip/>
            <Legend/>
            <Bar dataKey="count" barSize={20} fill="#413ea0"/>
        </BarChart>
    </div>)
};

export default DealsCountChart;