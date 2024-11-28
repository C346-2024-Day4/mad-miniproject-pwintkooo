import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import Home from './Home.js';
import Add from './Add.js';
import Edit from './Edit.js';

const Stack = createNativeStackNavigator();

function Navigation() {
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name='Home' component={Home}/>
                <Stack.Screen name='Add' component={Add}/>
                <Stack.Screen name='Edit' component={Edit}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;
