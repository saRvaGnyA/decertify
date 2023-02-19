import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect } from "react";
import { LogBox, View, Text, TouchableOpacity } from "react-native";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import { ThemeProvider } from "./context/ThemeProvider";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./screens/HomeScreen";
import StudentHome from "./screens/StudentHome";
import VerifierHome from "./screens/VerifierHome";
import StudentRegister from "./screens/StudentRegister";

const Stack = createNativeStackNavigator();

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  // avoid warnings showing up in app. comment below code if you want to see warnings.
  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <NavigationContainer>
        <ThemeProvider>
          <SafeAreaProvider>
            <StatusBar />
            <Stack.Navigator>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Student" component={StudentHome} />
              <Stack.Screen name="Verifier" component={VerifierHome} />
              <Stack.Screen name="Register" component={StudentRegister} />
            </Stack.Navigator>
          </SafeAreaProvider>
        </ThemeProvider>
      </NavigationContainer>
    );
  }
}
