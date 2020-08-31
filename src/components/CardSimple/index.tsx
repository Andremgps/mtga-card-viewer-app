import React from "react";
import { Text, Card, CardItem, Body, View } from "native-base";
import { FormatedManaSimbols } from "../FormatedManaSimbols";
import { CardGradient } from "../CardGradient";
import { ScrollView } from "react-native-gesture-handler";
import Image from "react-native-remote-svg";
import style from "./style";
import api from "../../services/api";

export const CardSimple: React.FC = () => {
  const rawManaCost = "{1}{R}";
  return (
    <Card transparent>
      <CardGradient colorIdentity={["R"]}>
        <CardItem header style={style.cardHeader}>
          <ScrollView
            horizontal={true}
            contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
            persistentScrollbar={true}
          >
            <Text style={{ marginRight: 10 }}>Abrade</Text>
            <FormatedManaSimbols manaCost={rawManaCost} />
          </ScrollView>
        </CardItem>
        <CardItem style={{ backgroundColor: "transparent", paddingTop: 0 }}>
          <Body style={{ alignItems: "center" }}>
            <Image
              source={{
                uri:
                  "http://192.168.2.101:3000/images/cards/24da9431-7e52-44f5-bc18-2f2d8a4ca81e.jpg",
              }}
              style={style.cardImage}
            />
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  width: "60%",
                  height: 70,
                  ...style.cardInfoView,
                }}
              >
                <ScrollView persistentScrollbar={true}>
                  <Text>Common</Text>
                  <Text>Sorcery</Text>
                </ScrollView>
              </View>
              <View style={style.verticalDivider} />
              <View
                style={{
                  width: "30%",
                  height: 70,
                  ...style.cardInfoView,
                }}
              >
                <ScrollView
                  persistentScrollbar={true}
                  contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}
                >
                  <Image
                    source={{ uri: "http://192.168.2.101:3000/images/sets/hou.svg" }}
                    style={style.setIcon}
                  />
                  <Image
                    source={{ uri: "http://192.168.2.101:3000/images/sets/2xm.svg" }}
                    style={style.setIcon}
                  />
                  <Image
                    source={{ uri: "http://192.168.2.101:3000/images/sets/m20.svg" }}
                    style={style.setIcon}
                  />
                  <Image
                    source={{ uri: "http://192.168.2.101:3000/images/sets/m19.svg" }}
                    style={style.setIcon}
                  />
                  <Image
                    source={{ uri: "http://192.168.2.101:3000/images/sets/mm3.svg" }}
                    style={style.setIcon}
                  />
                  <Image
                    source={{ uri: "http://192.168.2.101:3000/images/sets/roe.svg" }}
                    style={style.setIcon}
                  />
                </ScrollView>
              </View>
            </View>
          </Body>
        </CardItem>
      </CardGradient>
    </Card>
  );
};
