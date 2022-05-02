import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import CustomText from '../../components/UI/CustomText'
import Colors from '../../utils/Colors'
import { useNavigation } from '@react-navigation/native'

const RedirectLogin = () => {
    const navigation = useNavigation();
    return (
        <View style={{ justifyContent: "center", flex: 1 }}>
            <TouchableOpacity onPress={() => {
                navigation.navigate("Login");
            }} style={{ justifyContent: "center", alignItems: "center" }} >
                <View
                    style={styles.signIn}
                >
                    <CustomText
                        style={styles.textSign}
                    >
                        Login
                    </CustomText>
                </View>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    signIn: {
        height: 40,
        paddingHorizontal: 20,
        // justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        flexDirection: "row",
        backgroundColor: Colors.lighter_green
    },
    textSign: {
        fontSize: 15,
        textAlign: "center",
        color: Colors.white,
    },
});

export default RedirectLogin