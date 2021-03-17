import React, { useContext, useEffect} from 'react';
import { StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import Spacer from '../components/Spacer';
import {Context as AuthContext} from '../context/AuthContext';
import AuthForm from '../components/AuthForm'
import { useFocusEffect } from '@react-navigation/native';

const SignupScreen = ({navigation}) =>{

    const {state, signup, clearErrorMessage} = useContext(AuthContext)

    //New way of clearing the screen before and after focus, since listener.remove() 
    //and NavigationEvents was removed.
    useFocusEffect(
        React.useCallback(() => {
            return () => clearErrorMessage();
        }, [])
    )
    return (
        <View style={styles.viewStyle}>
            <AuthForm 
                headerText="Create new account"
                onSubmit = {signup}
                errorMessage={state.errorMessage}
                submitButton="Sign up!"
            />
            <Spacer>
                <TouchableOpacity 
                    onPress={() => navigation.navigate("SignIn")}>
                    <Spacer>
                        <Text style = {styles.link}>Back to Log in!</Text>
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


export default SignupScreen;