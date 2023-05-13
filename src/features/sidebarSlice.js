import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: {
        open: true
    },
    reducers: {
        toggleOpen: (state) => {
            state.open = !state.open;
        }
    }
});

export default sidebarSlice.reducer;
export const { toggleOpen } = sidebarSlice.actions;