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

export const SetsSelect: React.FC<Props> = ({ initialValue, changeValue }) => {
  const [setsItems, setSetsItems] = useState<SelectOption[]>([]);
  const [setsLoading, setSetsLoading] = useState(false);

  useEffect(() => {
    setSetsLoading(true);
    api.get("set").then((response) => {
      setSetsLoading(false);
      const rawSets = response.data;
      const formatedSets: SelectOption[] = rawSets.map((rawSet) => {
        return {
          id: rawSet.id,
          name: rawSet.set_name,
          checked: initialValue.includes(rawSet.id.toString()),
        } as SelectOption;
      });
      setSetsItems(formatedSets);
    });
  }, []);

  return (
    <>
      {setsLoading ? (
        <Spinner color="#3F51B5" />
      ) : (
        <Select2
          data={setsItems}
          onSelect={changeValue}
          onRemoveItem={changeValue}
          style={{ flex: 1 }}
          title="Choose sets"
          popupTitle="Search for a set or choose from the list"
          colorTheme="#3F51B5"
          cancelButtonText="Cancel"
          selectButtonText="Choose"
          searchPlaceHolderText="Search here..."
        />
      )}
    </>
  );
};
