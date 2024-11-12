import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const config = {
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
        'Content-Type': 'application/json',
        accept: 'application/json',
    }
}
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

const authorization = async (obj) => {
    const response = await api.post('/auth/login', obj, config);

    localStorage.setItem('token', response.data.token);
 
}

const fetchAuthorization= createAsyncThunk('list/fetchAuthorization' , async(obj) =>{
    const data = await authorization(obj);
    
    return data;
})


const getVideos = async ({request, select }) => {

     const response = await axios.get ('https://www.googleapis.com/youtube/v3/search', {
        params:{
                part: 'snippet', // указываем какие данные хотим получить
                order: select,
                key: import.meta.env.VITE_API_KEY,
                q: request,      // запрос поиска
                type: 'video',
                maxResults: 50   // максимальное количество видео
        }
    });
     return {data: response.data.items, totalResults: response.data.pageInfo.totalResults};
 }

 const fetchGetVideos = createAsyncThunk('video/fetchGetVideos', async(request) =>{
    const data = await getVideos(request)
    return data
 })

 const getMoreInfoAboutVideo = async (videoId) =>{
    const response = await axios.get ('https://www.googleapis.com/youtube/v3/videos', {
        params: {
            part: 'snippet, statistics, player',
            id: videoId,
            key: import.meta.env.VITE_API_KEY,
        },
    });
    return response
 }

 const fetchGetMoreInfoAboutVideo = createAsyncThunk('video/fetchGetMoreInfoAboutVideo', async(videoId) =>{
    const response = await getMoreInfoAboutVideo(videoId);   
    return { videoId, stats: response.data.items[0].statistics };
 })

const listSlice = createSlice({
    name: 'list',
    initialState: {
        data: [],
        stats: {},
        status: null,
        error: null,
    },
    reducers: {
        removeList: (state, action) => {
            state.data = action.payload;
        }
    },
    extraReducers: (builder)=>{
        builder
            .addCase(fetchAuthorization.pending, (state, action) =>{
                state.status = 'loading'
            })
            .addCase(fetchAuthorization.fulfilled, (state, action) => {
                state.status = 'succeeded';
            })
            .addCase(fetchGetVideos.fulfilled, (state, action) => {
                state.data = action.payload; 
            })
            .addCase(fetchGetMoreInfoAboutVideo.fulfilled, (state, action) => {
                const { videoId, stats } = action.payload;
                state.stats[videoId] = stats;
            })
    }

    
});
export const { removeList } = listSlice.actions;
export {fetchAuthorization, fetchGetVideos, fetchGetMoreInfoAboutVideo}
export default listSlice.reducer;