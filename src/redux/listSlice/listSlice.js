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
    try {
        const response = await api.post('/auth/login', obj, config);
        localStorage.setItem('token', response.data.token);
        return response.data;
    }
    catch (err) {
        console.log(err.message);
        console.log(err.response.data);
        throw err;
    }

}

const fetchAuthorization = createAsyncThunk('list/fetchAuthorization', async (obj, { rejectWithValue }) => {
    try {
        const data = await authorization(obj);
        return data;
    } catch (err) {
        // Возвращаем ошибку через rejectWithValue
        console.log(err.response.data);
        return rejectWithValue(err.response?.data || 'Authorization failed');
    }
})


const getVideos = async ({ request, select }) => {
    try {
        const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                part: 'snippet', // указываем какие данные хотим получить
                order: select,
                key: import.meta.env.VITE_API_KEY,
                q: request,      // запрос поиска
                type: 'video',
                maxResults: 50   // максимальное количество видео
            }
        });
        return { data: response.data.items, totalResults: response.data.pageInfo.totalResults };
    }
    catch (err) {
        console.log(err.message);
        console.log(err.response.data);
        throw err;
    }
}

const fetchGetVideos = createAsyncThunk('video/fetchGetVideos', async (request, { rejectWithValue }) => {
    try{
        const data = await getVideos(request);
        return data;
    }
    catch(err){
        // Возвращаем ошибку через rejectWithValue
        console.log(err);
        return rejectWithValue(err.response?.data || 'Request failed');
    }
})

const getMoreInfoAboutVideo = async (videoId) => {
    try{
        const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
            params: {
                part: 'snippet, statistics, player',
                id: videoId,
                key: import.meta.env.VITE_API_KEY,
            },
        });
        return response
    }
    catch(err){
        console.log(err.message);
        console.log(err.response.data);
        throw err;
    }
}

const fetchGetMoreInfoAboutVideo = createAsyncThunk('video/fetchGetMoreInfoAboutVideo', async (videoId, { rejectWithValue }) => {
    try{
        const response = await getMoreInfoAboutVideo(videoId);
        return { videoId, stats: response.data.items[0].statistics };
    }
    catch(err){
         // Возвращаем ошибку через rejectWithValue
         console.log(err);
         return rejectWithValue(err.response?.data || 'An error occurred while retrieving some information');
    }
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
        },
        resetError: (state) => {
            state.error = null;
            state.status = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuthorization.pending, (state, action) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchAuthorization.fulfilled, (state, action) => {
                state.status = 'succeeded';
            })
            .addCase(fetchAuthorization.rejected, (state, action) => {
                state.status = 'faild';
                state.error = action.payload || 'Unexpected error occurred';
            })
            .addCase(fetchGetVideos.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(fetchGetVideos.rejected, (state, action) => {
                state.status = 'faild';
                state.error = action.payload || 'Request failed';                
            })
            .addCase(fetchGetMoreInfoAboutVideo.fulfilled, (state, action) => {
                const { videoId, stats } = action.payload;
                state.stats[videoId] = stats;
            })
            .addCase(fetchGetMoreInfoAboutVideo.rejected, (state, action) => {
                state.status = 'faild';
                state.error = action.payload || 'Request failed';    
            })
    }


});
export const { removeList, resetError } = listSlice.actions;
export { fetchAuthorization, fetchGetVideos, fetchGetMoreInfoAboutVideo }
export default listSlice.reducer;