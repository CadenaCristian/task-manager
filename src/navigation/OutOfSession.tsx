import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/outOfSession/Login";
import Register from '../screens/outOfSession/Register';

const Stack = createNativeStackNavigator();

export default function OutOfSession() {
  return (
    <Stack.Navigator >
      <Stack.Screen
        name="login"
        component={Login}
        options={{ title: "", headerTransparent: true }}
      />
      <Stack.Screen
        name="register"
        component={Register}
        options={{ title: "", headerTransparent: true }}
      />
    </Stack.Navigator>
  );
}
