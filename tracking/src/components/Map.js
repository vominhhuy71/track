import React, {useContext} from 'react';
import {Text,StyleSheet, ActivityIndicator} from 'react-native';
import MapView, {Circle, Polyline} from 'react-native-maps';
import {Context as LocationContext} from '../context/LocationContext'

const Map = () => {
    const {state:{currentLocation, locations}} = useContext(LocationContext);
    //console.log(state)

    if(!currentLocation){
        return <ActivityIndicator size="large" style={{marginTop:200}}/>
    }

    return (
        <MapView 
            style={styles.map}
            initialRegion={{
                ...currentLocation.coords,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
              }}
            region = {{
                ...currentLocation.coords,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
            }}
        >
            <Circle 
                center={currentLocation.coords}
                radius={25}
                strokeColor="rgba(158,158,255,1.0)"
                fillColor="rgba(158,158,255,0.3)"
            />
            <Polyline coordinates={locations.map(loc=>loc.coords)}/>
        </MapView>
    )
}

const styles = StyleSheet.create({
    map:{
        marginTop: 20,
        height: 200,
        width: 500
    }
})


export default Map;