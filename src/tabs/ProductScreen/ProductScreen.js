import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
//redux
import { connect, useSelector } from "react-redux";
//Color
import Colors from "../../utils/Colors";
//Component
import ProductBody from "./components/ProductBody";
import { data } from "../../model/data";
import { getShops } from "../../redux/actions/shopAction";

const ProductScreen = (props) => {
  const shops = useSelector((state) => state.shops.shops);
  console.log(shops);

  useEffect(() => {
    props.getShops();
  }, []);

  const [productsFilter, setproductsFilter] = useState(shops);
  const searchFilterFunction = (text) => {
    const data =
      shops &&
      shops.shop.filter((shop) =>
        shop.shopName.toLowerCase().includes(text.toLowerCase())
      );
    setproductsFilter(data);
  };
  return (
    <View style={styles.container}>
      <ProductBody
        navigation={props.navigation}
        productsFilter={productsFilter}
        searchFilterFunction={searchFilterFunction}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

export default connect(null, { getShops })(ProductScreen);
