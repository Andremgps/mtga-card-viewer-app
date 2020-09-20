import React from "react";
import { AppLoading } from "expo";
import { OpenSans_400Regular, OpenSans_700Bold, useFonts } from "@expo-google-fonts/open-sans";
import { Roboto_500Medium as Roboto_medium } from "@expo-google-fonts/roboto";
import Routes from "./src/routes";
import { Provider } from "react-redux";
import store from "./src/store";

export default function App() {
  let [fontLoaded] = useFonts({
    OpenSans_400Regular,
    OpenSans_700Bold,
    Roboto_medium,
  });

  if (!fontLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}
