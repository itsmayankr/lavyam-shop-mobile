import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  Platform,
  Alert,
} from "react-native";
import { ToastAndroid } from "react-native";

//Color
import Colors from "../../../utils/Colors";

import CustomText from "../../../components/UI/CustomText";
//NumberFormat
import NumberFormat from "../../../components/UI/NumberFormat";
//PropTypes check
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../redux/actions/cartScreenAction";

import Slide from "../../HomeScreen/components/Slide";
import banners from "../../../db/Banners";

import { constant } from "../../../utils/constant";
import NoItemFound from "../../../auth/components/NoItemFound";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { getSellerByShopId } from "../../../redux/actions/shopAction";

const ProductList = ({ item, cartData, seller }) => {
  // console.log(item, "::::dfgdfgfdgfdgdfg::");
  const cartIsLoading = useSelector((state) => state.cartScreen);
  const navigation = useNavigation();
  // console.log({ item });
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(getSellerByShopId(item.data[0].sellerId));
  }, []);
  const handleAddToCart = async (productId) => {
    let access_token = await AsyncStorage.getItem("token");
    console.log({access_token})
    if(!access_token){
      ToastAndroid.showWithGravityAndOffset(
        "Please Login in order to add item to cart!",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        150
      );
      navigation.navigate("Login")
    }else {
      const data = {
      productId,
      quantity: 1,
    };
    dispatch(addToCart(data));
    }
  };


  const getToken = async () => {
    let access_token = await AsyncStorage.getItem("token");
    console.log({access_token});
    setToken(access_token)
  }

  const [token,setToken] = useState(null)

  useEffect( () => {
    getToken()
  },[])


  const handleCheckCart = (product_id) => {
    return cartData?.items?.find((cart) => cart.productId._id === product_id);
  };
  // console.log(item.data, "ASDASDASDS");
  return (
    <View>
      <View style={{ marginTop: 20 }}>
        <Slide
          imageUrl={seller?.thumbnailImage?.Location}
          localImage={constant.defaultBanner}
        />
      </View>
      {item.data?.length > 0 ? (
        item.data.map((item, i) => (
          <View key={item._id + i} style={styles.container}>
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
                {handleCheckCart(item._id) ? (
                  <View>
                    <TouchableOpacity style={[styles.btn, styles.btnAdded]}>
                      <CustomText style={styles.detailBtnAdded}>
                        Added
                      </CustomText>
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
                  <Text
                    style={{ color: "#d6d6d6", marginTop: 5, fontSize: 10 }}
                  >
                    No Image
                  </Text>
                </View>
              )}
            </View>
          </View>
        ))
      ) : (
        <NoItemFound name="Product" />
      )}
    </View>
  );
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
