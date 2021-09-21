import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  Platform,
} from "react-native";
//Color
import Colors from "../../../utils/Colors";

import CustomText from "../../../components/UI/CustomText";
//NumberFormat
import NumberFormat from "../../../components/UI/NumberFormat";
import { MaterialCommunityIcons } from "@expo/vector-icons";
//PropTypes check
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../redux/actions/cartScreenAction";
import { Button } from "react-native-paper";
import { Carousel } from "../../HomeScreen/components";
import Slide from "../../HomeScreen/components/Slide";
import banners from "../../../db/Banners";

import { constant } from "../../../utils/constant";

const ProductList = ({ item, cartData, navigation }) => {
  console.log(item, "::::dfgdfgfdgfdgdfg::");
  const cartIsLoading = useSelector((state) => state.cartScreen);
  const productInCart = cartData?.items?.find(
    (ele) => ele?.productId?._id == item.data._id
  );
  console.log(cartIsLoading, "cartIsLoading");
  const dispatch = useDispatch();
  const handleAddToCart = (productId) => {
    const data = {
      productId,
      quantity: 1,
    };
    dispatch(addToCart(data));
  };
  console.log(constant.defaultImage, "defaultImage");
  return (
    <View>
      <View style={{ marginTop: 20 }}>
        <Slide imageUrl={banners[0].imageUrl} />
      </View>
      {item.data.map((item) => (
        <View key={item._id} style={styles.container}>
          <View style={styles.left}>
            <View style={{ width: "100%" }}>
              {/* <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              ></View> */}
              <CustomText style={styles.title}>{item.productName}</CustomText>
              <View>
                {item.offerPrice ? (
                  <Text
                    style={{
                      fontSize: 10,
                      color: Colors.green,
                      marginBottom: 6,
                    }}
                  >{`${item.offer}% off`}</Text>
                ) : null}
              </View>
              {item.offerPrice ? (
                <View
                  style={{
                    width: "100%",
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "baseline",
                  }}
                >
                  <CustomText
                    style={{
                      // style,
                      color: Colors.grey,
                      textDecorationLine: "line-through",
                      marginRight: 5,
                    }}
                  >
                    {`₹${item.price}`}
                  </CustomText>
                  <NumberFormat price={item?.offerPrice?.toString()} />
                  <CustomText
                    style={{
                      // style,
                      color: Colors.black,
                      fontSize: 8,
                      paddingBottom: 2,
                      width: 500,
                    }}
                  >
                    {`/${item.unit}`}
                  </CustomText>
                </View>
              ) : (
                <View>
                  <NumberFormat price={item?.price?.toString()} />
                </View>
              )}
              {productInCart ? (
                <View>
                  <TouchableOpacity style={[styles.btn, styles.btnAdded]}>
                    <CustomText style={styles.detailBtnAdded}>Added</CustomText>
                  </TouchableOpacity>
                </View>
              ) : (
                <View>
                  <TouchableOpacity
                    onPress={() => handleAddToCart(item._id)}
                    style={[styles.btn, styles.notAdded]}
                  >
                    <CustomText style={styles.detailBtn}>Add</CustomText>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
          <View
            style={
              item?.image?.Location
                ? styles.right
                : [styles.right, styles.rightNoImage]
            }
          >
            {item?.image?.Location ? (
              <Image
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "stretch",
                  borderRadius: 20,
                }}
                source={{
                  uri: item?.image?.Location,
                }}
              />
            ) : (
              <View
                style={{
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{
                    // width: 50,
                    height: 45,
                    opacity: 0.4,
                    resizeMode: "contain",
                  }}
                  source={constant.defaultImage}
                />
                <Text style={{ color: "#d6d6d6", marginTop: 5, fontSize: 10 }}>
                  No Image
                </Text>
              </View>
            )}
          </View>
        </View>
      ))}
    </View>
  );
};

ProductList.propTypes = {
  item: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    minHeight: 110,
    borderBottomWidth: 1,
    borderBottomColor: "#ececec",
    flexDirection: "row",
    paddingVertical: 25,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  left: {
    width: "65%",
    height: "100%",
    alignItems: "flex-start",
  },
  right: {
    width: "35%",
    // paddingLeft: 15,
    height: "100%",
  },
  rightNoImage: {
    borderWidth: 1,
    borderColor: "#ececec",
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    textTransform: "capitalize",
    marginBottom: 10,
  },
  box: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // height: Platform.OS === "ios" ? 30 : 25,
    backgroundColor: Colors.light_grey,
    alignSelf: "flex-start",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 5,
  },
  boxMin: {
    width: "30%",
    alignItems: "center",
  },
  boxText: {
    fontSize: 12,
  },
  btn: {
    height: 30,
    marginTop: 10,
    width: "50%",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.lighter_green,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  detailBtn: {
    color: Colors.lighter_green,
    // marginRight: 5,
    textAlign: "center",
  },
  btnAdded: {
    backgroundColor: Colors.green,
  },
  notAdded: {
    backgroundColor: Colors.white,
  },
  detailBtnAdded: {
    color: Colors.white,
    textAlign: "center",
  },
});

export default ProductList;
