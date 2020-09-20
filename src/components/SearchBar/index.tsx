import React, { useEffect, useState } from "react";
import { Dispatch, bindActionCreators } from "redux";
import { Header, Input, Item, Icon } from "native-base";
import { ApplicationState } from "../../store";
import * as FilterActions from "../../store/ducks/filters/actions";
import { connect } from "react-redux";
import { Filter } from "../../store/ducks/filters/types";
import { AxiosRequestConfig } from "axios";

interface StateProps {
  filters: Filter;
}

interface DispatchProps {
  setFilter(filters: Filter): void;
  loadRequest(options?: AxiosRequestConfig): void;
}

type Props = StateProps & DispatchProps;

const SearchBar: React.FC<Props> = (props) => {
  let searchTimeout = 0;

  const [name, setName] = useState(props.filters.name);
  useEffect(() => setName(props.filters.name), [props.filters.name]);

  function handleSearchChange(searchText: string) {
    const { setFilter, filters } = props;
    setName(searchText);
    const nameFilter = {
      name: searchText,
    };
    if (searchTimeout) clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      setFilter({ ...filters, ...nameFilter });
    }, 200);
  }

  return (
    <Header searchBar>
      <Item>
        <Icon name="search" />
        <Input
          placeholder="Search..."
          value={name}
          onChangeText={(searchText) => handleSearchChange(searchText)}
        />
      </Item>
    </Header>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  filters: state.filters.data,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(FilterActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
