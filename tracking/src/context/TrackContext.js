import createDataContext from './createDataContext'
import trackerApi from '../api/server'

const trackReducer = (state,action) =>{
    switch (action.type){
        case 'load_track':
            return action.payload;
        default:
            return state
    }
}

const loadTrack = (dispatch) => async() => {
    const response = await trackerApi.get('/tracks')
    dispatch({type:'load_track',payload:response.data});
}

const createTrack = (dispatch) => async(name,locations) => {
    try{
        await trackerApi.post('/tracks',{name,locations})
    }
    catch(err){
        console.log(err)
    }
}

export const {Context, Provider} = createDataContext(
    trackReducer,
    {loadTrack,createTrack},
    []
)