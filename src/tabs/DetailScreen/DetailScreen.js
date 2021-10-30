import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  SectionList,
  Animated,
  SafeAreaView,
  StatusBar,
  FlatList,
} from "react-native";
import { Value } from "react-native-reanimated";
//Color
import Colors from "../../utils/Colors";
//Redux
import { connect, useDispatch, useSelector } from "react-redux";
//Components
import Snackbar from "../../components/Notification/Snackbar";
import { Header, ModalComp } from "./components";

import ProductList from "../ProductScreen/components/ProductList";
import { getProducts } from "../../redux/actions/productsAction";

import { getCart } from "../../redux/actions/cartScreenAction";
import { ScrollView } from "react-native-gesture-handler";

const DetailScreen = (props) => {
  const { item } = props.route.params;

  const products = useSelector((state) => state.products.products.products);
  const cart = useSelector((state) => state.cartScreen.cart);

  const dispatch = useDispatch();

  const DATA = [];

  DATA.push({ title: "Products", data: products });

  useEffect(() => {
    props.getProducts(null, null, item._id);
    dispatch(getCart());
  }, [item]);

  return (
    <View style={styles.container}>
      <Header shopName={item?.shopName} />
      {products && (
        <FlatList
          data={DATA}
          renderItem={({ item }) => (
            <ProductList
              item={item}
              cartData={cart?.data}
              navigation={props.navigation}
            />
          )}
          keyExtractor={(item) => item._id}
        />
      )}
    </View>
  );
};

export default connect(null, { getProducts })(DetailScreen);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingBottom: 20 },
});
