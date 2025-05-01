'use client';

import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const mockData = [
    { name: 'Jan', value: 50000 },
    { name: 'Feb', value: 65000 },
    { name: 'Mar', value: 45000 },
    { name: 'Apr', value: 85000 },
    { name: 'May', value: 55000 },
    { name: 'Jun', value: 75000 }
];

const RevenueChart = () => {
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
                <YAxis tickFormatter={(value) => `$${value / 1000}k`}/>
                <Tooltip
                    formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
                />
                <Legend/>
                <Bar
                    name="Revenue"
                    dataKey="value"
                    barSize={20}
                    fill="#413ea0"
                />
            </BarChart>
        </div>
    );
};

export default RevenueChart;