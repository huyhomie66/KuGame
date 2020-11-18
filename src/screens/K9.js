import React from "react";
import {
  StyleSheet,
  Dimensions,
  Image,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

const { width } = Dimensions.get("window");

const Button = ({ onPress, title }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonTitle}>{title} </Text>
    </TouchableOpacity>
  );
};

const Home = ({ navigation }) => {
  const register =
    "https://k9vn.net/huong-dan-dang-ky-tai-khoan-k9win-nhanh-va-chinh-xac-nhat/";
  const login = "https://www.k9vn.com/vn/signup/?aff=mon";
  return (
    <View style={styles.container}>
      <Image
        resizeMode="contain"
        source={require("./k9.jpg")}
        style={styles.image}
      />
      <Button
        title="Đăng Ký"
        onPress={() => navigation.navigate("WebView", { url: register })}
      />
      <Button
        title="Đăng Nhập"
        onPress={() => navigation.navigate("WebView", { url: login })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "black",
  },
  button: {
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#ffc90d",
    width: width * 0.5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  buttonTitle: {
    color: "#880016",
    fontSize: 16,
    fontWeight: "bold",
  },
  image: {
    width: width * 0.7,
    marginBottom: 20,
  },
});

export default Home;
