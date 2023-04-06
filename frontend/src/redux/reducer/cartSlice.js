import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'



const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        count: 0,
        item: [],
        total: 0
    },
    reducers: {
        addItems: (state, action) => {
            let items = state.item
            if (state.count !== 3) {
                state.count = state.count + 1
                state.item = [...items, action.payload.item]
                state.total += action.payload.item.price
            }
        },
        removeItems: (state, action) => {
            let items = state.item
            let index = items.findIndex(i => i.id === action.payload.id)
            items.splice(index, 1)
            console.log(items)
            state.count = state.count - 1
            state.total -= action.payload.price
        },
        checkout: async (state, action) => {
            state.count = 0
        }
    }
})

export const { addItems, removeItems, checkout } = cartSlice.actions
export default cartSlice.reducer