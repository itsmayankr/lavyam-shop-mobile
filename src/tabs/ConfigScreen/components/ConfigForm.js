import React from "react";
import { TextInput, StyleSheet, View } from "react-native";
import { Button, Menu, Provider } from "react-native-paper";
import Colors from "../../../utils/Colors";

const ConfigForm = ({ navigation }) => {
  const [pincode, setPincode] = React.useState("Select Pincode");
  const [market, setMarket] = React.useState("Select Market");
  const [category, setCategory] = React.useState("Select Category");
  const [isOpenPin, setOpenPin] = React.useState(false);
  const [isOpenMarket, setOpenMarket] = React.useState(false);
  const [isOpenCategory, setOpenCategory] = React.useState(false);

  const onPressItemHandler = (value) => {
    setPincode(value);
    setOpenPin(false);
  };

  const onPressItemHandlerMarket = (value) => {
    setMarket(value);
    setOpenMarket(false);
  };

  const onPressItemHandlerCategory = (value) => {
    setCategory(value);
    setOpenCategory(false);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Menu
        style={{ marginTop: 70 }}
        visible={isOpenPin}
        onDismiss={() => setOpenPin(false)}
        anchor={
          <Button
            style={{ marginTop: 25 }}
            color="#8DB600"
            dark={true}
            mode="contained"
            onPress={() => setOpenPin(true)}
          >
            {pincode}
          </Button>
        }
      >
        <Menu.Item
          onPress={() => onPressItemHandler("248007")}
          title="248007"
        />
        <Menu.Item
          onPress={() => onPressItemHandler("248008")}
          title="248008"
        />
        <Menu.Item
          onPress={() => onPressItemHandler("248009")}
          title="248009"
        />
      </Menu>

      <Menu
        style={{ marginTop: 70 }}
        visible={isOpenMarket}
        onDismiss={() => setOpenMarket(false)}
        anchor={
          <Button
            style={{ marginTop: 25 }}
            color="#8DB600"
            dark={true}
            mode="contained"
            onPress={() => setOpenMarket(true)}
          >
            {market}
          </Button>
        }
      >
        <Menu.Item
          onPress={() => onPressItemHandlerMarket("Market 1")}
          title="Market 1"
        />
        <Menu.Item
          onPress={() => onPressItemHandlerMarket("Market 2")}
          title="Market 2"
        />
        <Menu.Item
          onPress={() => onPressItemHandlerMarket("Market 3")}
          title="Market 3"
        />
      </Menu>

      <Menu
        style={{ marginTop: 70 }}
        visible={isOpenCategory}
        onDismiss={() => setOpenCategory(false)}
        anchor={
          <Button
            style={{ marginTop: 25 }}
            color="#8DB600"
            dark={true}
            mode="contained"
            onPress={() => setOpenCategory(true)}
          >
            {category}
          </Button>
        }
      >
        <Menu.Item
          onPress={() => onPressItemHandlerCategory("Category 1")}
          title="Category 1"
        />
        <Menu.Item
          onPress={() => onPressItemHandlerCategory("Category 2")}
          title="Category 2"
        />
        <Menu.Item
          onPress={() => onPressItemHandlerCategory("Category 3")}
          title="Category 3"
        />
      </Menu>

      <Button
        color="#8DB600"
        dark={true}
        mode="contained"
        style={{
          marginTop: 200,
          width: "50%",
          height: 50,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 5,

          backgroundColor: Colors.lighter_green,
        }}
        onPress={() => navigation.navigate("HomeApp")}
      >
        Confirm
      </Button>
    </View>
  );
};

export default ConfigForm;
