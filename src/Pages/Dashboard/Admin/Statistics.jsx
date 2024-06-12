/** @format */

import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

ChartJS.register(ArcElement, Tooltip, Legend);

const Statistics = () => {
    const axiosSecure = useAxiosSecure();

    const { data: stats = {}, isLoading, isError, error } = useQuery({
        queryKey: ['stats'],
        queryFn: async () => {
            const { data } = await axiosSecure('/statistics');
            return data;
        },
    });

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    console.log(stats);

    const data = {
        labels: ["Total Users", "Total Products", "Total Reviews"],
        datasets: [
            {
                data: [
                    stats?.analytics?.totalUsers || 0,
                    stats?.analytics?.totalProducts || 0,
                    stats?.analytics?.totalReviews || 0
                ],
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
            }
        ]
    };

    const options = {
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 20, // Set the font size here
                    },
                },
            },
            tooltip: {
                bodyFont: {
                    size: 14, // Set the font size for the tooltip text here if needed
                },
                titleFont: {
                    size: 16, // Set the font size for the tooltip title here if needed
                }
            }
        }
    };

    return (
        <div>
       
            <div className="items-center flex flex-col mt-8 justify-center">
                <div className="md:w-1/2 items-center flex flex-col justify-center">
                    <Pie data={data} options={options} />
                </div>
            </div>
        </div>
    );
};

export default Statistics;
