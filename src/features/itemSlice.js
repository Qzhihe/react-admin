import { createSlice } from "@reduxjs/toolkit";

const itemSlice = createSlice({
    name: 'item',
    initialState: {
        items: []
    },
    reducers: {
        updateItems: (state, actions) => {
            state.items = actions.payload;
        }
    }
});

export default itemSlice.reducer;
export const { updateItems } = itemSlice.actions;