import React from "react";
import Select2 from "react-native-select-two";

interface Props {
  initialValue: string[];
  changeValue(value: string[]): void;
}

interface SelectOption {
  id: string;
  name: string;
  checked: boolean;
}

export const RaritysSelect: React.FC<Props> = ({ initialValue, changeValue }) => {
  const raritysMock: SelectOption[] = [
    { id: "common", name: "Common", checked: initialValue[0] === "common" },
    { id: "uncommon", name: "Uncommon", checked: initialValue[0] === "uncommon" },
    { id: "rare", name: "Rare", checked: initialValue[0] === "rare" },
    { id: "mythic", name: "Mythic", checked: initialValue[0] === "mythic" },
  ];

  return (
    <Select2
      isSelectSingle={true}
      data={raritysMock}
      onSelect={changeValue}
      onRemoveItem={changeValue}
      style={{ flex: 1 }}
      title="Choose rarity"
      popupTitle="Search for a rarity type or choose from the list"
      colorTheme="#3F51B5"
      cancelButtonText="Cancel"
      selectButtonText="Choose"
      searchPlaceHolderText="Search here..."
    />
  );
};
