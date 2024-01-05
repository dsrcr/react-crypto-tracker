import Table from "../components/Table";
import { useState, useEffect } from "react";

import { useGetCryptocurrencyDataQuery } from "../helpers/coingeckoApi";

export default function MarketCap() {
  const [cryptocurrencyData, setCryptocurrencyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCryptocurrencyData = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
        );
        const data = await response.json();
        setCryptocurrencyData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cryptocurrency data:", error);
        setLoading(false);
      }
    };

    fetchCryptocurrencyData();
    const intervalId = setInterval(fetchCryptocurrencyData, 5 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  const { data, error, isLoading, isError, refetch } =
    useGetCryptocurrencyDataQuery();
  useEffect(() => {
    if (
      !cryptocurrencyData ||
      (Array.isArray(cryptocurrencyData) && cryptocurrencyData.length === 0)
    ) {
      refetch();
    }
  }, [cryptocurrencyData, refetch]);

  const columns = [
    {
      label: "Market Cap",
      key: "market_cap",
    },
    {
      label: "Name",
      key: "name",
      render: (value) => (
        <div className="flex items-center">
          <img
            src={value.image}
            alt={value.name}
            className="h-8 w-8 object-cover rounded-full mr-2"
          />
          {value.name}
        </div>
      ),
    },
    {
      label: "Symbol",
      key: "symbol",
    },
    {
      label: "Price",
      key: "current_price",
    },
    {
      label: "Volume",
      key: "total_volume",
    },
  ];
  return (
    <div className="container mx-auto p-4">
      <Table
        data={cryptocurrencyData}
        columns={columns}
        loadingMessage="Loading cryptocurrency data..."
      />
    </div>
  );
}
