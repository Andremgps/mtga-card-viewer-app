import React from "react";
import { Image } from "react-native";
import { Text, Card, CardItem, Body, View } from "native-base";
import { FormatedManaSimbols } from "../FormatedManaSimbols";
import { CardGradient } from "../CardGradient";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Card as RCard } from "../../store/ducks/cards/types";
import SvgUri from "expo-svg-uri";
import style from "./style";

interface OwnProps {
  card: RCard;
  cardImageClick(imageUri: string): void;
}

export const CardSimple: React.FC<OwnProps> = ({ card, cardImageClick }) => {
  return (
    <Card transparent>
      <CardGradient colorIdentity={card.color_identity}>
        <CardItem header style={style.cardHeader}>
          <ScrollView
            horizontal={true}
            contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
            persistentScrollbar={true}
          >
            <Text style={{ ...style.text, marginRight: 10 }}>{card.name}</Text>
            <FormatedManaSimbols manaCost={card.mana_cost} />
          </ScrollView>
        </CardItem>
        <CardItem style={{ backgroundColor: "transparent", paddingTop: 0 }}>
          <Body style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={{ width: 200, height: 200 }}
              onPress={() => cardImageClick(card.images[0].image_uri)}
            >
              <Image
                source={{
                  uri: card.images[0].image_uri,
                }}
                style={style.cardImage}
              />
            </TouchableOpacity>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  width: "60%",
                  height: 70,
                  ...style.cardInfoView,
                }}
              >
                <ScrollView persistentScrollbar={true}>
                  <Text style={{ ...style.text, ...style.rarityText, ...style[card.rarity] }}>
                    {card.rarity}
                  </Text>
                  <Text style={style.text}>{card.type_line}</Text>
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
                  {card.sets.map((set) => (
                    <SvgUri
                      key={set.id}
                      source={{ uri: set.set_icon }}
                      height="30"
                      width="30"
                      style={{ marginRight: 10 }}
                    />
                  ))}
                </ScrollView>
              </View>
            </View>
          </Body>
        </CardItem>
      </CardGradient>
    </Card>
  );
};
