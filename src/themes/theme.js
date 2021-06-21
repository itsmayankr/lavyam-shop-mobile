import { DefaultTheme } from "react-native-paper";

const customTheme = {
  ...DefaultTheme,
  //   roundness: 2,
  myOwnProperty: true,
  //   colors: {
  //     // ...DefaultTheme.colors,
  //     primary: "#ff0000",
  //     accent: "#000000",
  //     backdrop: "rgba(0, 0, 0, 0.5)",
  //     background: "#f6f6f6",
  //     disabled: "rgba(0, 0, 0, 0.26)",
  //     error: "#B00020",
  //     notification: "#f50057",
  //     onSurface: "#000000",
  //     placeholder: "rgba(0, 0, 0, 0.54)",
  //     surface: "#ffffff",
  //     text: "#000000",
  //   },
  dark: false,
  roundness: 4,
  colors: {
    primary: "#fff",
    accent: "black",
    background: "#F1F7ED",
    surface: "#F1F7ED",
    text: "#001021",
    error: "#B71F0E",
    disabled: "#BEC6C6",
    placeholder: "#1481BA",
    backdrop: "#001021",
  },
  fonts: {
    regular: "Helvetica Neue",
    medium: "Helvetica Neue Light",
  },
};

export default customTheme;
