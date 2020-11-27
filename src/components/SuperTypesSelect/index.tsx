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

export const SuperTypesSelect: React.FC<Props> = ({ initialValue, changeValue }) => {
  const [superTypesItems, setSuperTypesItems] = useState<SelectOption[]>([]);
  const [superTypesLoading, setSuperTypesLoading] = useState(false);

  useEffect(() => {
    setSuperTypesLoading(true);
    api.get("super_type").then((response) => {
      setSuperTypesLoading(false);
      const rawSuperTypes = response.data;
      const formatedSuperTypes: SelectOption[] = rawSuperTypes.map((rawSuperType) => {
        return {
          id: rawSuperType.name,
          name: rawSuperType.name,
          checked: initialValue[0] === rawSuperType.name,
        } as SelectOption;
      });
      setSuperTypesItems(formatedSuperTypes);
    });
  }, []);

  return (
    <>
      {superTypesLoading ? (
        <Spinner color="#cf912c" />
      ) : (
        <Select2
          isSelectSingle={true}
          data={superTypesItems}
          onSelect={changeValue}
          onRemoveItem={changeValue}
          style={{ flex: 1 }}
          title="Choose super type"
          popupTitle="Search for a super type or choose from the list"
          colorTheme="#cf912c"
          cancelButtonText="Cancel"
          selectButtonText="Choose"
          searchPlaceHolderText="Search here..."
        />
      )}
    </>
  );
};
