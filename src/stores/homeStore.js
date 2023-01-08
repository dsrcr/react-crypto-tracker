/* eslint-disable no-console */
import axios from "axios";
import create from "zustand";
import debounce from "../helpers/debounce";

const homeStore = create((set) => ({
    coins: [],
    trending: [],
    query: "",
    setQuery: (e) => {
        set({ query: e.target.value });
        homeStore.getState().searchCoins();
    },
    searchCoins: debounce(async () => {
        const { query, trending } = homeStore.getState();
        if (query.length > 3) {
            const search = `https://api.coingecko.com/api/v3/search?query=${query}`;
            console.log("Input query: ", query);
            const res = await axios.get(search);
            console.log(`Response from ${search}:`, res);
            console.log("Requested coin", res.data);

            const coins = res.data.coins.map((coin) => {
                return {
                    name: coin.name,
                    image: coin.large,
                    id: coin.id,
                };
            });

            set({ coins });
        } else {
            set({ coins: trending });
        }
    }, 500),
    fetchCoins: async () => {
        const trending = "https://api.coingecko.com/api/v3/search/trending";
        const res = await axios.get(trending);
        try {
            const coins = res.data.coins.map((coin) => ({
                name: coin.item.name,
                image: coin.item.large,
                id: coin.item.id,
                priceBtc: coin.item.price_btc,
            }));
            console.log(`Response from ${trending}:`, res);
            set({ coins, trending: coins });
            console.log("Coins: ", coins);
        } catch (error) {
            console.error(error);
        }
    },
}));

export default homeStore;
