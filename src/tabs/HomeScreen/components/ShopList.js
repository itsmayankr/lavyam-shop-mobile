import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
//Icon
import { AntDesign } from "@expo/vector-icons";
//Colors
import Colors from "../../../utils/Colors";
//Text
import CustomText from "../../../components/UI/CustomText";

//PropTypes check
import PropTypes from "prop-types";
import { getSellerByShopId } from "../../../redux/actions/shopAction";
import { useDispatch, useSelector } from "react-redux";

export const ShopList = (props) => {
  const { navigation, item, image } = props;
  const [latestData, setLatestData] = useState([]);
  const seller = useSelector((state) => state.shops.seller);
  const sellersAll = useSelector((state) => state.shops.sellersAll.sellers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSellerByShopId(item._id));
  }, [item]);

  const toDetail = () => {
    navigation.navigate("Detail", { item });
  };

  // console.log(
  //   sellersAll.find((ele) => ele.shopId === item._id),
  //   ":::2"
  // );

  return (
    <View style={[styles.container, styles.shadow]}>
      {/* <View style={styles.container}> */}
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={toDetail}>
          {sellersAll &&
            sellersAll.find((ele) => ele.shopId === item._id)?.thumbnailImage
              ?.Location ? (
            <Image
              source={{
                uri: sellersAll.find((ele) => ele.shopId === item._id)
                  ?.thumbnailImage?.Location,
              }}
              style={styles.image}
            />
          ) : (
            <View
              style={{
                padding: 15,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image source={image} style={styles.defaultImage} />
            </View>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.center}>
        <CustomText style={styles.name}>
          {item?.shopName?.slice(0, 20)}
          {item?.shopName?.length > 20 && "..."}
        </CustomText>
      </View>
      <View style={styles.info}>
        <View style={styles.rate}>
          {/* <AntDesign name="star" color="#fed922" size={15} /> */}
          <Text style={styles.score}>Category: {item.categoryName}</Text>
        </View>
        {/* <NumberFormat price={item.price} /> */}
      </View>
      <View style={{ marginHorizontal: 5 }}>
        <TouchableOpacity style={styles.btn} onPress={toDetail}>
          <CustomText style={styles.detailBtn}>Select Shop</CustomText>
        </TouchableOpacity>
      </View>
    </View>
    // </View>
  );
};

ShopList.propTypes = {
  item: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    // width: "100%",
    height: 190,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    // backgroundColor: "yellow",
    // marginBottom: 15,
    borderRadius: 8,
    //asd
    width: "48%",

    marginBottom: 15,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,
    elevation: 4,
  },
  image: {
    width: "100%",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    aspectRatio: 16 / 9,
  },
  defaultImage: {
    resizeMode: "contain",
    height: 80,
    width: "100%",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    aspectRatio: 16 / 9,
    opacity: 0.6,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    marginTop: 3,
    color: Colors.lighter_green,
    textAlign: "center",
    fontWeight: "500",
    textTransform: "capitalize",
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    marginHorizontal: 5,
    justifyContent: "space-between",
  },
  rate: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingBottom: 2,
  },
  score: {
    fontSize: 12,
    marginLeft: 5,
    color: Colors.text,
    textTransform: "capitalize",
  },
  btn: {
    width: "100%",
    height: 35,
    flexDirection: "row",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.lighter_green,
  },
  detailBtn: {
    color: Colors.lighter_green,
    marginRight: 5,
  },
});
