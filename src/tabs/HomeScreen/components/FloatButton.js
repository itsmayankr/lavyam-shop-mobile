import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";
import Colors from "../../../utils/Colors";

export const FloatButton = () => {
  const [state, setState] = useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;
  return (
    <FAB
      style={styles.fab}
      small
      label="Bye Now"
      onPress={() => console.log("Pressed")}
    />
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 40,
    backgroundColor: Colors.light_green,
  },
});
