import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AccountScreen from './src/screens/AccountScreen';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import TrackCreateScreen from './src/screens/TrackCreateScreen';
import TrackDetailScreen from './src/screens/TrackDetailScreen';
import TrackListScreen from './src/screens/TrackListScreen';
import SplashScreen from './src/screens/SplashScreen';
import React, {useContext} from 'react';
import {Provider as AuthProvider, Context as AuthContext} from './src/context/AuthContext';
import {Provider as LocationProvider} from './src/context/LocationContext';
import {Provider as TrackProvider} from './src/context/TrackContext';
import { NavigationContainer} from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';


//Work only in v4
// const switchNavigator = createSwitchNavigator({
//   loginFlow: createStackNavigator({
//     SignIn: SigninScreen,
//     SignUp: SignupScreen
//   }),
//   mainFlow: createBottomTabNavigator({
//     Track: createStackNavigator({
//       TrackList: TrackListScreen,
//       TrackDetail: TrackDetailScreen
//     }),
//     TrackCreate: TrackCreateScreen,
//     Account: AccountScreen

//   })
// })

// const App = createAppContainer(switchNavigator);

// export default () =>{
//   return (
//     <AuthProvider>
//       <App ref = {(navigator)=>{setNavigator(navigator)}}/>
//     </AuthProvider>
//   ) 
// }

//v5 solution
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Track () {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TrackList" component={TrackListScreen} options = {{title:"Tracks"}}/>
      <Stack.Screen name="TrackDetail" component = {TrackDetailScreen} options = {{title:"Detail"}}/>
    </Stack.Navigator>
  )
}


const Root = () => {
  const { state, tryLocalSignin } = useContext(AuthContext); 

  // React.useEffect(()=>{
  //   tryLocalSignin()
  // },[])

  if (state.isLoading){
    return <SplashScreen/>
  }

  return (
    <NavigationContainer>
      {state.token != null ? (
        <Tab.Navigator>
          <Tab.Screen
            name="Track"
            component={Track}
            options={{
              tabBarIcon: ()=>{return <FontAwesome name="list-ul" size={24} color="black" />}
            }}
          />
          <Tab.Screen
            name="TrackCreate"
            component={TrackCreateScreen}
            options={{
              title:"Add track",
              tabBarIcon: () => {return <AntDesign name="plus" size={24} color="black" />}
            }}
          />
          <Tab.Screen
            name="Account"
            component={AccountScreen}
            options={{
              title:"Account",
              tabBarIcon: () => {return <FontAwesome name="gear" size={24} color="black" />}
            }}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="SignIn"
            component={SigninScreen}
            options = {{
              headerShown:false,              
            }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignupScreen}
            options = {{headerShown:false}}
          />
        </Stack.Navigator>
    )}
  </NavigationContainer>
  )
}

export default ()=> {
  return (
    <TrackProvider>
      <LocationProvider>
        <AuthProvider>
          <Root/>
        </AuthProvider>
      </LocationProvider>
    </TrackProvider>
  )
}
