import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
//Color
import Colors from "../../utils/Colors";
//Text
import CustomText from "../../components/UI/CustomText";
//NumberFormat
import NumberFormat from "../../components/UI/NumberFormat";
//PropTypes check
import PropTypes from "prop-types";
import { Text } from "react-native-paper";
import Collapsible from "react-native-collapsible";

const HorizontalItem = ({ item }) => {
  const [showText, setShowText] = useState(false);
  console.log(JSON.stringify(item));
  const [lastItem] = item?.cart?.items.slice(-1);
  console.log(lastItem, "lastItem");

  const handleText = () => {
    setShowText(!showText);
  };

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1, alignItems: "flex-start" }}>
            <CustomText style={styles.boxText}>
              {item?.seller?.shopName}
            </CustomText>
          </View>
          <View style={{ flex: 1, alignItems: "flex-end", padding: 2 }}>
            {item?.Delivered ? (
              <CustomText style={styles.boxStatusText}>Delivered</CustomText>
            ) : (
              <Text style={styles.boxStatusText}>
                {item?.orderStatus[0].toUpperCase() +
                  item?.orderStatus.substring(1)}
              </Text>
            )}
          </View>
        </View>
        {/* <CustomText style={styles.boxSubText}>
            {item?.seller?.shopAddress?.address[0].toUpperCase() +
              item?.seller?.shopAddress?.address.substring(1)}
          </CustomText> */}
        <NumberFormat price={item?.cart.totalCost} />
        {/* <View style={styles.divider} /> */}
        <TouchableOpacity onPress={handleText}>
          <CustomText style={styles.boxDetails}>
            {!showText ? "More" : "Less"} details
          </CustomText>
        </TouchableOpacity>
        {showText ? (
          <View>
            {item.cart.items.map((product) => {
              return (
                <View>
                  {product?.productId.productName && (
                    <CustomText style={styles.boxSubText} key={product._id}>
                      {`${
                        product?.productId?.productName[0]?.toUpperCase() +
                        product?.productId?.productName?.substring(1)
                      } x ${product?.quantity}`}
                    </CustomText>
                  )}
                </View>
              );
            })}
          </View>
        ) : null}
      </View>
    </View>
  );
};

HorizontalItem.propTypes = {
  item: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    minHeight: 80,
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
  divider: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: Colors.light_grey,
    borderRadius: 5,
    marginTop: 5,
  },
  left: {
    width: "100%",
    height: "100%",
    alignItems: "flex-start",
    borderRadius: 5,
  },
  title: {
    fontSize: 14,
  },
  box: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: Platform.OS === "ios" ? 30 : 25,
    backgroundColor: Colors.light_grey,
    width: 90,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 5,
  },
  boxMin: {
    width: "30%",
    alignItems: "center",
  },
  boxText: {
    fontSize: 14,
    fontWeight: "700",
  },
  boxSubText: {
    fontSize: 12,
    fontWeight: "300",
    color: "#969698",
  },
  boxDetails: {
    fontSize: 12,
    fontWeight: "500",
    color: Colors.green,
    marginTop: 5,
  },
  boxItemText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#AAABB0",
  },
  boxStatusText: {
    fontSize: 12,
    fontWeight: "300",
    color: "#AAABB0",
  },
});

export default HorizontalItem;
