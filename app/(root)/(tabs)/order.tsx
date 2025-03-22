import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, Modal } from "react-native";
import { CardField, useStripe } from "@stripe/stripe-react-native";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "expo-router";

export default function PaymentScreen() {
  const API_URL = "http://192.168.1.6:3000";
  const { confirmPayment } = useStripe();
  const { items, getTotalPrice } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [cardDetails, setCardDetails] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const fetchPaymentIntentClientSecret = async () => {
    try {
      const response = await fetch(`${API_URL}/create-payment-intent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: getTotalPrice() * 100 }),
      });

      const { clientSecret, error } = await response.json();
      return { clientSecret, error };
    } catch (error) {
      console.error("Error fetching payment intent:", error);
      return { error: "Network error" };
    }
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      const { clientSecret, error } = await fetchPaymentIntentClientSecret();
      if (error) {
        setPaymentStatus("Payment failed");
        Alert.alert("Payment Error", "Unable to process payment.");
      } else {
        const { paymentIntent, error: confirmError } = await confirmPayment(clientSecret, {
          paymentMethodType: "Card",
        });

        if (confirmError) {
          setPaymentStatus("Payment failed");
          Alert.alert("Payment Error", confirmError.message);
        } else if (paymentIntent) {
          setPaymentStatus("Payment successful");
          setModalVisible(true); // Show success modal
        }
      }
    } catch (e) {
      setPaymentStatus("Error making payment");
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Card Details:</Text>

      <CardField
        postalCodeEnabled={true}
        placeholders={{ number: "4242 4242 4242 4242" }}
        cardStyle={styles.cardField}
        style={styles.cardFieldWrapper}
        onCardChange={(card) => setCardDetails(card)}
      />

      {paymentStatus && <Text style={styles.status}>{paymentStatus}</Text>}

      <Text style={styles.totalText}>Total: ${getTotalPrice()}</Text>

      <TouchableOpacity
        style={[styles.payButton, isProcessing && styles.payButtonDisabled]}
        onPress={handlePayment}
        disabled={isProcessing}
      >
        <Text style={styles.payButtonText}>{isProcessing ? "Processing..." : "Pay Now"}</Text>
      </TouchableOpacity>

      {/* Success Modal */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>🎉 Payment Successful!</Text>
            <Text style={styles.modalText}>Thank you for your purchase.</Text>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setModalVisible(false);
                router.push("/"); // Navigate to home or another screen
              }}
            >
              <Text style={styles.closeButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F7F7F7",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  cardFieldWrapper: {
    width: "100%",
    height: 50,
    marginVertical: 30,
  },
  cardField: {
    backgroundColor: "#FFFFFF",
    textColor: "#000000",
    borderColor: "#CCCCCC",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    paddingRight: 10,
  },
  status: {
    fontSize: 18,
    marginTop: 10,
    color: "#FF6347",
  },
  totalText: {
    fontSize: 20,
    marginVertical: 10,
    color: "#333",
  },
  payButton: {
    backgroundColor: "#FF6347",
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  payButtonDisabled: {
    backgroundColor: "#FF7F7F",
  },
  payButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 30,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 18,
    color: "#333",
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
  },
  closeButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

