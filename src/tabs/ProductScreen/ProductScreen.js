import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
//redux
import { connect, useSelector } from "react-redux";
//Color
import Colors from "../../utils/Colors";
//Component
import ProductBody from "./components/ProductBody";
import {
  getAllSeller,
  getSellerByShopId,
  getShops,
} from "../../redux/actions/shopAction";

const ProductScreen = (props) => {
  const shops = useSelector((state) => state.shops.shops);

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
  console.log(shops, "::::::::::::::::::::::");
  // props.getSellerByShopId(shops.shop._id);
  console.log({ productFiltred });
  return (
    <View style={styles.container}>
      <ProductBody
        navigation={props.navigation}
        productsFilter={productsFilter}
        searchFilterFunction={searchFilterFunction}
        shopId={shops._id}
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

export default connect(null, { getShops, getSellerByShopId, getAllSeller })(
  ProductScreen
);
