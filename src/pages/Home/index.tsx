import React, { useEffect, useState } from "react";
import { Content, Container, Spinner, Icon } from "native-base";
import { CardSimple } from "../../components/CardSimple";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { CardList } from "../../store/ducks/cards/types";
import * as CardsActions from "../../store/ducks/cards/actions";
import { ApplicationState } from "../../store";
import { AxiosRequestConfig } from "axios";
import { FlatList, ImageURISource } from "react-native";
import SearchBar from "../../components/SearchBar";
import { Filter } from "../../store/ducks/filters/types";
import * as FilterActions from "../../store/ducks/filters/actions";
import style from "./style";
import ActionButton from "react-native-action-button";
import { useNavigation } from "@react-navigation/native";
import ImageView from "react-native-image-viewing";

interface StateProps {
  cards: CardList;
  loading: boolean;
  filters: Filter;
}

interface DispatchProps {
  loadRequest(options?: AxiosRequestConfig): void;
  loadMoreRequest(options?: AxiosRequestConfig): void;
  clearFilter(): void;
}

type Props = StateProps & DispatchProps;

const Home: React.FC<Props> = (props) => {
  const { cards, loadRequest, clearFilter } = props;
  const navigation = useNavigation();

  const [images, setImages] = useState<ImageURISource[]>([]);
  const [fullImageVisible, setFullImageVisible] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    loadRequest();
  }, []);

  useEffect(() => {
    loadRequest({ params: props.filters });
  }, [props.filters]);

  useEffect(() => {
    const imagesViewer = props.cards.data.map((card) => ({
      uri: card.images[0].image_uri,
    }));
    setImages(imagesViewer);
  }, [props.cards.data]);

  function handleLoadMore() {
    const { hasMore, page } = props.cards;
    if (hasMore) {
      props.loadMoreRequest({ params: { ...props.filters, page: page + 1 } });
    }
  }

  function handleEraseFilter() {
    clearFilter();
    loadRequest();
  }

  function handleSearchPress() {
    navigation.navigate("FiltersForm");
  }

  function handleImageClick(imageUri: string) {
    const newImageIndex = images.findIndex((image) => image.uri === imageUri);
    setImageIndex(newImageIndex);
    setFullImageVisible(true);
  }

  function handleImageIndexChange(imageIndex: number) {
    if (imageIndex === props.cards.data.length - 2) {
      handleLoadMore();
    }
  }

  return (
    <>
      <Container>
        <SearchBar />
        <Content padder contentContainerStyle={{ flex: 1 }}>
          <FlatList
            data={cards.data}
            renderItem={({ item }) => <CardSimple card={item} cardImageClick={handleImageClick} />}
            keyExtractor={(item) => item.id.toString()}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
          />
          {props.loading && <Spinner color="#3F51B5" />}
          <ActionButton
            buttonColor="#3F51B5"
            degrees={0}
            renderIcon={(active: boolean) => {
              return active ? (
                <Icon type="Feather" name="x" />
              ) : (
                <Icon type="Feather" name="filter" />
              );
            }}
            useNativeFeedback={false}
          >
            <ActionButton.Item
              buttonColor="#3F51B5"
              title="Clear filters"
              useNativeFeedback={false}
              size={40}
              onPress={handleEraseFilter}
            >
              <Icon type="FontAwesome" name="eraser" style={style.subIcon} />
            </ActionButton.Item>
            <ActionButton.Item
              buttonColor="#3F51B5"
              title="Search filters"
              useNativeFeedback={false}
              size={40}
              onPress={handleSearchPress}
            >
              <Icon type="FontAwesome" name="search" style={style.subIcon} />
            </ActionButton.Item>
          </ActionButton>
        </Content>
      </Container>
      <ImageView
        images={images}
        visible={fullImageVisible}
        imageIndex={imageIndex}
        onImageIndexChange={handleImageIndexChange}
        onRequestClose={() => setFullImageVisible(false)}
      />
    </>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  cards: state.cards.cards,
  loading: state.cards.loading,
  filters: state.filters.data,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ ...CardsActions, ...FilterActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
