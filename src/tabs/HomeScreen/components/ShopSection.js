import React from "react";
import { View, StyleSheet, FlatList, Image, Text } from "react-native";
import { ShopList } from "./ShopList";
import CustomText from "../../../components/UI/CustomText";
import Colors from "../../../utils/Colors";
//PropTypes check
import PropTypes from "prop-types";
import image from "../../../assets/Images/noData.png";
export const ShopSection = (props) => {
  const { data, navigation } = props;
  return (
    <View style={[styles.shop]}>
      {/* <Image style={styles.background} source={bg} blurRadius={10} /> */}
      <View style={styles.titleHeader}>
        <CustomText style={styles.title}>Shops</CustomText>
      </View>
      <View style={styles.shopList}>
        {data.totalCount > 0 ? (
          <FlatList
            data={data?.shop}
            keyExtractor={(item) => item._id}
            numColumns={2}
            columnWrapperStyle={styles.list}
            renderItem={({ item }) => {
              return (
                <ShopList key={item._id} item={item} navigation={navigation} />
              );
            }}
          />
        ) : (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image
              style={{ width: 150, height: 150 }}
              source={image}
              resizeMode={"cover"}
            />
            <Text style={{ color: Colors.light_green }}>No shops found!</Text>
          </View>
        )}
      </View>
    </View>
  );
};

ShopSection.propTypes = {
  data: PropTypes.array.isRequired,
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  shop: {
    // height: 518,
    marginHorizontal: 5,
    marginVertical: 5,
    paddingVertical: 15,
    borderRadius: 5,
    position: "relative",
    // overflow: "hidden",
  },
  background: {
    position: "absolute",
    resizeMode: "stretch",
    borderRadius: 5,
    height: 800,
    width: "100%",
    bottom: 0,
    top: 50,
  },
  titleHeader: {
    marginHorizontal: 10,
    marginBottom: 5,
    position: "absolute",
    top: 10,
  },
  title: {
    fontSize: 18,
    color: Colors.light_green,
    fontWeight: "500",
  },
  list: {
    justifyContent: "space-between",
  },
  shopList: {
    width: "100%",
    marginTop: 10,
    paddingHorizontal: 15,
    top: 20,
  },
  seeMore: {
    // backgroundColor: "rgba(255, 255, 255, 0.9)",
    width: "100%",
    height: 45,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  seeMoreText: {
    fontSize: 14,
    color: Colors.lighter_green,
  },
});
