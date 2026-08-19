import {createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getHeadlines, Article } from "../api/NewsService";

interface NewsState{
    article: Article[],
    error: string | null,
    loading: boolean;
}

const initialState: NewsState = {
    article: [],
    error: null,
    loading: false,
};

export const fetchNews =createAsyncThunk(
    "news/fetchNews",
    async(_,{rejectWithValue}) => {
        try{
            const data = await getHeadlines();
            return data;
        }
        catch(err){
            return rejectWithValue(err instanceof Error? err.message:"Failed to load news");
        }
    }
);

const newsSlice=createSlice({
    name:"news",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchNews.pending, (state) => {
            state.loading=true;
            state.error=null;
        })
        .addCase(fetchNews.fulfilled, (state, action) => {
            state.loading=false;
            state.article=action.payload
        })
        .addCase(fetchNews.rejected, (state, action)=>{
            state.loading=false;
            state.error=action.payload as string;
        });
    },
});
export default newsSlice.reducer;