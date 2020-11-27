import React, { useState } from "react";
import {
  Body,
  Button,
  Container,
  Content,
  Form,
  Header,
  Icon,
  Input,
  Item,
  Label,
  Left,
  Title,
  Text,
  CheckBox,
  ListItem,
  Radio,
  View,
  Right,
} from "native-base";
import { Filter } from "../../store/ducks/filters/types";
import * as FilterActions from "../../store/ducks/filters/actions";
import { useNavigation } from "@react-navigation/native";
import { ApplicationState } from "../../store";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { CheckBoxManaSimbol } from "../../components/CheckBoxManaSimbol";
import { SetsSelect } from "../../components/SetsSelect";
import { TypesSelect } from "../../components/TypesSelect";
import { SubTypesSelect } from "../../components/SubTypesSelect";
import { SuperTypesSelect } from "../../components/SuperTypesSelect";
import { RaritysSelect } from "../../components/RaritysSelect";
import style from "./style";
import { AdMobInterstitial } from "expo-ads-admob";
import { INTERSETIAL_AD } from "react-native-dotenv";

interface StateProps {
  filters: Filter;
  searchCount: number;
}

interface DispatchProps {
  setFilter(filters: Filter): void;
  setSearchCount(count: number): void;
}

type Props = StateProps & DispatchProps;

const FiltersForm: React.FC<Props> = (props) => {
  const { setFilter, setSearchCount, searchCount } = props;
  const navigation = useNavigation();

  const [name, setName] = useState(props.filters.name);

  const [whiteCheck, setWhiteCheck] = useState(props.filters.colors?.includes("1"));
  const [blueCheck, setBlueCheck] = useState(props.filters.colors?.includes("2"));
  const [blackCheck, setBlackCheck] = useState(props.filters.colors?.includes("3"));
  const [redCheck, setRedCheck] = useState(props.filters.colors?.includes("4"));
  const [greenCheck, setGreenCheck] = useState(props.filters.colors?.includes("5"));
  const [colorlessCheck, setColorlessCheck] = useState(props.filters.colors?.includes("6"));
  const [matchAllColors, setMatchAllColors] = useState(props.filters.matchAllColors);

  const [manaCost, setManaCost] = useState<string>(props.filters.cmc || "");
  const [cmcCondition, setCmcCondition] = useState(props.filters.cmcCondition || "equal");

  const [sets, setSets] = useState<string[]>(props.filters.sets?.split(",") || []);

  const [raritys, setRaritys] = useState<string[]>(
    props.filters.rarity ? [props.filters.rarity] : []
  );

  const [types, setTypes] = useState<string[]>(props.filters.type ? [props.filters.type] : []);
  const [subTypes, setSubTypes] = useState<string[]>(
    props.filters.subType ? [props.filters.subType] : []
  );
  const [superTypes, setSuperTypes] = useState<string[]>(
    props.filters.superType ? [props.filters.superType] : []
  );

  async function handleSubmit() {
    setSearchCount(searchCount + 1);
    if (searchCount + 1 === 2) {
      await AdMobInterstitial.setAdUnitID(INTERSETIAL_AD);
      try {
        await AdMobInterstitial.requestAdAsync();
        await AdMobInterstitial.showAdAsync();
        AdMobInterstitial.addEventListener("interstitialDidClose", () => {
          setSearchCount(0);
        });
      } catch (error) {
        console.error(error);
      }
    }
    const colorsArray = getColors();
    const colors = colorsArray.join(",");
    const filterSets = sets.join(",");
    const filterRarity = raritys.length ? raritys[0] : "";
    const filterType = types.length ? types[0] : "";
    const filterSubType = subTypes.length ? subTypes[0] : "";
    const filterSuperType = superTypes.length ? superTypes[0] : "";
    setFilter({
      name,
      colors,
      matchAllColors,
      sets: filterSets,
      rarity: filterRarity,
      type: filterType,
      subType: filterSubType,
      superType: filterSuperType,
      cmc: manaCost,
      cmcCondition,
    });
    navigation.navigate("Home");
  }

  function getColors() {
    //API IDS
    const filterColors: string[] = [];
    if (whiteCheck) {
      filterColors.push("1");
    }
    if (blueCheck) {
      filterColors.push("2");
    }
    if (blackCheck) {
      filterColors.push("3");
    }
    if (redCheck) {
      filterColors.push("4");
    }
    if (greenCheck) {
      filterColors.push("5");
    }
    if (colorlessCheck) {
      filterColors.push("6");
    }
    return filterColors;
  }

  function handleManaCost(text: string) {
    const clearManaCost = text.replace(/[^0-9]/g, "");
    setManaCost(clearManaCost);
  }

  return (
    <Container>
      <Header style={{ backgroundColor: "#cf912c" }} androidStatusBarColor="#cf912c">
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Filters</Title>
        </Body>
        <Right>
          <Button onPress={handleSubmit} style={{ backgroundColor: "#FFF" }}>
            <Text style={{ color: "#cf912c" }}>SEARCH!</Text>
          </Button>
        </Right>
      </Header>
      <Content padder>
        <Form>
          <Item stackedLabel>
            <Label>Name</Label>
            <Input
              value={name}
              onChangeText={(text: string) => setName(text)}
              placeholder="Name..."
            />
          </Item>
          <Item style={{ ...style.clearItem, flexWrap: "wrap" }}>
            <Label>Colors: </Label>
            <CheckBoxManaSimbol color="W" initialValue={whiteCheck} changeValue={setWhiteCheck} />
            <CheckBoxManaSimbol color="U" initialValue={blueCheck} changeValue={setBlueCheck} />
            <CheckBoxManaSimbol color="B" initialValue={blackCheck} changeValue={setBlackCheck} />
            <CheckBoxManaSimbol color="R" initialValue={redCheck} changeValue={setRedCheck} />
            <CheckBoxManaSimbol color="G" initialValue={greenCheck} changeValue={setGreenCheck} />
            <CheckBoxManaSimbol
              color="C"
              initialValue={colorlessCheck}
              changeValue={setColorlessCheck}
            />
          </Item>
          <ListItem
            style={{ borderColor: "transparent" }}
            onPress={() => setMatchAllColors(!matchAllColors)}
          >
            <CheckBox
              color="#cf912c"
              checked={matchAllColors}
              onPress={() => setMatchAllColors(!matchAllColors)}
            />
            <Text style={{ marginLeft: 20 }}>Match All Colors</Text>
          </ListItem>
          <View style={{ flex: 1, flexDirection: "row", marginLeft: 15 }}>
            <Item stackedLabel style={{ width: "25%" }}>
              <Label>Mana Cost</Label>
              <Input
                keyboardType="number-pad"
                onChangeText={(text) => handleManaCost(text)}
                value={manaCost}
                maxLength={2}
                placeholder="Cost..."
              />
            </Item>
            <Item
              style={{
                borderColor: "transparent",
                flex: 1,
                paddingTop: 30,
                marginLeft: 20,
              }}
              onPress={() =>
                setCmcCondition(cmcCondition !== "greaterThan" ? "greaterThan" : "equal")
              }
            >
              <Label>Or More</Label>
              <Radio
                selected={cmcCondition === "greaterThan"}
                onPress={() =>
                  setCmcCondition(cmcCondition !== "greaterThan" ? "greaterThan" : "equal")
                }
                color="#cf912c"
                selectedColor="#cf912c"
              />
            </Item>
            <Item
              style={{ borderColor: "transparent", marginTop: 30, flex: 1 }}
              onPress={() => setCmcCondition(cmcCondition !== "lessThan" ? "lessThan" : "equal")}
            >
              <Label>Or Less</Label>
              <Radio
                selected={cmcCondition === "lessThan"}
                onPress={() => setCmcCondition(cmcCondition !== "lessThan" ? "lessThan" : "equal")}
                color="#cf912c"
                selectedColor="#cf912c"
              />
            </Item>
          </View>
          <Item style={style.clearItem}>
            <Label>Rarity: </Label>
            <RaritysSelect changeValue={setRaritys} initialValue={raritys} />
          </Item>
          <Item style={style.clearItem}>
            <Label>Sets: </Label>
            <SetsSelect changeValue={setSets} initialValue={sets} />
          </Item>
          <Item style={style.clearItem}>
            <Label>Type: </Label>
            <TypesSelect changeValue={setTypes} initialValue={types} />
          </Item>
          <Item style={style.clearItem}>
            <Label>Sub Type: </Label>
            <SubTypesSelect changeValue={setSubTypes} initialValue={subTypes} />
          </Item>
          <Item style={style.clearItem}>
            <Label>Super Type: </Label>
            <SuperTypesSelect changeValue={setSuperTypes} initialValue={superTypes} />
          </Item>
          <Button
            block
            style={{ marginTop: 20, backgroundColor: "#cf912c" }}
            onPress={handleSubmit}
          >
            <Text>Search!</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  filters: state.filters.data,
  searchCount: state.filters.searchCount,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(FilterActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FiltersForm);
