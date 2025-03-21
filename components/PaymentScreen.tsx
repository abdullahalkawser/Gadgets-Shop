import React, { useState } from "react";
import { View, Button, Alert } from "react-native";
import { useStripe } from "@stripe/stripe-react-native";

export default function PaymentScreen() {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);

  const initializePaymentSheet = async () => {
    setLoading(true);
    try {
      // Create a PaymentIntent (Without Backend)
      const response = await fetch("https://api.stripe.com/v1/payment_intents", {
        method: "POST",
        headers: {
          "Authorization": `Bearer sk_test_your_secret_key`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "amount=5000&currency=usd&payment_method_types[]=card",
      });

      const { client_secret } = await response.json();

      if (!client_secret) {
        Alert.alert("Error", "Failed to create PaymentIntent");
        return;
      }

      const { error } = await initPaymentSheet({
        paymentIntentClientSecret: client_secret,
      });

      if (!error) {
        openPaymentSheet();
      } else {
        Alert.alert("Error", error.message);
      }
    } catch (error) {
      Alert.alert("Payment Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();
    if (error) {
      Alert.alert("Payment Failed", error.message);
    } else {
      Alert.alert("Success", "Your payment was successful!");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Pay Now" onPress={initializePaymentSheet} disabled={loading} />
    </View>
  );
}
