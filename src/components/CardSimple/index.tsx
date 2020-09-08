import React from "react";
import { Text, Card, CardItem, Body, View } from "native-base";
import { FormatedManaSimbols } from "../FormatedManaSimbols";
import { CardGradient } from "../CardGradient";
import { ScrollView } from "react-native-gesture-handler";
import { Card as RCard } from "../../store/ducks/cards/types";
import Image from "react-native-remote-svg";
import style from "./style";

interface OwnProps {
  card: RCard;
}

export const CardSimple: React.FC<OwnProps> = ({ card }) => {
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
            <Image
              source={{
                uri: card.images[0].image_uri,
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
                    <Image key={set.id} source={{ uri: set.set_icon }} style={style.setIcon} />
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
