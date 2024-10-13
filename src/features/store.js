import { configureStore } from "@reduxjs/toolkit";

import categoriesSlice from "./categories/categoriesSlice";
import productsSlice from "./products/productsSlice";
import { apiSlice } from "./api/apiSlice";

export const store = configureStore({
    reducer: {
        categories: categoriesSlice, 
        products: productsSlice,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getMiddlewere) => getMiddlewere().concat(apiSlice.middleware),
    devTools: true,
});