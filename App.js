import * as React from "react";
import {
  Provider as PaperProvider,
  Headline,
  Button,
  useTheme,
  Appbar,
  Avatar,
} from "react-native-paper";
import { Platform, TouchableOpacity } from "react-native";
import customTheme from "./src/themes/theme";

const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";
const App = (props) => {
  const { colors } = useTheme();

  console.log(colors);

  return (
    <PaperProvider theme={customTheme}>
      <Appbar.Header
        theme={{ backgroundColor: colors.primary, color: colors.text }}
      >
        <Appbar.Content title="Title" />
        {/* <Appbar.Action icon="magnify" onPress={() => {}} /> */}
        {/* <Appbar.Action icon={MORE_ICON} onPress={() => {}} /> */}
        <TouchableOpacity onPress={() => console.log("pressed")}>
          <Avatar.Text
            color="#fff"
            style={{ backgroundColor: "red", marginRight: 10 }}
            size={34}
            label="R"
          />
        </TouchableOpacity>
      </Appbar.Header>
    </PaperProvider>
  );
};

export default App;
