/* eslint-disable no-console */
import axios from "axios";
import create from "zustand";

const showStore = create((set) => ({
    graphData: [],
    data: [],
    fetchData: async (id) => {
        const [graphRes, dataRes] = await Promise.all([
            axios.get(
                `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=pln&days=100`,
            ),
            axios.get(
                `https://api.coingecko.com/api/v3/coins/${id}?market_data=true`,
            ),
        ]);

        const graphData = graphRes.data.prices.map((price) => {
            const [timestamp, p] = price;
            const date = new Date(timestamp).toLocaleDateString("en-us");
            return {
                Date: date,
                price: p,
            };
        });

        set({ graphData, data: dataRes.data });
    },
}));

export default showStore;
