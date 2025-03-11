import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, Modal, Animated } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useCartStore } from "@/store/cartStore"; // Assuming the cart store is still available
import { useRouter } from "expo-router";

export default function OrderScreen() {
  const { items, getTotalPrice } = useCartStore();
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial opacity for animation

  // Handle Confirm Order button click
  const handleConfirmOrder = () => {
    // Show the modal with animation
    setModalVisible(true);
    Animated.timing(fadeAnim, {
      toValue: 1,  // Fade in effect
      duration: 500,  // Duration of the fade-in animation
      useNativeDriver: true,
    }).start();

    // Optionally, you can add a delay before redirecting or closing the modal
    setTimeout(() => {
      router.push("/order-success");
    }, 2000);  // Wait for 2 seconds before redirecting to the success page
  };

  // Handle Payment button click
  const handlePayment = () => {
    // Redirect user to payment screen or handle payment logic here
    alert("Proceeding to Payment!");
    router.push("/payment");
  };

  return (
    <View style={styles.container}>
      {/* Order Title */}
      <Text style={styles.orderTitle}>Your Order</Text>

      {/* Order Item List */}
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <Image source={item.heroImage} style={styles.productImage} />

            <View style={styles.productDetails}>
              <Text style={styles.productTitle}>{item.title}</Text>
              <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>

              {/* Quantity */}
              <Text style={styles.productQuantity}>Quantity: {item.quantity}</Text>
            </View>
          </View>
        )}
      />

      {/* Total Price */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total Price</Text>
        <Text style={styles.totalAmount}>${getTotalPrice().toFixed(2)}</Text>
      </View>

      {/* Confirm Order Button */}
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmOrder}>
        <Text style={styles.confirmButtonText}>Confirm Order</Text>
      </TouchableOpacity>

      {/* Payment Button */}
      <TouchableOpacity style={styles.paymentButton} onPress={handlePayment}>
        <Text style={styles.paymentButtonText}>Proceed to Payment</Text>
      </TouchableOpacity>

      {/* Modal for Order Confirmation */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <Animated.View style={[styles.modalContent, { opacity: fadeAnim }]}>
            <Text style={styles.modalTitle}>Order Confirmed!</Text>
            <Text style={styles.modalMessage}>Your order has been successfully confirmed. You will be redirected shortly.</Text>
            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeModalButtonText}>Close</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  orderTitle: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  orderItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  productDetails: {
    flex: 1,
    justifyContent: "space-between",
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  productPrice: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
  },
  productQuantity: {
    fontSize: 14,
    color: "#777",
    marginTop: 5,
  },
  totalContainer: {
    marginTop: 20,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  totalLabel: {
    fontSize: 18,
    color: "#333",
  },
  totalAmount: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FF6347",
    marginTop: 10,
  },
  confirmButton: {
    backgroundColor: "#FF6347",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  confirmButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  paymentButton: {
    backgroundColor: "#32CD32",  // Green color for the payment button
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  paymentButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  // Modal Styles
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",  // Semi-transparent background
  },
  modalContent: {
    width: 300,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#32CD32",  // Green color for confirmation
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  closeModalButton: {
    backgroundColor: "#FF6347",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  closeModalButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});
