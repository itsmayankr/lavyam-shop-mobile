import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  SectionList,
  Animated,
} from "react-native";
import { Value } from "react-native-reanimated";
//Color
import Colors from "../../utils/Colors";
//Redux
import { connect, useDispatch, useSelector } from "react-redux";
//Components
import Snackbar from "../../components/Notification/Snackbar";
import { Header, ModalComp } from "./components";

import HorizontalItem from "../ProductScreen/components/HorizontalItem";
import { getProducts } from "../../redux/actions/productsAction";

import { getCart } from "../../redux/actions/cartScreenAction";

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);

const DetailScreen = (props) => {
  const scrollY = new Animated.Value(0);
  const user = useSelector((state) => "Rohan");
  const { item } = props.route.params;

  const [message, setMessage] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [color, setColor] = useState(Colors.lighter_green);
  //color
  const type = item.color;
  const [modalVisible, setModalVisible] = useState(false);
  //Favorite
  const FavoriteProducts = useSelector((state) =>
    state.shops.shops.shop.some((product) => product._id === item._id)
  );
  const products = useSelector((state) => state.products.products.products);
  const cart = useSelector((state) => state.cartScreen.cart);

  const dispatch = useDispatch();

  const DATA = [];

  DATA.push({ title: "Products", data: products });

  useEffect(() => {
    // const checkColor = async () => {
    //   const getColor = await colorCheck(type);
    //   setColor(getColor);
    // };
    // checkColor();
    props.getProducts(null, null, item._id);
    dispatch(getCart());
  }, [item]);

  return (
    <View style={styles.container}>
      {showSnackbar ? (
        <Snackbar checkVisible={showSnackbar} message={message} />
      ) : (
        <View />
      )}
      <Header navigation={props.navigation} scrollY={scrollY} item={item} />
      {/* <Portal>
   
      </Portal> */}
      {/* <Animated.ScrollView
        scrollEventThrottle={1}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      > */}
      {/* <Comments /> */}
      {/* </Animated.ScrollView> */}
      {/* <DetailBody item={item} color={color} /> */}
      {/* <ActionButton
        item={item}
        FavoriteProducts={FavoriteProducts}
        setShowSnackbar={setShowSnackbar}
        setModalVisible={setModalVisible}
        setMessage={setMessage}
        user={user}
        color={color}
      /> */}
      {/* {products &&
        products.map((product) => (
          <HorizontalItem
            key={product._id}
            item={product}
            navigation={props.navigation}
          />
        ))} */}
      {products && (
        <AnimatedSectionList
          sections={DATA} // REQUIRED: SECTIONLIST DATA
          keyExtractor={(item) => item._id}
          // ref={sectionListRef}
          // renderSectionHeader={({ section: { title } }) => (
          //   <View style={styles.header}>
          //     <CustomText style={styles.title}>{title}</CustomText>
          //   </View>
          // )}
          renderItem={({ item }) => (
            <HorizontalItem
              item={item}
              cartData={cart?.data}
              navigation={props.navigation}
            />
          )}
          stickySectionHeadersEnabled={false}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
            // { listener: HandleScrollY, useNativeDriver: false }
          )}
          contentContainerStyle={{ marginTop: 90, paddingBottom: 100 }}
        />
      )}
      <ModalComp
        item={item}
        color={color}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        navigation={props.navigation}
      />
    </View>
  );
};

export default connect(null, { getProducts })(DetailScreen);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingBottom: 20 },
});
