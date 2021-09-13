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
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/actions/cartScreenAction";
import { Button } from "react-native-paper";

const HorizontalItem = ({ item, cartData, navigation }) => {
  const productInCart = cartData?.items?.find(
    (ele) => ele?.productId?._id == item._id
  );

  const dispatch = useDispatch();
  const handleAddToCart = (productId) => {
    console.log("pressed");
    const data = {
      productId,
      quantity: 1,
    };
    dispatch(addToCart(data));
  };
  console.log(item, "itemitemitemitem");
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Image
          style={{
            width: "100%",
            height: 90,
            resizeMode: "stretch",
            borderRadius: 5,
          }}
          source={{ uri: item?.image?.Location }}
        />
      </View>
      <View style={styles.right}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <CustomText style={styles.title}>{item.productName}</CustomText>
        </View>
        {item.offerPrice ? (
          <View style={{ flex: 1, flexDirection: "row" }}>
            <CustomText
              style={{
                // style,
                color: Colors.grey,
                textDecorationLine: "line-through",
              }}
            >
              {`₹${item.price}`}
            </CustomText>
            <Text> - </Text>
            <NumberFormat price={item.offerPrice.toString()} />
          </View>
        ) : (
          <View>
            <NumberFormat price={item.price.toString()} />
          </View>
        )}
        {productInCart ? (
          <View style={styles.box}>
            <Text>Added in cart</Text>
          </View>
        ) : (
          <View style={styles.box}>
            <View>
              <Button
                style={styles.butonStyle}
                onPress={() => handleAddToCart(item._id)}
              >
                Add to Cart
              </Button>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

HorizontalItem.propTypes = {
  item: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    height: 110,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light_grey,
    flexDirection: "row",
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  left: {
    width: "35%",
    height: "100%",
    alignItems: "center",
    borderRadius: 5,
  },
  right: {
    width: "65%",
    paddingLeft: 15,
    height: 90,
    // overflow: "hidden",
  },
  title: {
    fontSize: 14,
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
  butonStyle: {
    fontSize: 12,
    // width: 50,
    color: Colors.light_green,
  },
});

export default HorizontalItem;
