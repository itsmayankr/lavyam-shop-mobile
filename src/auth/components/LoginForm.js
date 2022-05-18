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
  Text,
} from "react-native";
//Colors
import Colors from "../../utils/Colors";
import CustomText from "../../components/UI/CustomText";
import { Formik, Field } from "formik"; //Redux
import { useDispatch, useSelector } from "react-redux";
//PropTypes check
import PropTypes from "prop-types";
//Authentiation Touch ID Face ID

import { secretKey } from "../../utils/Config";

import { TextInput } from "react-native-paper";
//Colors
import { loginUser } from "../../redux/actions/auth";
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get("window");

//Validation
const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Email không được bỏ trống";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Email không hơp lệ";
  }
  if (!values.password) {
    errors.password = "Mật khẩu không được bỏ trống";
  } else if (values.password.length < 6) {
    errors.password = "Mật khẩu phải nhiều hơn hoặc bằng 6 ký tự";
  }
  return errors;
};

const LoginForm = (props) => {
  const dispatch = useDispatch();
  const [showPass, setShowPass] = useState(false);
  const unmounted = useRef(false);
  const navigation = useNavigation();
  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values) => {
        console.log(values);
        let obj = {
          email: values.email.toLocaleLowerCase(), password: values.password
        }
        dispatch(loginUser(obj, navigation));

      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "position" : "height"}
        >
          <View style={styles.header}>
            <View>
              <CustomText style={styles.title}>Login</CustomText>
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
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email.toLocaleLowerCase()}
                    keyboardType="visible-password"
                    label={<Text style={{ color: Colors.green, backgroundColor: "#fff", opacity: 1 }}>Email</Text>}
                    theme={{ colors: { text: "black", primary: Colors.green } }}
                    icon="email"
                    style={styles.textInput}
                    outlineColor={Colors.light_green}
                    mode="outlined"

                  />

                  <TextInput
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    keyboardType="default"
                    label={<Text style={{ color: Colors.green, backgroundColor: "#fff", opacity: 1 }}>Password</Text>}
                    icon="lock"
                    passIcon="eye"
                    secureTextEntry={showPass ? false : true}
                    style={styles.textInput}
                    outlineColor={Colors.light_green}
                    mode="outlined"
                    theme={{ colors: { text: "black", primary: Colors.green } }}
                  />
                </View>
                <View style={styles.group}>
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate("Register");
                    }}
                  >
                    <CustomText
                      style={{
                        ...styles.textSignSmall,
                        // fontFamily: "Roboto-Medium",
                      }}
                    >
                      Register
                    </CustomText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate("ForgotPassword");
                    }}
                  >
                    <CustomText
                      style={{
                        ...styles.textSignSmall,
                        // fontFamily: "Roboto-Medium",
                      }}
                    >
                      Forgot Password?
                    </CustomText>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={{ marginVertical: 10, alignItems: "center" }}
                >
                  <View style={styles.signIn}>
                    <CustomText style={styles.textSign}>Login</CustomText>
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
    justifyContent: "space-between",
    marginVertical: 10,
  },
  header: {
    marginTop: height * 0.2,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  title: {
    color: Colors.light_green,
    fontSize: 40,
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
  },
});
export default LoginForm;
