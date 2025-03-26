import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Animated, Dimensions } from "react-native";
import LottieView from "lottie-react-native";

export default function SplashScreen() {
  const fadeAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnimation]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.imageContainer, { opacity: fadeAnimation }]}>
        <LottieView 
          source={require("../assets/animations/blue.json")} 
          autoPlay 
          loop 
          style={styles.lottie}
          resizeMode="cover"
        />
      </Animated.View>
    </View>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1e1e1e",
  },
  imageContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    height: height,
  },
  lottie: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
