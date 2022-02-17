// import React, { useState, useEffect } from "react";
// import { View, StyleSheet, Text } from "react-native";
// import { Header } from ".././../components/Header";
// import { ScrollView } from "react-native-gesture-handler";
// import { useDispatch, useSelector } from "react-redux";



// const ProfileScreen = ({ navigation }) => {

//     return (
//         <View style={styles.container}>
//             <Header shopName="Profile" />
//             <View >
//                 <Text>Profile</Text>
//             </View>


//         </View>
//     );
// };

// export default ProfileScreen;

// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: "#fff",
//         flex: 1,
//     },
//     backTextWhite: {
//         color: "#FFF",
//     },
// });


import React, { useState, useRef, useEffect } from "react";
// import { Field, reduxForm } from "redux-form";
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Keyboard,
    TouchableWithoutFeedback,
    Platform,
    StatusBar,
    Dimensions,
    Text,
} from "react-native";

// import { getUserProfile } from "../../redux/actions/auth";

//Colors
import Colors from "../../utils/Colors";
import CustomText from "../../components/UI/CustomText";
import { useDispatch, useSelector } from "react-redux";

import { TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { getUserProfile } from "../../redux/actions/auth";

const { height } = Dimensions.get("window");


const ProfileScreen = (props) => {

    const navigation = useNavigation();

    const dispatch = useDispatch()
    const profile = useSelector(state => state.authProfile.userProfile?.user)
    useEffect(() => {
        dispatch(getUserProfile())
    }, [])

    console.log({ profil123: profile })
    const keyboardVerticalOffset = 1000

    return (
        <View style={styles.AndroidSafeArea}>
            <View style={{ paddingVertical: 80, paddingHorizontal: 20 }}>
                <View style={{ marginBottom: 10 }}>
                    <CustomText style={styles.title}>Profile</CustomText>
                </View>
                <View style={{ marginBottom: 10 }}>
                    <Text style={styles.textTitle}>Username: </Text>
                    <Text style={styles.textDecription}>{profile?.username}</Text>
                </View>
                <View style={{ marginBottom: 10 }}>
                    <Text style={styles.textTitle}>Email: </Text>
                    <Text style={styles.textDecription}>{profile?.email}</Text>
                </View>
                <View style={{ marginBottom: 10 }}>
                    <Text style={styles.textTitle}>Phone Number: </Text>
                    <Text style={styles.textDecription}>{profile?.mobile}</Text>
                </View>
                <View style={{ marginBottom: 10 }}>
                    <Text style={styles.textTitle}>Address: </Text>
                    <Text style={styles.textDecription}>{profile?.deleveryAddress?.address1}, {profile?.deleveryAddress?.landmark}, {profile?.deleveryAddress?.city}, {profile?.deleveryAddress?.state}</Text>
                </View>
                <View style={{ marginBottom: 10 }}>
                    <Text style={styles.textTitle}>Landmark: </Text>
                    <Text style={styles.textDecription}>{profile?.deleveryAddress.landmark}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    title: {
        color: Colors.light_green,
        fontSize: 40,
        letterSpacing: 5,
        // fontFamily: "Roboto-Bold",
        textAlign: "center",
    },
    textTitle: {
        color: Colors.green,
    },
    textDecription: {
        padding: 5,
        borderWidth: 0.5,
        borderColor: Colors.green,
        borderRadius: 5,
        marginTop: 5
    }
});
export default ProfileScreen;
