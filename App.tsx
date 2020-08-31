import React from "react";
import { AppLoading } from "expo";
import Constants from "expo-constants";
import { OpenSans_400Regular, OpenSans_700Bold, useFonts } from "@expo-google-fonts/open-sans";
import { View } from "react-native";
import Routes from "./src/routes";

export default function App() {
  let [fontLoaded] = useFonts({
    OpenSans_400Regular,
    OpenSans_700Bold,
  });

  if (!fontLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={{ paddingTop: Constants.statusBarHeight, flex: 1 }}>
      <Routes />
    </View>
  );
}
