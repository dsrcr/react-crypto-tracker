/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function ListItem({ coin }) {
    return (
        <div className="home__crypto">
            <Link to={`/${coin.id}`}>
                <span className="home__cryptoImage">
                    <img
                        src={coin.image}
                        alt="coinimage"
                    />
                </span>
                <span className="home__cryptoName">{coin.name} BTC</span>
                <span className="home__cryptoPrices">
                    <span className="home__cryptoBtc">
                        {coin.priceBtc}
                        <i className="nf-fa-bitcoin" />
                    </span>
                </span>
            </Link>
        </div>
    );
}
