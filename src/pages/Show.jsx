/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";
import Header from "../components/Header";
import showStore from "../stores/showStore";

export default function Show() {
    const store = showStore();
    const params = useParams();
    useEffect(() => {
        store.fetchData(params.id);
    }, []);

    // eslint-disable-next-line react/jsx-no-useless-fragment
    if (!store.data) return <></>;

    return (
        <div>
            <Header />
            <div>
                <h2>
                    {store.data.name} ({store.data.symbol})
                </h2>
            </div>
            <div className="show__graph">
                <AreaChart
                    width={500}
                    height={400}
                    data={store.graphData}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Date" />
                    <YAxis />
                    <Tooltip />
                    <Area
                        type="monotone"
                        dataKey="price"
                        stroke="#8884d8"
                        fill="#8884d8"
                    />
                </AreaChart>
            </div>

            <div>
                <h4>Market cap rank</h4>
                <span>{store.data.market_cap_rank}</span>
            </div>
        </div>
    );
}
