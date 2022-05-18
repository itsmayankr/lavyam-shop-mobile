import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
} from "react-native";
//Redux
import { useSelector, useDispatch, connect } from "react-redux";
// import { fetchshops } from "../../reducers";
//Colors
import Colors from "../../utils/Colors";
//Animation
import Animated from "react-native-reanimated";
//Components
import { Header, ShopSection } from "./components";
import Skeleton from "../../components/Loaders/SkeletonLoading";
import { getAllSeller, getShops } from "../../redux/actions/shopAction";
//FloatButton
import { Provider } from "react-native-paper";
import { getAdCount } from "../../redux/actions/configScreenActions";

import MyCarousel from "./components/Carousel";
import { SafeAreaView } from "react-native-safe-area-context";

//height
const { width, height } = Dimensions.get("window");

const HomeScreen = (props) => {
  const { navigation } = props;

  const dispatch = useDispatch()
  const data = useSelector(state => state.configScreen.adsUser)
  useEffect(() => {
    dispatch(getAdCount("user"))
  }, [])
  console.log(data.data, "::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::");
  // const user = useSelector((state) => state.auth.user);
  // const shops = useSelector((state) => state.store.products);
  const shops = useSelector((state) => state.shops.shops);
  // const [shops, setShop] = useState({
  //   totalCount: 0,
  // });
  const isLoading = useSelector((state) => false);

  //fetch Api
  const retrieveData = async () => {
    try {
      // let pin = await AsyncStorage.getItem("pincode");
      // let mark = await AsyncStorage.getItem("market");
      // let category = await AsyncStorage.getItem("category");
      console.log({ pin, mark }, "::::::::::::ASD:::::::::::::::::")
      // await AsyncStorage.clear();

      if (pin !== null) {
        // We have data!!
        // dispatch(getShops(null, pin, mark, category));
        // setPinCode(pincode);
      }
      if (mark !== null) {
        // We have data!!
        // setMarket(mark);
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  //fetch Api
  useEffect(() => {
    retrieveData();
    props.getAllSeller();
  }, []);

  return (

    <Provider>
      {isLoading ? (
        <Skeleton />
      ) : (
        // <View style={styles.container}>

        <View style={styles.container}>
          <Header />
          {data?.data?.length > 0 ? <MyCarousel images={data} /> : null}
          {/* <AnimatedFlatList
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => (
              <View style={styles.banner}>
                <Carousel images={data} />
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
          /> */}
          <View>
            <ShopSection data={shops} navigation={navigation} />
          </View>
        </View>
      )}
    </Provider>

  );
};

export default connect(null, { getShops, getAllSeller })(HomeScreen);

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: Colors.lighter_green,
    height: 0
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: 10
  },
  list: {
    width: "100%",
    marginTop: 20,
    paddingBottom: 20,
  },
  banner: {
    height: 150,
  },
  background: {
    resizeMode: "stretch",
    borderRadius: 5,
    height: 400,
    width: "100%",
  },
});
