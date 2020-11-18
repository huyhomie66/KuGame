import React, { useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Linking,
} from "react-native";

const { width } = Dimensions.get("window");

const BUTTON_COLOR = "#FFD700";
const TEXT_COLOR = "black";
const BG_COLOR = "black";
const LOGO_SIZE = width * 0.6;

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
  },
  button: {
    width: "40%",
    height: width * 0.2,
    margin: 15,
    borderRadius: 6,
    backgroundColor: BUTTON_COLOR,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  text: {
    color: TEXT_COLOR,
    fontWeight: "bold",
  },
  buttonSmall: {},
  buttonContainer: {
    backgroundColor: BUTTON_COLOR,
    borderRadius: 6,
  },
  logo: {
    alignSelf: "center",
    width: LOGO_SIZE,
    height: LOGO_SIZE,
  },
});

const buttons = [
  {
    title: "Đăng ký",
    image: require("../assets/register.png"),
  },
  {
    title: "Đăng nhập",
    image: require("../assets/login.png"),
  },
  {
    title: "Kết quả sổ xố",
    image: require("../assets/result.png"),
  },
  {
    title: "Khuyến mãi",
    image: require("../assets/promotions.png"),
  },
  {
    title: "Hỗ trợ",
    image: require("../assets/customer-service.png"),
  },
  {
    title: "Lãi suất",
    image: require("../assets/interest-rate.png"),
  },
];

const Button = ({ children, style, onPress, image, ...props }) => (
  <TouchableOpacity onPress={onPress} style={style} {...props}>
    <Text style={styles.text}>{children}</Text>
    <Image resizeMode="contain" source={image} style={styles.image} />
  </TouchableOpacity>
);

export default ({}) => {
  return (
    <SafeAreaView style={{ backgroundColor: BG_COLOR, flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {buttons.map((e, i) => (
          <Button
            style={styles.button}
            key={i}
            image={e.image}
            onPress={() => Linking.openURL("https://chat.zalo.me/?g=vaqsrr849")}
          >
            {e.title}
          </Button>
        ))}
      </View>
    </SafeAreaView>
  );
};
