import React, { useState, useEffect } from "react";
import { View, StyleSheet, RefreshControl, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getNotificationsNew } from "../../redux/actions/notificationAction";
import io from "socket.io-client";
import { Header } from ".././../components/Header";
import OrderTypeNotification from "./OrderTypeNotification";
import { ScrollView } from "react-native-gesture-handler";
import RedirectLogin from "../../auth/components/RedirectLogin";
import NoItemFound from "../../auth/components/NoItemFound";
// import { getNotifications } from "./src/redux/actions/notificationAction";

let socket = io("http://192.168.228.255:9001/apis/v1", {
  transports: ["websocket"],
  jsonp: false,
});

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const NotificationScreen = ({ navigation }) => {
  const state = useSelector((state) => state.notification.notification);

  // socket.connect();

  // socket.on("611a9f504f6430536a310ea1", (data) => {
  //   // const { userId } = store.getState().user;

  //   console.log(data.order, "=============================Socket");
  //   setListData([{ ...data.order, new: true }, ...listData]);
  // });

  // React.useEffect(() => {
  //   dispatch(getNotifications(notification));
  // }, [notification]);

  const [listData, setListData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotificationsNew());
  }, []);
  useEffect(() => {
    setListData(state);
  }, [state]);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getNotificationsNew());
    wait(1000).then(() => setRefreshing(false));
  }, []);
  const tokenRedux = useSelector(state => state.authProfile.token)
  return (
    <View style={styles.container}>
      <Header shopName="Notifications" />
      {!tokenRedux ? (<RedirectLogin />) : <ScrollView
        style={{
          flex: 1,
          marginBottom: 2,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {listData.length > 0 ? listData.map((ele, i) => {
          return (
            <View key={i}>
              {ele?.type === "order" ? (
                <OrderTypeNotification item={ele.data} type={"Order"} />
              ) : null}
            </View>
          );
        }) : (<Text style={{ flex: 1, alignSelf: "center", marginTop: 170 }}> <NoItemFound name="Notification" /> </Text>)}
      </ScrollView>}
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  backTextWhite: {
    color: "#FFF",
  },
});
