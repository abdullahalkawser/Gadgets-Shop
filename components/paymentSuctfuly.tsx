import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { useRouter } from "expo-router";

export default function PaymentSuccessScreen() {
    const router = useRouter()
  return (
    <View style={styles.container}>
      {/* Success Animation */}
      <LottieView
        source={require("./assets/success.json")} // Add success.json animation in assets folder
        autoPlay
        loop={false}
        style={styles.animation}
      />

      <Text style={styles.successText}>Payment Successful!</Text>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => router.push("/")}
      >
        <Text style={styles.buttonText}>Go Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  animation: {
    width: 200,
    height: 200,
  },
  successText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4CAF50",
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
