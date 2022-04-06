import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Text, View, SafeAreaView, Image, Dimensions, StyleSheet } from 'react-native';

import Carousel, { Pagination, ParallaxImage } from 'react-native-snap-carousel';
import Colors from '../../../utils/Colors';

const { width: screenWidth } = Dimensions.get('window')

const CustomCarousel = (images) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [carouselItems, setCarouselItems] = useState([]);
  useEffect(() => {
    setCarouselItems(images?.images?.data)
  }, [images])
  const ref = useRef(null);
  // console.log({ carouselItems }, "asdasd");
  // const renderItem = useCallback(({ item, index }) =>

  // (
  //   <Image
  //     style={{ width: "100%", height: "100%" }}
  //     // source={{ uri: item?.image?.Location }} 
  //     source={{ uri: item?.image?.Location }}
  //     resizeMode="cover"
  //   />
  // ), []);

  const renderItem = useCallback(({ item, index }, parallaxProps) => (
    <View style={styles.item}>
      <ParallaxImage
        source={{ uri: item?.image?.Location }}
        containerStyle={styles.imageContainer}
        style={styles.image}
        parallaxFactor={0.4}
        {...parallaxProps}
      />
    </View>
  ), []);

  const pagination = () => {
    // const { entries, activeSlide } = this.state;
    return (
      <Pagination
        dotsLength={carouselItems?.length}
        activeDotIndex={activeIndex}
        containerStyle={{ backgroundColor: 'transparent', marginTop: -20 }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: Colors.green
        }}
        inactiveDotStyle={{
          // Define styles for inactive dots here
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: "center" }}>
        <Carousel
          layout="default"
          ref={ref}
          data={carouselItems}
          sliderWidth={screenWidth}
          // sliderHeight={screenWidth}
          itemWidth={screenWidth - 50}
          renderItem={renderItem}
          onSnapToItem={(index) => setActiveIndex(index)}
          hasParallaxImages={true}
        />
        {pagination()}
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  item: {
    width: screenWidth - 50,
    height: "100%",
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
  },
})

export default CustomCarousel;