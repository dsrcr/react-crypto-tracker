import ReactDOM from "react-dom/client";
import App from "./components/App.jsx";
import "./styles/index.css";

import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import coingeckoApi from "./helpers/coingeckoApi.js";
import { Provider } from "react-redux";

const store = configureStore({
  reducer: {
    [coingeckoApi.reducerPath]: coingeckoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(coingeckoApi.middleware),
});

setupListeners(store.dispatch);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
