import React, { useState } from "react";
import Checkbox from "react-native-modest-checkbox";
import { Image } from "react-native";
import ManaSimbols from "../../assets/images/mana-simbols";
import style from "./style";

interface Props {
  color: string;
  initialValue: boolean | undefined;
  changeValue(value: boolean): void;
}

export const CheckBoxManaSimbol: React.FC<Props> = ({ color, changeValue, initialValue }) => {
  const [value, setValue] = useState(initialValue);

  function handleChange() {
    setValue(!value);
    changeValue(!value);
  }

  return (
    <Checkbox
      checkedComponent={
        <Image
          source={ManaSimbols[color]}
          style={{
            ...style.manaSize,
            borderColor: "#cf912c",
            borderWidth: 5,
            borderRadius: 30,
          }}
        />
      }
      uncheckedComponent={<Image source={ManaSimbols[color]} style={style.manaSize} />}
      checked={value}
      onChange={handleChange}
      label=""
      containerStyle={{ ...style.manaSize, marginLeft: 10 }}
      noFeedback={true}
    />
  );
};
