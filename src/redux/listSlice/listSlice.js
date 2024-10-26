import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Select } from "antd";
import axios from "axios";

const config = {
    headers: {
        Authorization: `Bearer ${import.meta.env.TOKEN}`,
        'Content-Type': 'application/json',
        accept: 'application/json',
    }
}
const api = axios.create({
    baseURL: import.meta.env.API_BASE_URL,
});

const authorization = async (obj) => {
    const response = await api.post('/auth/login', obj, config);
    //console.log(response);
    localStorage.setItem('token', response.data.token);
    //console.log('захожу', response.data.token);
    //return response.data;
}

const fetchAuthorization= createAsyncThunk('list/fetchAuthorization' , async(obj) =>{
    const data = await authorization(obj);
    
    return data;
})


const getVideos = async ({request, select }) => {
     console.log('get', select);
     
     const response = await axios.get ('https://www.googleapis.com/youtube/v3/search', {
        params:{
                part: 'snippet', // указываем какие данные хотим получить
                order: select,
                key: import.meta.env.API_KEY,
                q: request,      // запрос поиска
                type: 'video',
                maxResults: 50   // максимальное количество видео
        }
    });
     return {data: response.data.items, totalResults: response.data.pageInfo.totalResults};
 }

 const fetchGetVideos = createAsyncThunk('video/fetchGetVideos', async(request) =>{
    //console.log('fetch request', request);
    
    const data = await getVideos(request)
    return data
 })

 const getMoreInfoAboutVideo = async (videoId) =>{
    const response = await axios.get ('https://www.googleapis.com/youtube/v3/videos', {
        params: {
            part: 'snippet, statistics, player',
            id: videoId,
            key: import.meta.env.API_KEY,
        },
    })
    //console.log('response', response);
    
    return response
 }

 const fetchGetMoreInfoAboutVideo = createAsyncThunk('video/fetchGetMoreInfoAboutVideo', async(videoId) =>{
    const response = await getMoreInfoAboutVideo(videoId);
    //console.log('more',{ videoId, stats: response.data.items[0].statistics });
        
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
                //state.data = action.payload; 
            })
            .addCase(fetchAuthorization.rejected, (state, action) => {
                state.status = 'failed';
                //state.error = action.payload;
            })
            .addCase(fetchGetVideos.pending, (state, action) =>{
                state.status = 'loading'
            })
            .addCase(fetchGetVideos.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload; 
            })
            .addCase(fetchGetVideos.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
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