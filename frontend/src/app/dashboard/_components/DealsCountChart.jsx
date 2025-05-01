"use client";

import React, {useEffect, useState} from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const mockData = [
    { month: 'January', dealCount: 3 },
    { month: 'February', dealCount: 8 },
    { month: 'March', dealCount: 0 },
    { month: 'April', dealCount: 4 },
    { month: 'May', dealCount: 1 },
    { month: 'June', dealCount: 10 },
];

const DealsCountChart = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    return (
        <div suppressHydrationWarning>
        <BarChart width={600} height={400} data={mockData}>
            <CartesianGrid stroke="#f5f5f5"/>
            <XAxis dataKey="month"/>
            <YAxis/>
            <Tooltip/>
            <Legend/>
            <Bar dataKey="dealCount" barSize={20} fill="#413ea0"/>
        </BarChart>
    </div>)
};

export default DealsCountChart;