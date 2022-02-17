import React, { useRef, useEffect, useState } from "react";
import { View, Animated, Dimensions, StyleSheet } from "react-native";
import banners from "../../../db/Banners";
import Slide from "./Slide";
import Pagination from "./Pagination";
import { useDispatch, useSelector } from "react-redux";

const { width } = Dimensions.get("window");

export const Carousel = (images) => {
  console.log(images.images, ":::::::::::::::::::asdasdasdasd:::::::::::::::::::::")
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <Animated.ScrollView
        horizontal
        snapToInterval={width}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        bounces={false}
        scrollEventThrottle={1}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false } //
        )}
      >
        {images && images?.images?.data?.map((ele) => {
          return <Slide key={ele._id} localImageMain={ele.image.Location} />;
        })}
      </Animated.ScrollView>
      <Pagination slides={images && images?.images?.data} scrollX={scrollX} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
  },
});
