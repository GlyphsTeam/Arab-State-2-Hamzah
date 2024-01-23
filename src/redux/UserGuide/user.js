import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    userData: null
};

const userRedux = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, actions) => {
            state.userData = actions.payload;
        }
    }
});


export const userState = ((state) => state.user);

export const { setUserData } = userRedux.actions;

export default userRedux.reducer;