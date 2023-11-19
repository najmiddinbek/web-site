import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

const Donut = () => {
    const [chartData, setChartData] = useState({
        options: {},
        series: [44, 55, 41, 17, 15],
        labels: ['A', 'B', 'C', 'D', 'E']
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/topics');
                if (!res.ok) {
                    throw new Error('Failed to fetch topics');
                }

                const topics = await res.json();

                // Calculate the percentage of students in each class (assuming newSinfi contains class information)
                const classPercentages = topics.reduce((acc, topic) => {
                    const classLabel = topic.newSinfi;
                    acc[classLabel] = (acc[classLabel] || 0) + 1;
                    return acc;
                }, {});

                const totalStudents = Object.values(classPercentages).reduce((sum, count) => sum + count, 0);

                const series = Object.values(classPercentages).map(count => (count / totalStudents) * 100);

                setChartData({
                    options: {},
                    series: series,
                    labels: Object.keys(classPercentages),
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="donut">
            <Chart options={chartData.options} series={chartData.series} type="donut" width="380" />
        </div>
    );
};

export default Donut;
