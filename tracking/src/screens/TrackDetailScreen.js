import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Context} from '../context/TrackContext'
import MapView, {Polyline} from 'react-native-maps';
import Spacer from '../components/Spacer';

const TrackDetailScreen = ({route,navigation}) => {
    const {id} = route.params
    const {state} = useContext(Context);


    const track = state.find(t=>t._id === id)
    const initialCoords = track.locations[0].coords
    return (
        <View>
            <Text>{track.name}</Text>
            <Spacer>
                <MapView 
                    style={styles.map}
                    initialRegion = {{
                        longitudeDelta: 0.001,
                        latitudeDelta: 0.001,
                        ...initialCoords
                    }}
                >
                    <Polyline coordinates={track.locations.map(loc=>loc.coords)}/>
                </MapView>
            </Spacer>
        </View>
    )
}

const styles = StyleSheet.create({
    map:{
        height: 300
    }
});

export default TrackDetailScreen;