import { createSlice } from "@reduxjs/toolkit";

const routerSlice = createSlice({
    name: 'router',
    initialState: {
        routes: [
            {
                url: '/dashboard',
                title: 'Dashboard',
                icon: 'Dashboard',
                children: null
            },
            {
                url: '/examples',
                title: 'Examples',
                icon: 'Workspaces',
                children: [
                    {
                        url: '/examples/table',
                        title: 'Table',
                        icon: 'TableChart',
                        children: null
                    },
                ]
            },
            {
                url: '/form',
                title: 'Form',
                icon: 'Reorder',
                children: null
            }
        ],
        routesMap: {
            '/': 'Home',
            '/form': 'Form',
            '/examples': 'Examples',
            '/dashboard': 'Dashboard',
            '/examples/table': 'Table',
        }
    },
    reducers: {
        
    }
});

export default routerSlice.reducer;
export const { updateTitle } = routerSlice.actions;