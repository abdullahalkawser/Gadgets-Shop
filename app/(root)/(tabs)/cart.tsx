import React from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "expo-router";

export default function CartScreen() {
  const { items, increment, decrement, removeItem, getTotalPrice } = useCartStore();
  const router = useRouter();


  // Handle checkout button click
  const handleCheckout = () => {

    router.push({
      pathname: "/order",
      
    });
  };

  return (
    <View style={styles.container}>
      {/* Cart Title */}
      <Text style={styles.cartTitle}> Cart</Text>

      {/* Cart Item List */}
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={item.heroImage} style={styles.productImage} />
            <View style={styles.productDetails}>
              <Text style={styles.productTitle}>{item.title}</Text>
              <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>

              {/* Quantity Controller */}
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => decrement(item.id)}
                >
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => increment(item.id)}
                >
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Remove Item Button */}
            <TouchableOpacity
              onPress={() => removeItem(item.id)}
              style={styles.removeItemButton}
            >
              <MaterialIcons name="delete" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Total Price and Checkout Button */}
      <View style={styles.totalCheckoutContainer}>
        <View style={styles.totalPriceContainer}>
          <Text style={styles.totalPriceLabel}>Total Price</Text>
          <Text style={styles.totalPrice}>${getTotalPrice().toFixed(2)}</Text>
        </View>

        {/* Checkout Button */}
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.checkoutButtonText}>Proceed to Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  cartTitle: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  cartItem: {
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
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  quantityButton: {
    backgroundColor: "#FF6347",
    padding: 8,
    borderRadius: 5,
  },
  quantityButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 15,
  },
  removeItemButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  totalCheckoutContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    paddingBottom: 20,
    backgroundColor: '#e0f7fa',
    padding: 20,
    marginBottom: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    borderRadius: 10,
  },
  totalPriceContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  totalPriceLabel: {
    fontSize: 18,
    color: "#333",
  },
  totalPrice: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FF6347",
  },
  checkoutButton: {
    backgroundColor: "#FF6347",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  checkoutButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});
