import React from "react";
import { Image } from "react-native";
import { Text } from "native-base";
import ManaSimbols from "../../assets/images/mana-simbols";

interface FormatedManaSimbolsProps {
  manaCost: string;
}

export const FormatedManaSimbols: React.FC<FormatedManaSimbolsProps> = ({ manaCost }) => {
  //Cartas com layout split
  const splitedManaCost = manaCost.split(" // ");
  return (
    <>
      {splitedManaCost.map((manaCost, indexSplit) => {
        const simbolArray = manaCost
          .substring(1, manaCost.length - 1)
          .replace(/\//g, "")
          .split("}{");
        const simbolsComponent = simbolArray.map((simbol, indexSimbol) => (
          <Image
            key={indexSplit + indexSimbol}
            source={ManaSimbols[simbol]}
            style={{ width: 20, height: 20 }}
          />
        ));
        if (splitedManaCost.length > 1 && indexSplit == 0) {
          simbolsComponent.push(
            <Text key={"barras"} style={{ paddingLeft: 5, paddingRight: 5 }}>
              //
            </Text>
          );
        }
        return simbolsComponent;
      })}
    </>
  );
};
