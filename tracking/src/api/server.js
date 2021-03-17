import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'

const instance = axios.create({
    baseURL: 'http://d9e6d0c1fc79.ngrok.io',
})

instance.interceptors.request.use(
    async (config)=>{
        const token = await AsyncStorage.getItem('token')
        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (err)=>{
        return Promise.reject(err)
    }
)

export default instance;