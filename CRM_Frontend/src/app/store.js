import { configureStore } from "@reduxjs/toolkit";
import customersReducer from "../features/customersSlice";
import leadsReducer from "../features/leadsSlice";
import dealsReducer from "../features/dealsSlice";
import activitiesReducer from "../features/activitiesSlice";

export const store = configureStore({
    reducer: {
        customers:customersReducer,
        leads:leadsReducer,
        deals:dealsReducer,
        activities:activitiesReducer,
    },
})