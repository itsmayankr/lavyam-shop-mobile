import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Platform,
  Button,
  AsyncStorage,
  ScrollView,
  Alert,
} from "react-native";
import { Portal } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import CustomHeader from "../../CustomHeader";
import { getCart } from "../../redux/actions/cartScreenAction";
import { orderNow } from "../../redux/actions/orderAction";
import SnackBar from "../../redux/actions/snackBar";
import { FloatButton } from "../HomeScreen/components";
import { Header } from "../../components/Header";
import CartList from "./CartList";
import Colors from "../../utils/Colors";
import CustomText from "../../components/UI/CustomText";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native-gesture-handler";
import RedirectLogin from "../../auth/components/RedirectLogin";
import NoItemFound from "../../auth/components/NoItemFound";

const SettingsScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCart());
  }, []);
  const cart = useSelector((state) => state.cartScreen.cart.data);
  const handleOrder = () => {

    dispatch(orderNow(cart?._id, navigation));

    // console.log({ pro: cart?.quantity, current: cart?.productId?.quantity }, "::::::::::ASDASDASDAS::::::::::");
    // console.log(cart.productId.quantity);
  };

  const totalData = () => {
    const total = {
      totalCount: 0,
      totalAmount: 0,
    };
    cart?.items.map((ele) => {
      total.totalCount += ele?.quantity;
      total.totalAmount += ele?.total
    });
    return total;
  };
  const tokenRedux = useSelector(state => state.authProfile.token)
  // console.log({ cart }, "::::::::::::::::::::::::::::::LLLLLLLLLLLLLLLLLLLLLLLLL::::::::::::::::::::::::::::::::::");
  return (
    <View style={styles.container}>
      <Header shopName="Cart" />
      {!tokenRedux ? (<RedirectLogin />) : <ScrollView style={{ paddingHorizontal: 20 }}>
        {cart?.items?.map((item) => (
          <CartList key={item._id} item={item} />
        ))}
      </ScrollView>}
      {cart?.items?.length > 0 ? (
        <TouchableOpacity onPress={() => handleOrder()}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: Colors.green,
              paddingHorizontal: 20,
              alignItems: "center",
              height: 45,
            }}
          >
            <CustomText style={styles.title}>
              {totalData().totalCount} Items | ₹{totalData().totalAmount}
            </CustomText>
            <View style={{ flexDirection: "row" }}>
              <MaterialCommunityIcons
                name="shopping-outline"
                size={15}
                color={Colors.white}
                style={{ marginRight: 5 }}
              />
              <CustomText style={styles.title}>Buy</CustomText>
            </View>
          </View>
        </TouchableOpacity>
      ) :
        (<Text style={{ flex: 3, justifyContent: "center", alignSelf: "center" }}> <NoItemFound name="Items" /> </Text>)
      }

    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  title: {
    color: Colors.white,
    fontSize: 15,

    // fontFamily: "Roboto-Bold",
    textAlign: "right",
  },
});

// const styles = StyleSheet.create({
//   AndroidSafeArea: {
//     flex: 1,
//     backgroundColor: "white",
//     paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
//   },
// });
