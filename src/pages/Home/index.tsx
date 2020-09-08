import React, { useEffect } from "react";
import { Content, Container, Spinner } from "native-base";
import { CardSimple } from "../../components/CardSimple";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { CardList } from "../../store/ducks/cards/types";
import * as CardsActions from "../../store/ducks/cards/actions";
import { ApplicationState } from "../../store";
import { AxiosRequestConfig } from "axios";
import { FlatList } from "react-native";

interface StateProps {
  cards: CardList;
  loading: boolean;
}

interface DispatchProps {
  loadRequest(options?: AxiosRequestConfig): void;
  loadMoreRequest(options?: AxiosRequestConfig): void;
}

type Props = StateProps & DispatchProps;

const Home: React.FC<Props> = (props) => {
  const { cards } = props;

  useEffect(() => {
    const { loadRequest } = props;
    loadRequest();
  }, []);

  function handleLoadMore() {
    const { hasMore, page } = props.cards;
    if (hasMore) {
      props.loadMoreRequest({ params: { page: page + 1 } });
    }
  }

  return (
    <Container style={{ backgroundColor: "#A2A2A1FF" }}>
      <Content padder contentContainerStyle={{ flex: 1 }}>
        <FlatList
          data={cards.data}
          renderItem={({ item }) => <CardSimple card={item} />}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
        />
        {props.loading && <Spinner color="blue" />}
      </Content>
    </Container>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  cards: state.cards.cards,
  loading: state.cards.loading,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(CardsActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
