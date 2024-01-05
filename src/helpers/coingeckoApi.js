import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.coingecko.com/api/v3" }),
  endpoints: (builder) => ({
    getCryptocurrencyData: builder.query({
      query: () =>
        "coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false",
    }),
  }),
});

export const { useGetCryptocurrencyDataQuery } = cryptoApi;
export default cryptoApi;
