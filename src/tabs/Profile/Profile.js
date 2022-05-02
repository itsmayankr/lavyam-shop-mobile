import React, { useEffect } from "react";
// import { Field, reduxForm } from "redux-form";
import {
    StyleSheet,
    View,
    Dimensions,
    Text,
    ImageBackground,
    StatusBar,
} from "react-native";

// import { getUserProfile } from "../../redux/actions/auth";

//Colors
import Colors from "../../utils/Colors";
import CustomText from "../../components/UI/CustomText";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { getUserProfile } from "../../redux/actions/auth";

const ProfileScreen = (props) => {

    const navigation = useNavigation();

    const dispatch = useDispatch()
    const profile = useSelector(state => state.authProfile.userProfile?.user)
    useEffect(() => {
        dispatch(getUserProfile())
    }, [])

    console.log({ profi203: profile })
    const { width } = Dimensions.get("window");

    return (
        <View style={styles.AndroidSafeArea}>
            <View style={styles.container}>
                <ImageBackground
                    style={{ flex: 1, position: "absolute", height: "100%", width }}
                    source={require("../../assets/Images/flower3.jpg")}
                    blurRadius={10}
                ></ImageBackground>
                <View style={{ paddingVertical: 80, paddingHorizontal: 20 }}>
                    <View style={{ marginBottom: 20 }}>
                        <CustomText style={styles.title}>Profile</CustomText>
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <Text style={styles.textTitle}>Username: </Text>
                        <Text style={styles.textDecription}>{profile?.username}</Text>
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <Text style={styles.textTitle}>Email: </Text>
                        <Text style={styles.textDecription}>{profile?.email}</Text>
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <Text style={styles.textTitle}>Phone Number: </Text>
                        <Text style={styles.textDecription}>{profile?.mobile}</Text>
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <Text style={styles.textTitle}>Address: </Text>
                        <Text style={styles.textDecription}>{profile?.deleveryAddress?.address1}, {profile?.deleveryAddress?.landmark}, {profile?.deleveryAddress?.city}, {profile?.deleveryAddress?.state}</Text>
                    </View>
                    <View>
                        <Text style={styles.textTitle}>Landmark: </Text>
                        <Text style={styles.textDecription}>{profile?.deleveryAddress.landmark}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: Colors.lighter_green
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
        // padding: 10,
        paddingHorizontal: 0,
        paddingBottom: 5,
        paddingTop: 0,
        // borderWidth: 0.5,
        borderColor: Colors.green,
        // borderRadius: 5,
        borderBottomWidth: 0.5,
        marginTop: 5
    },
    container: {
        flex: 1
    }
});
export default ProfileScreen;
