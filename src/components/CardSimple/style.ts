import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  cardImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    flex: 1,
    marginBottom: 12,
  },
  cardInfoView: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  cardHeader: {
    backgroundColor: "transparent",
    justifyContent: "center",
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
  },
  verticalDivider: {
    width: 2,
    height: "80%",
    backgroundColor: "black",
    alignSelf: "center",
  },
  text: {
    fontFamily: "OpenSans_400Regular",
  },
  rarityText: {
    textTransform: "capitalize",
  },
  common: {
    color: "#252120",
  },
  uncommon: {
    color: "#c8e4e7",
    textShadowColor: "black",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
  rare: {
    color: "#dfcd9d",
    textShadowColor: "black",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
  mythic: {
    color: "#cf912c",
    textShadowColor: "black",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
  manaSimbols: {
    width: 200,
    height: 200,
    flex: 1,
    resizeMode: "contain",
  },
});

export default style;
