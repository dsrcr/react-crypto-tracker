/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Header from "../components/Header";
import homeStore from "../stores/homeStore";
import ListItem from "./ListItem";

export default function Home() {
    const store = homeStore();

    useEffect(() => {
        store.fetchCoins();
    }, []);

    return (
        <div>
            <Header />
            <header className="home__search">
                <div className="width">
                    <br />
                    <h2>Search for a coin</h2>
                    <input
                        type="text"
                        value={store.query}
                        onChange={store.setQuery}
                    />
                </div>
            </header>
            {/* eslint-disable-next-line array-callback-return */}

            <div className="home__cryptos">
                <div className="width">
                    <h2>Trending Coins</h2>
                    <div className="home__cryptosList">
                        {store.coins.map((coin) => (
                            <ListItem
                                key={coin.id}
                                coin={coin}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
