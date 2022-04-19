import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import HomeScreen from "../screens/HomeScreen.js";
import EditScreen from "../screens/EditScreen.js";
import AddProductScreen from "../screens/AddProductScreen.js";


const Stack = createNativeStackNavigator()

const Navigator = () => {
    return(
       <Stack.Navigator initialRouteName="home">
           <Stack.Screen name="home" component={HomeScreen} options={({ navigation, route }) => ({
               title: 'Product List',
               headerRight: () => (
                <TouchableOpacity style={{paddingVertical: 8, paddingHorizontal: 10, backgroundColor:'#C1B421', borderRadius: 25}} onPress={() => navigation.navigate("add")}>
                    <Text style={{color: '#fff'}}>Add Product</Text>
                </TouchableOpacity>
              )
           })} />
           <Stack.Screen 
            name="edit"
            component={EditScreen}
            options={{
                title:"Edit product"
            }}
           />
           <Stack.Screen 
            name="add"
            component={AddProductScreen}
            options={{
                title:"Add product",
            }}
           />
       </Stack.Navigator>
    )
}

export default Navigator