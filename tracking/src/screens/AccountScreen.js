import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import {Context} from '../context/AuthContext';
import Spacer from '../components/Spacer'
import { SafeAreaView } from 'react-native-safe-area-context';


const AccountScreen = ({navigation}) =>{
    const {logout} = useContext(Context)
    return (
        <SafeAreaView>
            <Text>Account screen</Text>
            <Spacer>
                <Button type="clear" title="Sign out" onPress={()=>logout()}/>
            </Spacer>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({});

export default AccountScreen;