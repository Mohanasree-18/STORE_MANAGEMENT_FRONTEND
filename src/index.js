import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
//following is for react-query
import { QueryClient, QueryClientProvider } from "react-query";
//following are for redux
import { store } from "./Redux/Store/store";
import { Provider } from "react-redux";

//! instance of react query
const client = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <App />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
