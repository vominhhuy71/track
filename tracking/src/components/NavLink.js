import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Spacer from './Spacer';

const NavLink = ({navigation,text,routeName}) =>{
    return (
        <TouchableOpacity 
            onPress={() => 
                navigation.navigate(routeName)}>
            <Spacer>
                <Text>{text}</Text>
            </Spacer>         
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({});

export default NavLink;