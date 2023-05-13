import { configureStore } from "@reduxjs/toolkit";

import userReducer from "features/userSlice";
import itemReducer from "features/itemSlice";
import routerReducer from "features/routerSlice";
import sidebarReducer from 'features/sidebarSlice';

export default configureStore({
    reducer: {
        user: userReducer,
        item: itemReducer,
        router: routerReducer,
        sidebar: sidebarReducer,
    }
});