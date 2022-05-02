import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  Button,
  ToastAndroid,
} from "react-native";
//Color
import Colors from "../../utils/Colors";
import { BlurView } from "expo-blur";
//icon
import { AntDesign } from "@expo/vector-icons";
//Text
import CustomText from "../../components/UI/CustomText";
//NumberFormat
import NumberFormat from "../../components/UI/NumberFormat";
import { MaterialCommunityIcons } from "@expo/vector-icons";
//PropTypes check
import PropTypes from "prop-types";
import { addToCart } from "../../redux/actions/cartScreenAction";
import { useDispatch } from "react-redux";
import { constant } from "../../utils/constant";

const CartList = ({ item }) => {
  const dispatch = useDispatch();

  const handleAddItemToCart = (productId, quantity, item) => {
    const data = {
      productId,
      quantity,
    };
    if (item?.quantity < item?.productId?.quantity) {
      dispatch(addToCart(data));
    } else {
      showMessage({
        message: "Product maximum limit reached",
        type: "warning",
        icon: "warning",
        floating: true
      });
    }
  };

  const handleRemoveItemToCart = (productId, quantity) => {
    const data = {
      productId,
      quantity,
    };
    dispatch(addToCart(data));
  };

  return (
    <View>
      <View key={item._id} style={styles.container}>
        <View style={styles.left}>
          <View style={{ width: "100%" }}>
            <CustomText style={styles.title}>
              {item?.productId?.productName}
            </CustomText>
            <View>
              {item?.productId?.offer ? (
                <Text
                  style={{
                    fontSize: 10,
                    color: Colors.green,
                    marginBottom: 6,
                  }}
                >{`${item?.productId?.offer}% off`}</Text>
              ) : null}
            </View>
            {item?.productId?.offerPrice ? (
              <View
                style={{
                  width: "100%",
                  flex: 1,
                  flexDirection: "row",
                  // alignItems: "baseline",
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
                  {`₹${item?.productId?.price}`}
                </CustomText>
                <View style={{ flexDirection: "row", alignItems: "baseline" }}>
                  <NumberFormat price={item?.productId?.offerPrice} />
                  <CustomText
                    style={{
                      color: Colors.black,

                      fontSize: 8,
                      // paddingTop: 2,
                      width: 100,
                    }}
                  >
                    {`/${item.productId.unit}`}
                  </CustomText>
                </View>
              </View>
            ) : (
              <View>
                <NumberFormat price={item?.productId?.price?.toString()} />
              </View>
            )}
          </View>
          <View style={styles.right}>
            <View style={styles.box}>
              <TouchableOpacity
                hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
                onPress={() =>
                  handleRemoveItemToCart(
                    item?.productId?._id,
                    item?.quantity - 1,
                    item
                  )
                }
                style={styles.boxMin}
              >
                <View>
                  <MaterialCommunityIcons
                    name="minus"
                    size={16}
                    color={Colors.green}
                  />
                </View>
              </TouchableOpacity>
              <View style={{ margin: 5 }}>
                <CustomText style={styles.boxText}>{item?.quantity}</CustomText>
              </View>
              <TouchableOpacity
                style={styles.boxMin}
                hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
                onPress={() =>
                  handleAddItemToCart(item?.productId?._id, item?.quantity + 1, item)
                }
              >
                <View>
                  <MaterialCommunityIcons
                    name="plus"
                    size={16}
                    color={Colors.green}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={
            item?.productId?.image?.Location
              ? styles.right
              : [styles.right, styles.rightNoImage]
          }
        >
          {item?.productId?.image?.Location ? (
            <Image
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "stretch",
                borderRadius: 20,
              }}
              source={{
                uri: item?.productId?.image?.Location,
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
    </View>
  );
};

CartList.propTypes = {
  item: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginHorizontal: 10,
    minHeight: 110,
    borderBottomWidth: 1,
    borderBottomColor: "#ececec",
    flexDirection: "row",
    paddingVertical: 25,
    alignItems: "center",
    backgroundColor: "#fff",
    // paddingHorizontal: 8,
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
  },
  box: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // height: Platform.OS === "ios" ? 30 : 25,
    backgroundColor: Colors.light_grey,
    alignSelf: "flex-start",
    borderColor: Colors.green,
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginTop: 15,
  },
  boxMin: {
    width: "40%",
    alignItems: "center",
  },
  boxText: {
    fontSize: 12,
    color: Colors.light_green,
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
export default CartList;
