import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./pages/Home";
import FiltersForm from "./pages/FiltersForm";

const AppStack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator headerMode="none">
        <AppStack.Screen name="Home" component={Home} />
        <AppStack.Screen name="FiltersForm" component={FiltersForm} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
