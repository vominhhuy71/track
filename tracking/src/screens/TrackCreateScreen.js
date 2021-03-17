import React, {useContext, useCallback} from 'react';
import { StyleSheet} from 'react-native';
import {Text} from 'react-native-elements'
import { SafeAreaView } from 'react-native-safe-area-context';
import Map from '../components/Map';
import '../locations';
import {Context as LocationContext} from '../context/LocationContext'
import useLocation from '../hooks/useLocation'
import TrackFrom from '../components/TrackForm'
import { useIsFocused } from '@react-navigation/native';

const TrackCreateScreen = ({navigation}) =>{
    const {addLocation, state:{recording}} = useContext(LocationContext)

    const callback = useCallback((location)=>{
        addLocation(location,recording)
    }, [recording])

    const [err] = useLocation(useIsFocused()||recording, callback)

    return (
        <SafeAreaView>
            <Text h4>Create a new track</Text>
            <Map />
            {err ? <Text>Please enable location!</Text>:null}
            <TrackFrom/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({});

export default TrackCreateScreen;