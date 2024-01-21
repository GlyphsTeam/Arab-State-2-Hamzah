import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    aboutData: null
};

const aboutRedux = createSlice({
    name: "about",
    initialState,
    reducers: {
        setAboutData: (state, actions) => {
            state.aboutData = actions.payload;
        }
    }
});
export const aboutState = ((state) => state.about);

export const { setAboutData } = aboutRedux.actions;

export default aboutRedux.reducer;