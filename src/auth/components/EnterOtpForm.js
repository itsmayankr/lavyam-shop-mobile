import React, { useState, useRef, useEffect } from "react";
// import { Field, reduxForm } from "redux-form";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Dimensions,
  ImageBackground,
  Text,
} from "react-native";
//Colors
import Colors from "../../utils/Colors";
import CustomText from "../../components/UI/CustomText";
import { Formik } from "formik"; //Redux
import { useDispatch, useSelector } from "react-redux";

import { TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { forgotPasswordAction } from "../../redux/actions/auth";

const { height } = Dimensions.get("window");


const EnterOtpForm = (props) => {
  const dispatch = useDispatch();
  const unmounted = useRef(false);
  const navigation = useNavigation();


  const Number = useSelector(
    (state) => state.otpNumber.number
  );


  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);

  const { width } = Dimensions.get("window");

  return (
    <Formik
      initialValues={{ otp: "" }}
      onSubmit={(values) => {
        console.log(values);
        // navigation.navigate("ResetPassword")
        dispatch(forgotPasswordAction(values, navigation, "Reset"));
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "position" : "height"}
          style={{ flex: 1 }}
        >
          <ImageBackground
            style={{ flex: 1, position: "absolute", height: "100%", width }}
            source={require("../../assets/Images/flower3.jpg")}
            blurRadius={10}
          ></ImageBackground>
          <View style={styles.header}>
            <View>
              <CustomText style={styles.title}>Enter OTP</CustomText>
            </View>
            <View>
              <CustomText style={{
                ...styles.textSignSmall,
                // fontFamily: "Roboto-Medium",
              }}
              >An OTP has been sent to +91 ******{Number.slice(6, 10)}</CustomText>
            </View>
          </View>
          <ScrollView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View
                style={{
                  flexDirection: "column",
                  marginHorizontal: 10,
                  marginLeft: 20,
                  marginRight: 20,
                  zIndex: -1,
                }}
              >
                <View>
                  <TextInput
                    onChangeText={handleChange("otp")}
                    onBlur={handleBlur("otp")}
                    value={values.otp}
                    maxLength={6}
                    keyboardType="number-pad"
                    label={<Text style={{ color: Colors.green, backgroundColor: "#fff", opacity: 1 }}>OTP</Text>}
                    // icon="email"
                    letterSpacing={15}
                    style={styles.textInput}
                    outlineColor={Colors.light_green}
                    mode="outlined"
                    theme={{ colors: { primary: Colors.green } }}
                  />
                </View>
                <View style={styles.group}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Login");
                    }}
                  >
                    <CustomText
                      style={{
                        ...styles.textSignSmall,
                        // fontFamily: "Roboto-Medium",
                      }}
                    >
                      Login
                    </CustomText>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={{ marginVertical: 10, alignItems: "center" }}
                >
                  <View style={styles.signIn}>
                    <CustomText style={styles.textSign}>Submit</CustomText>
                  </View>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  group: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginVertical: 10,
  },
  header: {
    marginTop: height * 0.2,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  title: {
    color: Colors.light_green,
    fontSize: 30,
    letterSpacing: 5,
    // fontFamily: "Roboto-Bold",
    textAlign: "center",
  },
  text: {
    color: "#fff",
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    flexDirection: "row",
    backgroundColor: Colors.lighter_green,
  },
  textSign: {
    fontSize: 15,
    color: "#fff",
    // fontFamily: "Roboto-Medium",
  },
  textSignSmall: {
    color: Colors.lighter_green,
    textAlign: "center",
  },
  center: {
    alignItems: "center",
  },
  circleImage: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    padding: 20,
    borderRadius: 55,
    borderStyle: "dashed",
    borderColor: Colors.grey,
  },
  faceid: {
    resizeMode: "contain",
    height: 70,
    width: 70,
  },
  loginOpt: {
    color: Colors.lighter_green,
    // fontFamily: "Roboto-Medium",
    marginBottom: 10,
  },
  textInput: {
    backgroundColor: "#fff",
    marginBottom: 10,
    height: 44,
    letterSpacing: 5
  },
});
export default EnterOtpForm;
