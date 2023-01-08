/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import homeStore from "../stores/homeStore";

export default function Home() {
    const store = homeStore();

    useEffect(() => {
        store.fetchCoins();
    }, []);

    return (
        <div>
            {/* eslint-disable-next-line array-callback-return */}
            <input
                type="text"
                value={store.query}
                onChange={store.setQuery}
            />
            {store.coins.map((coin) => {
                return (
                    <div key={coin.id}>
                        <Link to={`/${coin.id}`}>{coin.name}</Link>
                    </div>
                );
            })}
        </div>
    );
}
