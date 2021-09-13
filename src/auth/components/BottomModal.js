import React, { useCallback, useRef, useState } from "react";
import { View, Button, Dimensions, Text } from "react-native";
// import RNSingleSelect, {
//   ISingleSelectDataType,
// } from "@freakycoder/react-native-single-select";
import { Formik, Field } from "formik";
import SelectDropdown from "react-native-select-dropdown";

export default function BottomModal({ pincodeData }) {
  const countries = ["Egypt", "Canada", "Australia", "Ireland"];

  return (
    <View
      style={{
        flex: 1,
        // justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#E9EDF3",
        marginBottom: 10,
      }}
    >
      <Formik
        initialValues={{ email: "" }}
        onSubmit={(values) => {
          console.log(values, "values");
          const data = {
            email: pinCode.value,
          };
          console.log(data, "akjshdkjhaskjdhjkashd");
        }}
      >
        {({ handleChange, setFieldValue, handleSubmit, values }) => (
          <View>
            <View style={{ marginTop: 20 }}>
              <SelectDropdown
                data={pincodeData.map((ele) => ele.pinCode)}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item;
                }}
              />
            </View>
            <Button onPress={handleSubmit} title="Submit" />
          </View>
        )}
      </Formik>
    </View>
  );
}
