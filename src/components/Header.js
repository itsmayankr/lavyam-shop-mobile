// Import react
import React, { useRef, useEffect, useState } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import {
  StyleSheet,
  Text,
  Platform,
  StatusBar,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Colors
import Colors from "../utils/Colors";
import { useDispatch } from "react-redux";
// import { getPincodes } from "../../redux/actions/configScreenActions";
import { useNavigation } from "@react-navigation/native";
import { logout } from "../redux/actions/auth";

export const Header = ({ shopName }) => {
  const navigation = useNavigation();


  const handleLogin = async () => {
    navigation.navigate("Login");
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
  const dispatch = useDispatch();
  // console.log({ navigation: navigation.navigate });
  return (
    <>
      <SafeAreaView style={styles.header_safe_area}>
        <View style={styles.header}>
          <View style={{ flexDirection: "row", marginTop: 15 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View style={{ marginRight: 10 }}>
                <Ionicons
                  name="arrow-back"
                  size={24}
                  color={Colors.light_green}
                />
              </View>
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                // width: width,
                textTransform: "capitalize",
              }}
            >
              {shopName}
            </Text>
          </View>
          <View style={{ justifyContent: "center" }}>
            { token ? <TouchableOpacity onPress={() => dispatch(logout(navigation))}>
              <Text style={{ color: Colors.green }}>Logout</Text>
            </TouchableOpacity> :  <TouchableOpacity onPress={() => handleLogin()}>
              <Text style={{ color: Colors.green }}>Login</Text>
            </TouchableOpacity>
            }
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  header_safe_area: {
    zIndex: 1000,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    backgroundColor: Colors.white,
    // width,
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#f5f5f5",
    borderBottomWidth: 2,
    paddingHorizontal: 20,
    // marginHorizontal: 10,
    // marginBottom: ,
  },
});
