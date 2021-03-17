import React, {useContext, useEffect} from 'react';
import { StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Spacer from '../components/Spacer';
import AuthForm from '../components/AuthForm';
import {Context as AuthContext} from '../context/AuthContext';
import { useFocusEffect } from '@react-navigation/native';
import SplashScreen from './SplashScreen'

const SigninScreen = ({navigation}) =>{
    const {state, signin, clearErrorMessage, tryLocalSignin} = useContext(AuthContext)

    useFocusEffect(
        React.useCallback(() => {
            return () => clearErrorMessage();
        }, [])
    )
    return (
        <View style={styles.viewStyle}>
            <AuthForm 
                headerText="Let's start!"
                onSubmit = {signin}
                errorMessage={state.errorMessage}
                submitButton="Log in!"
            />
            <Spacer>
                <TouchableOpacity 
                    onPress={() => navigation.navigate("SignUp")}>
                    <Spacer>
                        <Text style = {styles.link}>Don't have an account? Sign up!</Text>
                    </Spacer>         
                </TouchableOpacity>
            </Spacer>
        </View>
    )
}

const styles = StyleSheet.create({
    viewStyle:{
        flex: 1,
        justifyContent: "center",
        marginBottom: 200
    },
    link: {
        color: "grey",
        
    }
});

export default SigninScreen;