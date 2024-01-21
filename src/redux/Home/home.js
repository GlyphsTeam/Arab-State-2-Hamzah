import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    homeData: null
};


const homeRedux = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setHomeData: (state, actions) => {
            state.homeData = actions.payload;
        }
    }
});

export const homeState = ((state) => state.home);

export const { setHomeData } = homeRedux.actions;

export default homeRedux.reducer;

