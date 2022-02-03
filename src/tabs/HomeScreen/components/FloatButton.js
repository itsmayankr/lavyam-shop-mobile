import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";
import { useDispatch } from "react-redux";
import { orderNow } from "../../../redux/actions/orderAction";
import Colors from "../../../utils/Colors";

export const FloatButton = ({ handleOrder }) => {
  const [state, setState] = useState({ open: false });

  return (
    <FAB
      style={styles.fab}
      small
      label="Buy Now"
      onPress={() => handleOrder()}
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
