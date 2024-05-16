import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";

import { SearchProvider } from "./context/search";
import { CartProvider } from "./context/cart";
import { Toaster } from "react-hot-toast";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
     <SearchProvider>
     <CartProvider>
      
    <Toaster/>
  
    <Provider store={store}>
      <App />
    </Provider>

    </CartProvider>
    </SearchProvider>
   
  </React.StrictMode>
);
