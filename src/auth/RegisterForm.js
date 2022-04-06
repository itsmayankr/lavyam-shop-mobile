import React, { useState, useRef, useEffect } from "react";
// import { Field, reduxForm } from "redux-form";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

//Colors
import Colors from "../utils/Colors";
import CustomText from "../components/UI/CustomText";
import { Formik, Field } from "formik"; //Redux
import { useDispatch, useSelector } from "react-redux";
//Action
// import { Login as LoginAction } from "../../../reducers";
//PropTypes check
import PropTypes from "prop-types";
// import renderField from "./RenderField";
//Authentiation Touch ID Face ID

// import { secretKey } from "../../utils/Config";

import { TextInput } from "react-native-paper";
//Colors

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { loginUser, register } from "../redux/actions/auth";
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

const RegisterForm = (props) => {
  const dispatch = useDispatch();
  const { handleSubmit } = props;
  const [showPass, setShowPass] = useState(false);
  const auth = useSelector((state) => state.auth);
  const unmounted = useRef(false);
  const navigation = useNavigation();
  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);
  const keyboardVerticalOffset = 1000

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        username: "",
        mobile: "",
        deleveryAddress: {
          address: "",
          address1: "",
          landmark: "",
          city: "",
          state: "",
        },
        gst_number: ""
      }}
      onSubmit={(values) => {
        dispatch(register(values, navigation));
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <KeyboardAvoidingView
          behavior={"height"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={keyboardVerticalOffset}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.header}>
              <View>
                <CustomText style={styles.title}>Register</CustomText>
              </View>

              <View style={styles.container}>
                <View>
                  <View
                    style={{
                      flexDirection: "column",
                      marginHorizontal: 10,
                      // flex:1
                      justifyContent: "space-between",

                      // zIndex: -1,
                    }}
                  >
                    {/* <KeyboardAwareScrollView
                      // extraHeight={500}
                      // enableResetScrollToCoords={true}
                      resetScrollToCoords={{x:40,y:100}}
                      enableOnAndroid={true}
                      keyboardShouldPersistTaps='handled'
                    > */}
                    {/* <View> */}
                    <TextInput
                      onChangeText={handleChange("username")}
                      onBlur={handleBlur("username")}
                      value={values.username}
                      keyboardType='default'
                      label='Username'
                      style={styles.textInput}
                      outlineColor={Colors.light_green}
                      mode='outlined'
                      theme={{ colors: { primary: Colors.green } }}
                    />
                    <TextInput
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                      keyboardType='email-address'
                      label='Email'
                      icon='email'
                      style={styles.textInput}
                      outlineColor={Colors.light_green}
                      mode='outlined'
                      theme={{ colors: { primary: Colors.green } }}
                    />
                    <TextInput
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                      keyboardType='default'
                      label='Password'
                      icon='lock'
                      passIcon='eye'
                      secureTextEntry={showPass ? false : true}
                      style={styles.textInput}
                      outlineColor={Colors.light_green}
                      mode='outlined'
                      theme={{ colors: { primary: Colors.green } }}
                    />
                    <TextInput
                      onChangeText={handleChange("mobile")}
                      onBlur={handleBlur("mobile")}
                      value={values.mobile}
                      keyboardType='default'
                      label='Mobile Number'
                      style={styles.textInput}
                      outlineColor={Colors.light_green}
                      mode='outlined'
                      theme={{ colors: { primary: Colors.green } }}
                    // icon="lock"
                    // passIcon="eye"
                    // secureTextEntry={showPass ? false : true}
                    />
                    <TextInput
                      onChangeText={handleChange("deleveryAddress.address")}
                      onBlur={handleBlur("deleveryAddress.address")}
                      value={values.deleveryAddress.address}
                      keyboardType='default'
                      label='Address'
                      style={styles.textInput}
                      outlineColor={Colors.light_green}
                      mode='outlined'
                      theme={{ colors: { primary: Colors.green } }}
                    />
                    <TextInput
                      onChangeText={handleChange(
                        "deleveryAddress.address1"
                      )}
                      onBlur={handleBlur("deleveryAddress.address1")}
                      value={values.deleveryAddress.address1}
                      keyboardType='default'
                      label='Address line 2'
                      style={styles.textInput}
                      outlineColor={Colors.light_green}
                      mode='outlined'
                      theme={{ colors: { primary: Colors.green } }}
                    />
                    <TextInput
                      onChangeText={handleChange(
                        "deleveryAddress.landmark"
                      )}
                      onBlur={handleBlur("deleveryAddress.landmark")}
                      value={values.deleveryAddress.landmark}
                      keyboardType='default'
                      label='Landmark'
                      style={styles.textInput}
                      outlineColor={Colors.light_green}
                      mode='outlined'
                      theme={{ colors: { primary: Colors.green } }}
                    />
                    <TextInput
                      onChangeText={handleChange("deleveryAddress.city")}
                      onBlur={handleBlur("deleveryAddress.city")}
                      value={values.deleveryAddress.city}
                      keyboardType='default'
                      label='City'
                      style={styles.textInput}
                      outlineColor={Colors.light_green}
                      mode='outlined'
                      theme={{ colors: { primary: Colors.green } }}
                    />
                    <TextInput
                      onChangeText={handleChange("deleveryAddress.state")}
                      onBlur={handleBlur("deleveryAddress.state")}
                      value={values.deleveryAddress.state}
                      keyboardType='default'
                      label='State'
                      style={styles.textInput}
                      outlineColor={Colors.light_green}
                      mode='outlined'
                      theme={{ colors: { primary: Colors.green } }}
                    />

                    <TextInput
                      onChangeText={handleChange("gst_number")}
                      onBlur={handleBlur("gst_number")}
                      value={values.gst_number}
                      keyboardType='default'
                      label='GST Number'
                      style={styles.textInput}
                      outlineColor={Colors.light_green}
                      mode='outlined'
                      theme={{ colors: { primary: Colors.green } }}
                    />
                    {/* </View> */}

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
                        {/* {auth.isLoading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : ( */}
                        <CustomText style={styles.textSign}>
                          Register
                        </CustomText>
                        {/* )} */}
                      </View>
                    </TouchableOpacity>
                    {/* </KeyboardAwareScrollView> */}
                  </View>
                  {/* <View style={styles.center}>
            <CustomText style={styles.loginOpt}>
              Hoặc đăng nhập bằng khuôn mặt/vân tay
            </CustomText>
            <View style={styles.circleImage}>
              <TouchableOpacity
                onPress={
                  Platform.OS === "android"
                    ? showAndroidAlert
                    : scanFingerprintOrFaceId
                }
              >
                <Image
                  source={require("../../assets/Images/faceid.png")}
                  style={styles.faceid}
                />
              </TouchableOpacity>
            </View>
          </View> */}
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>

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
    marginTop: height * 0.1,
    marginBottom: 10,
    flex: 1,
    justifyContent: "space-between",
    marginHorizontal: 10,
    // position:"relative"
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
  container: {
    // marginLeft: 20,
    // marginRight: 20,
    // flex: 1,
    // position: "absolute",
    // top: "20px",
    // justifyContent: "space-around",

  },
});
export default RegisterForm;
