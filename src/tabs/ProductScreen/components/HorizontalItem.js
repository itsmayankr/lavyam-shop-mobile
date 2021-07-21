import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
//Color
import Colors from "../../../utils/Colors";
import { BlurView } from "expo-blur";
//icon
import { AntDesign } from "@expo/vector-icons";
//Text
import CustomText from "../../../components/UI/CustomText";
//NumberFormat
import NumberFormat from "../../../components/UI/NumberFormat";
import { MaterialCommunityIcons } from "@expo/vector-icons";
//PropTypes check
import PropTypes from "prop-types";

const HorizontalItem = ({ item, navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
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
          source={{ uri: item.image.Location }}
        />
      </View>
      <View style={styles.right}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <CustomText style={styles.title}>{item.productName}</CustomText>
          {/* <View>
            <TouchableOpacity >
              <MaterialCommunityIcons name="close" size={20} color="#000" />
            </TouchableOpacity>
          </View> */}
        </View>
        {/* <CustomText style={{ color: Colors.grey, fontSize: 12 }}>
          Cung cấp bởi Cát Tường
        </CustomText> */}
        <NumberFormat price={item.price.toString()} />
        <View style={styles.box}>
          <TouchableOpacity style={styles.boxMin}>
            <MaterialCommunityIcons name="minus" size={16} />
          </TouchableOpacity>
          <View>
            <CustomText style={styles.boxText}>{0}</CustomText>
          </View>
          <TouchableOpacity style={styles.boxMin}>
            <MaterialCommunityIcons name="plus" size={16} />
          </TouchableOpacity>
        </View>
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
    fontSize: 12,
  },
});

export default HorizontalItem;
