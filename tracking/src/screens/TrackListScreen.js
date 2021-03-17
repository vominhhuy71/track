import React, {useContext} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Context as TrackContext} from '../context/TrackContext';
import { useFocusEffect } from '@react-navigation/native';
import {ListItem} from 'react-native-elements'

const TrackListScreen = ({navigation}) =>{

    const {state,loadTrack} = useContext(TrackContext)
    useFocusEffect(
        React.useCallback(() => {
            return () => loadTrack();
        }, [])
    )
    return (
        <SafeAreaView>
            <FlatList 
                data = {state}
                keyExtractor = {item=>item._id}
                renderItem={({item})=>{
                    return (
                        <TouchableOpacity
                            onPress={()=>navigation.navigate('TrackDetail',{id:item._id})}
                        >
                            <ListItem bottomDivider>
                                <ListItem.Content>
                                    <ListItem.Title>
                                        {item.name}
                                    </ListItem.Title>
                                </ListItem.Content>
                                <ListItem.Chevron />
                            </ListItem>
                        </TouchableOpacity>
                    )
                }}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({});

export default TrackListScreen;