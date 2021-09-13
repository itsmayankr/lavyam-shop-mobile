import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Platform,
  FlatList,
  AsyncStorage,
  Text,
  ImageBackground,
  Image,
} from "react-native";
//Redux
import { useSelector, useDispatch, connect } from "react-redux";
// import { fetchshops } from "../../reducers";
//Colors
import Colors from "../../utils/Colors";
//Animation
import Animated from "react-native-reanimated";
//Components
import { Carousel, Header, ShopSection } from "./components";
import Skeleton from "../../components/Loaders/SkeletonLoading";
import { getShops } from "../../redux/actions/shopAction";
//FloatButton
import { Portal, Provider } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
//height
const { width, height } = Dimensions.get("window");

const HomeScreen = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  //Header Animation
  let scrollY = new Animated.Value(0);
  // const user = useSelector((state) => state.auth.user);
  // const shops = useSelector((state) => state.store.products);
  const shops = useSelector((state) => state.shops.shops);
  // const [shops, setShop] = useState({
  //   totalCount: 0,
  // });
  const isLoading = useSelector((state) => false);
  const notification = useSelector((state) => []);
  //fetch Api
  const retrieveData = async () => {
    try {
      let pin = await AsyncStorage.getItem("pincode");
      let mark = await AsyncStorage.getItem("market");
      let category = await AsyncStorage.getItem("category");

      if (pin !== null) {
        // We have data!!
        dispatch(getShops(null, pin, mark, category));
        setPinCode(pincode);
      }
      if (mark !== null) {
        // We have data!!
        setMarket(market);
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  //fetch Api
  useEffect(() => {
    retrieveData();
  }, []);
  console.log(shops, "asd");
  return (
    <Provider>
      {isLoading ? (
        <Skeleton />
      ) : (
        // <View style={styles.container}>
        <ScrollView style={styles.container}>
          <Header
            scrollPoint={scrollY}
            navigation={navigation}
            // shops={shops}
          ></Header>
          <AnimatedFlatList
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => (
              <View style={styles.banner}>
                <Carousel />
              </View>
            )}
            scrollEventThrottle={1}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: { contentOffset: { y: scrollY } },
                },
              ],
              { useNativeDriver: true }
            )}
            // data={categories}
            // keyExtractor={(item) => item.name}
            // renderItem={({ item }) => (

            // )}
          />
          <View>
            <ShopSection data={shops} navigation={navigation} />
          </View>
        </ScrollView>
      )}
    </Provider>
  );
};

export default connect(null, { getShops })(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  list: {
    width: "100%",
    marginTop: 20,
    paddingBottom: 20,
  },
  background: {
    resizeMode: "stretch",
    borderRadius: 5,
    height: 400,
    width: "100%",
  },
});
