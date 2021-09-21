import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
// import RNSingleSelect, {
//   ISingleSelectDataType,
// } from "@freakycoder/react-native-single-select";
import { Formik, Field } from "formik";
import CustomText from "../../components/UI/CustomText";
import Colors from "../../utils/Colors";

import { Picker } from "@react-native-picker/picker";
export default function BottomModal({ pincodeData }) {
  const [selectedLanguage, setSelectedLanguage] = useState();

  const data = [
    { label: "DataCat", value: 1 },
    { label: "DataDog", value: 2 },
    { label: "DataSnake", value: 3 },
    { label: "DataPlatypus", value: 4 },
    { label: "DataWhale", value: 5 },
    { label: "DataCat", value: 1 },
    { label: "DataDog", value: 2 },
    { label: "DataSnake", value: 3 },
    { label: "DataPlatypus", value: 4 },
    { label: "DataWhale", value: 5 },
    { label: "DataCat", value: 1 },
    { label: "DataDog", value: 2 },
    { label: "DataSnake", value: 3 },
    { label: "DataPlatypus", value: 4 },
    { label: "DataWhale", value: 5 },
    { label: "DataCat", value: 1 },
    { label: "DataDog", value: 2 },
    { label: "DataSnake", value: 3 },
    { label: "DataPlatypus", value: 4 },
    { label: "DataWhale", value: 5 },
    { label: "DataCat", value: 1 },
    { label: "DataDog", value: 2 },
    { label: "DataSnake", value: 3 },
    { label: "DataPlatypus", value: 4 },
    { label: "DataWhale", value: 5 },
    { label: "DataCat", value: 1 },
    { label: "DataDog", value: 2 },
    { label: "DataSnake", value: 3 },
    { label: "DataPlatypus", value: 4 },
    { label: "DataWhale", value: 5 },
  ];
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
          <View style={{ height: "100%" }}>
            <View style={styles.card}>
              <Picker
                selectedValue={selectedLanguage}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedLanguage(itemValue)
                }
                style={{ height: 30 }}
              >
                <Picker.Item label={"Select PIN Code"} />
                {pincodeData?.map((ele, i) => (
                  <Picker.Item
                    style={styles.pickerItem}
                    key={i}
                    label={ele.pinCode}
                    value={ele.pinCode}
                  />
                ))}
              </Picker>
            </View>
            <View style={styles.card}>
              <Picker
                selectedValue={selectedLanguage}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedLanguage(itemValue)
                }
                style={{ height: 30 }}
              >
                <Picker.Item label={"Select Market"} />
                {data.map((ele, i) => (
                  <Picker.Item
                    style={styles.pickerItem}
                    key={i}
                    label={ele.label}
                    value={ele.value}
                  />
                ))}
              </Picker>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => handleSubmit("123", "123")}
                style={{
                  alignItems: "center",
                  marginTop: 30,
                  position: "absolute",
                  top: 120,
                  width: "100%",
                }}
              >
                <View style={styles.signIn}>
                  <CustomText style={styles.textSign}>Submit</CustomText>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  signIn: {
    width: "100%",
    height: 40,
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
  card: {
    borderWidth: 1,
    width: 314,
    borderColor: Colors.green,
    borderRadius: 5,
    backgroundColor: "#fff",
    marginTop: 10,
    paddingHorizontal: 4,
    paddingVertical: 6,
    marginTop: 30,
  },
  pickerItem: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    color: "red",
  },
});
