import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cityData: null
}

const cityRedux = createSlice({
    name: "city",
    initialState,
    reducers: {
        setCityData: (state, actions) => {
            state.cityData = actions.payload;
        }
    }
});

export const cityState = ((state) => state.city);
export const { setCityData } = cityRedux.actions;

export default cityRedux.reducer;
