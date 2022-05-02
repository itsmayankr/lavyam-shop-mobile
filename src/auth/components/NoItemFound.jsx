import React from 'react'
import { View, Text, Image } from 'react-native-animatable'
import image from "../../assets/Images/noData.png";
import Colors from '../../utils/Colors';

const NoItemFound = (props) => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Image
        style={{ width: 150, height: 150 }}
        source={image}
        resizeMode={"cover"}
      />
      <Text style={{ color: Colors.light_green }}>No {props.name} found!</Text>
    </View>

  )
}

export default NoItemFound
