import React, {useContext, useEffect} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import {Context} from '../context/AuthContext';

const SplashScreen = ()=>{
    const {tryLocalSignin} = useContext(Context);
    useEffect(()=>{
        tryLocalSignin();
    },[])
    
    return null
}

const styles = StyleSheet.create({})

export default SplashScreen;