import React, { useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  SectionList,
} from "react-native";
import Animated, { Value } from "react-native-reanimated";
//Color
import Colors from "../../../utils/Colors";
import ProductList from "./ProductList";
import CustomText from "../../../components/UI/CustomText";
import { Header } from "./Header";
//PropTypes check
import PropTypes from "prop-types";

ITEM_HEIGHT = 100;

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);

const ProductBody = ({ navigation, productsFilter, searchFilterFunction }) => {
  const DATA = [];
  // console.log({ productsFilter });
  DATA.push({ title: "Shops", data: productsFilter.shop });
  const scrollY = new Value(0);
  const sectionListRef = useRef(null);
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Header
          navigation={navigation}
          searchFilterFunction={searchFilterFunction}
          scrollY={scrollY}
        />
      </TouchableWithoutFeedback>
      {productsFilter?.totalCount === 0 ? (
        <CustomText style={{ textAlign: "center", marginTop: 110 }}>
          no shop found!
        </CustomText>
      ) : (
        <AnimatedSectionList
          sections={DATA} // REQUIRED: SECTIONLIST DATA
          keyExtractor={(item) => item._id}
          ref={sectionListRef}
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles.header}>
              <CustomText style={styles.title}>{title}</CustomText>
            </View>
          )}
          renderItem={({ item }) => (
            <ProductList item={item} navigation={navigation} />
          )}
          stickySectionHeadersEnabled={false}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          contentContainerStyle={{ marginTop: 90, paddingBottom: 100 }}
        />
      )}
    </View>
  );
};

export default ProductBody;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    height: 40,
    paddingHorizontal: 20,
    justifyContent: "center",
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.lighter_green,
  },
});
