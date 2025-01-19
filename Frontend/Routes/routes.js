import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import StudentLoginScreen from "../Screens/StudentScreens/LoginScreen";
import RegsiterScreen from "../Screens/StudentScreens/RegisterScreen";
import OTPScreen from "../Screens/StudentScreens/OTPScreen";
import ResetPasswordScreen from "../Screens/StudentScreens/ResetPasswordScreen";
import WelcomeScreen from "../Screens/WelcomeScreen";
import InitialScreen from "../Screens/InitialScreen";
import WardenLoginScreen from "../Screens/WardenScreens/LoginScreen";
let Stack = createNativeStackNavigator();

const StudentRoute = () => {
  return (
    <Stack.Navigator initialRouteName="/Initial">
      <Stack.Screen
        name="/Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="/Initial"
        component={InitialScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="/StudentLogin"
        component={StudentLoginScreen}
        options={{
          title: "Login",
          headerStyle: { backgroundColor: "rgb(11,117,131)" },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="/StudentRegister"
        component={RegsiterScreen}
        options={{
          title: "Register",
          headerStyle: { backgroundColor: "rgb(11,117,131)" },
          headerTintColor: "white",
        }}
      />

      <Stack.Screen
        name="/StudentForgetOTP"
        component={OTPScreen}
        options={{
          title: "Forget Password",
          headerStyle: { backgroundColor: "rgb(11,117,131)" },
          headerTintColor: "white",
        }}
      />

      <Stack.Screen
        name="/StudentResetPassword"
        component={ResetPasswordScreen}
        options={{
          title: "Reset Password",
          headerStyle: { backgroundColor: "rgb(11,117,131)" },
          headerTintColor: "white",
        }}
      />

      <Stack.Screen
        name="/WardenLogin"
        component={WardenLoginScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StudentRoute;
