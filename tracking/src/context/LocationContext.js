import createDataContext from './createDataContext'

const locationReducer = (state,action) => {
    switch (action.type){
        case 'reset':
            return {...state,name:'',locations:[]}
        case 'change_name':
            return {...state, name: action.payload}
        case 'add_location':
            return {...state, locations: [...state.locations,action.payload]}
        case 'stop_recording':
            return {...state,recording: false}
        case 'start_recording':
            return {...state, recording: true}
        case 'add_current_location':
            return {...state, currentLocation: action.payload }
        default:
            return state
    }
}

const reset = dispatch => ()=>{
    dispatch({type:'reset'})
}

const startRecording = (dispatch) => () =>{
    dispatch({type:'start_recording'})
} 

const stopRecording = (dispatch) => () => {
    dispatch({type:'stop_recording'})
}

const addLocation = (dispatch) => (location, recording) => {
    dispatch({type:'add_current_location',payload:location})
    if(recording)
    {
        dispatch({type:'add_location',payload: location})
    }
}

const changeName = (dispatch) => (name) =>{
    dispatch({type:"change_name", payload: name})
}


export const {Context, Provider} = createDataContext(
    locationReducer,
    {startRecording,stopRecording,addLocation, changeName, reset},
    {currentLocation:'',locations:[],recording:false, name:''}
)