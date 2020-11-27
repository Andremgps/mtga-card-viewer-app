import React, { useEffect, useState } from "react";
import { Spinner } from "native-base";
import Select2 from "react-native-select-two";
import api from "../../services/api";

interface Props {
  initialValue: string[];
  changeValue(value: string[]): void;
}

interface SelectOption {
  id: string;
  name: string;
  checked: boolean;
}

export const TypesSelect: React.FC<Props> = ({ initialValue, changeValue }) => {
  const [typesItems, setTypesItems] = useState<SelectOption[]>([]);
  const [typesLoading, setTypesLoading] = useState(false);

  useEffect(() => {
    setTypesLoading(true);
    api.get("type").then((response) => {
      setTypesLoading(false);
      const rawTypes = response.data;
      const formatedTypes: SelectOption[] = rawTypes.map((rawType) => {
        return {
          id: rawType.name,
          name: rawType.name,
          checked: initialValue[0] === rawType.name,
        } as SelectOption;
      });
      setTypesItems(formatedTypes);
    });
  }, []);

  return (
    <>
      {typesLoading ? (
        <Spinner color="#cf912c" />
      ) : (
        <Select2
          isSelectSingle={true}
          data={typesItems}
          onSelect={changeValue}
          onRemoveItem={changeValue}
          style={{ flex: 1 }}
          title="Choose type"
          popupTitle="Search for a type or choose from the list"
          colorTheme="#cf912c"
          cancelButtonText="Cancel"
          selectButtonText="Choose"
          searchPlaceHolderText="Search here..."
        />
      )}
    </>
  );
};
