import React, {useState, useContext} from 'react';
import {StyleSheet} from 'react-native';
import {Text,Button,Input} from 'react-native-elements';
import {Context as AuthContext} from '../context/AuthContext';
import Spacer from './Spacer'
import Icon from 'react-native-vector-icons/FontAwesome';


const AuthForm = ({headerText, onSubmit, errorMessage, submitButton}) =>{
    const [email, setEmail] = useState('');
    const [password,setPwd] = useState('');
    return (
        <>
            <Spacer>
                <Text h2>{headerText}</Text>
            </Spacer>
            <Spacer>
                <Input
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder='Email'
                    leftIcon={
                        <Icon
                            name='user'
                            size={24}
                            color='black'
                        />
                    }
                />
            </Spacer>
            <Spacer>
                <Input 
                    value={password}
                    onChangeText={setPwd}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Password" 
                    secureTextEntry={true} 
                    leftIcon={
                        <Icon
                            name='lock'
                            size={24}
                            color='black'
                        />
                    }
                />
            </Spacer>
            {
                errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null
            }
            <Button 
                    title={`${submitButton}`}
                    type="outline" 
                    onPress={()=>onSubmit({email,password})}/>
        </>
    )
}

const styles = StyleSheet.create({
    errorMessage: {
        fontSize: 12,
        color: "red",
        marginLeft: 30,
        marginBottom: 30
    } 
})

export default AuthForm;