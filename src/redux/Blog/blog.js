import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    blogData: null
};

const blogRedux = createSlice({
    name: "blog",
    initialState,
    reducers: {
        setBlogData: (state, actions) => {
            state.blogData = actions.payload;
        }
    }
});

export const blogState = (state => state.blog);

export const { setBlogData } = blogRedux.actions;

export default blogRedux.reducer;