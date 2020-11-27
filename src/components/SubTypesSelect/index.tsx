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

export const SubTypesSelect: React.FC<Props> = ({ initialValue, changeValue }) => {
  const [subTypesItems, setSubTypesItems] = useState<SelectOption[]>([]);
  const [subTypesLoading, setSubTypesLoading] = useState(false);

  useEffect(() => {
    setSubTypesLoading(true);
    api.get("sub_type").then((response) => {
      setSubTypesLoading(false);
      const rawSubTypes = response.data;
      const formatedSubTypes: SelectOption[] = rawSubTypes.map((rawSubType) => {
        return {
          id: rawSubType.name,
          name: rawSubType.name,
          checked: initialValue[0] === rawSubType.name,
        } as SelectOption;
      });
      setSubTypesItems(formatedSubTypes);
    });
  }, []);

  return (
    <>
      {subTypesLoading ? (
        <Spinner color="#cf912c" />
      ) : (
        <Select2
          isSelectSingle={true}
          data={subTypesItems}
          onSelect={changeValue}
          onRemoveItem={changeValue}
          style={{ flex: 1 }}
          title="Choose sub type"
          popupTitle="Search for a sub type or choose from the list"
          colorTheme="#cf912c"
          cancelButtonText="Cancel"
          selectButtonText="Choose"
          searchPlaceHolderText="Search here..."
        />
      )}
    </>
  );
};
