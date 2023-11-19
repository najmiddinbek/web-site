'use client'

import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { Bar } from 'react-chartjs-2';
import Diagramma from "../../components/Diagramm"
import Diagramm2 from "../../components/Diagramm2"

const getTopics = async () => {
    try {
        const res = await fetch('/api/topics', {
            cache: 'no-store',
        });
        if (!res.ok) {
            throw new Error('Mavzular yuklanmadi');
        }

        return res.json();
    } catch (error) {
        console.log('Mavzular yuklanishda xatolik: ', error);
        return { mavzula: [] };
    }
};

const Filter = () => {
    const [topiclar, setTopiclar] = useState([]);
    const [filteredMavzula, setFilteredMavzula] = useState([]);
    const [filterValue, setFilterValue] = useState({ newIsm: "", newSinfi: "", school: "" });
    const [hide, setHide] = useState(false)

    const handleHide = () => {
        setHide(!hide)
    }




    useEffect(() => {
        const fetchData = async () => {
            const a = await getTopics();
            const topiclar = a?.topiclar;

            const filteredTopics = topiclar.filter((t) => t.MFY === "2-sektor");

            setTopiclar(filteredTopics);
            setFilteredMavzula(filteredTopics);
        };

        fetchData();
    }, []);

    const [usersAddedByDate, setUsersAddedByDate] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const usersGroupedByDate = filteredMavzula.reduce((acc, t) => {
                const dateKey = new Date(t.createdAt).toLocaleDateString();
                acc[dateKey] = (acc[dateKey] || 0) + 1;
                return acc;
            }, {});

            setUsersAddedByDate(usersGroupedByDate);
        };

        fetchData();
    }, [filteredMavzula]);

    const [percentageIncreaseByDate, setPercentageIncreaseByDate] = useState({});

    useEffect(() => {
        const calculatePercentageIncrease = () => {
            const dates = Object.keys(usersAddedByDate);
            const percentageIncrease = {};

            for (let i = 1; i < dates.length; i++) {
                const currentDate = dates[i];
                const previousDate = dates[i - 1];

                const currentCount = usersAddedByDate[currentDate];
                const previousCount = usersAddedByDate[previousDate];

                const increasePercentage = ((currentCount - previousCount) / previousCount) * 100;

                percentageIncrease[currentDate] = increasePercentage.toFixed(2);
            }

            setPercentageIncreaseByDate(percentageIncrease);
        };

        calculatePercentageIncrease();
    }, [usersAddedByDate]);

    const [countSababli, setCountSababli] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const a = await getTopics();
            const topiclar = a?.topiclar;

            const filteredTopics = topiclar.filter((t) => t.MFY === "2-sektor");

            setTopiclar(filteredTopics);
            setFilteredMavzula(filteredTopics);

            // Count items where newDarsQoldirish === "Sababli"
            const sababliCount = filteredTopics.filter((t) => t.newDarsQoldirish === "Sababli").length;
            setCountSababli(sababliCount);
        };

        fetchData();
    }, []);

    const [countNotSababli, setCountNotSababli] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const a = await getTopics();
            const topiclar = a?.topiclar;

            const filteredTopics = topiclar.filter((t) => t.MFY === "2-sektor");

            setTopiclar(filteredTopics);
            setFilteredMavzula(filteredTopics);

            // Count items where newDarsQoldirish !== "Sababli"
            const notSababliCount = filteredTopics.filter((t) => t.newDarsQoldirish !== "Sababli").length;
            setCountNotSababli(notSababliCount);
        };

        fetchData();
    }, []);

    const [percentageSababli, setPercentageSababli] = useState(0);
    const [percentageNotSababli, setPercentageNotSababli] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const a = await getTopics();
            const topiclar = a?.topiclar;

            const filteredTopics = topiclar.filter((t) => t.MFY === "2-sektor");

            setTopiclar(filteredTopics);
            setFilteredMavzula(filteredTopics);

            // Calculate percentage of items where newDarsQoldirish === "Sababli"
            const sababliCount = filteredTopics.filter((t) => t.newDarsQoldirish === "Sababli").length;
            const sababliPercentage = (sababliCount / filteredTopics.length) * 100;
            setPercentageSababli(sababliPercentage.toFixed(2));

            // Calculate percentage of items where newDarsQoldirish !== "Sababli"
            const notSababliCount = filteredTopics.filter((t) => t.newDarsQoldirish !== "Sababli").length;
            const notSababliPercentage = (notSababliCount / filteredTopics.length) * 100;
            setPercentageNotSababli(notSababliPercentage.toFixed(2));
        };

        fetchData();
    }, []);




    const [chartData, setChartData] = useState({});
    const [descriptiveChartData, setDescriptiveChartData] = useState([/* your data for descriptive chart */]);

    useEffect(() => {
        const fetchData = async () => {
            const a = await getTopics();
            const topiclar = a?.topiclar;

            const filteredTopics = topiclar.filter((t) => t.MFY === "2-sektor");

            setTopiclar(filteredTopics);
            setFilteredMavzula(filteredTopics);

            const usersGroupedByDate = filteredTopics.reduce((acc, t) => {
                const dateKey = new Date(t.createdAt).toLocaleDateString();
                acc[dateKey] = (acc[dateKey] || 0) + 1;
                return acc;
            }, {});

            setUsersAddedByDate(usersGroupedByDate);
            setChartData({
                labels: Object.keys(usersAddedByDate),
                datasets: [
                    {
                        label: 'Sanalik kiritilgan o\'quvchilar',
                        data: Object.values(usersAddedByDate),
                        backgroundColor: 'rgba(75,192,192,0.2)',
                        borderColor: 'rgba(75,192,192,1)',
                        borderWidth: 1,
                    },
                ],
            });
        };

        fetchData();
    }, [filteredMavzula]);


    return (
        <>
            <div>
                <Navbar />
                <div className="container">
                    <div className="mb-4">
                        <h2 className="text-xl font-bold mb-2">Foizdagi o'zgarish</h2>
                        {Object.keys(percentageIncreaseByDate).map((date) => (
                            <p key={date}>{date}: Avvalgi kundan %{percentageIncreaseByDate[date]} ga ko`p</p>
                        ))}
                    </div>

                    <div className="mb-4">
                        <h2 className="text-xl font-bold mb-2">Sababli dars qoldirilgan o'quvchilar</h2>
                        <p>{countSababli} ta o'quvchi sababli dars qoldirgan</p>
                        <p>Bu barcha oquvchilarning <b>{percentageSababli}%</b> ni tashkil etadi</p>
                    </div>
                    <div className="mb-4">
                        <h2 className="text-xl font-bold mb-2">Sababsiz dars qoldirgan o'quvchilar</h2>
                        <p> {countNotSababli} ta o'quvchi sababsiz dars qoldirgan</p>
                        <p> Bu barcha oquvchilarning <b> {percentageNotSababli}%</b> ni tashkil etadi</p>
                    </div>
                </div>

                Bu yerda  malumotlar bazasida joylashgan barcha oquvchilarning malumotlari bor. Aynan bir sanadagi oquvchilarning malumotlar emas
            </div>
            <Diagramma />
            <Diagramm2 />
        </>
    );
};

export default Filter;