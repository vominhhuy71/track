import createDataContext from './createDataContext'
import trackerApi from '../api/server'
import AsyncStorage from '@react-native-async-storage/async-storage'

const authReducer = (state,action) =>{
    switch(action.type){
        case 'restore_token':
            return {...state, token: action.payload, isLoading: false}
        case 'clear_error':
            return {...state,errorMessage:''}
        case 'signin':
            return {errorMessage: '', token: action.payload}
        case 'add_err':
            return {...state, errorMessage: action.payload}
        case 'signup':
            return {errorMessage: '', token: action.payload}
        case 'logout':
            return {...state, token: null}
        default:
            return state;
    }
}

const signin = (dispatch) =>{
    return async({email,password})=>{
        try{
            const response = await trackerApi.post('/signin',{email,password})
            dispatch({type:'signup',payload: response.data.token})
            try {
                await AsyncStorage.setItem('token', response.data.token);
            }
            catch(err){
                dispatch({type:'add_err',payload:'Cannot assign token to storage'})
            }
        }
        catch(err){
            dispatch({type:'add_err',payload:'Something went wrong, please try again!'})
        }
        
    }
}

const signup = (dispatch) => async({email,password})=>{
    try{
        const response = await trackerApi.post('/signup',{email,password})
        try {
            await AsyncStorage.setItem('token', response.data.token);
        }
        catch(err){
            dispatch({type:'add_err',payload:'Cannot assign token to storage'})
        }
        dispatch({type:'signup',payload: response.data.token})
    }
    catch(err){
        dispatch({type:'add_err',payload:'Something went wrong, please try again!'})
    }
}

const logout = (dispatch) =>{
    return async() => {
        dispatch({type:'logout'})
        await AsyncStorage.removeItem('token')
    }
}

const clearErrorMessage = (dispatch) =>() => dispatch({type: "clear_error"})

const tryLocalSignin = (dispatch) => async() => {
    const token = await AsyncStorage.getItem('token');
    dispatch({type:'restore_token',payload:token})
} 

export const {Context, Provider} = createDataContext(
    authReducer,
    {signup,signin,logout, clearErrorMessage, tryLocalSignin},
    {token: null, errorMessage:'', isLoading: true}
)