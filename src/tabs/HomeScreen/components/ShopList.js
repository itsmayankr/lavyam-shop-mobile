import React from "react";
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

export class ShopList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }
  render() {
    const { navigation, item } = this.props;
    const toDetail = () => {
      navigation.navigate("Detail", { item });
    };
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
            <Image
              source={{
                uri: "https://image.shutterstock.com/image-photo/healthy-food-clean-eating-selection-260nw-722718097.jpg",
              }}
              style={styles.image}
              onLoadStart={() => {
                this.setState({ loading: true });
              }}
              onLoadEnd={() => this.setState({ loading: false })}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.center}>
          <CustomText style={styles.name}>{item.shopName}</CustomText>
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
  }
}

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
    borderRadius: 8,
    aspectRatio: 16 / 9,
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
