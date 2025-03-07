import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function CartScreen() {
  // Sample cart data with useState
  const [cartItems, setCartItems] = useState([
    { id: "1", name: "Wireless Headphones", quantity: 1, price: 1200 },
    { id: "2", name: "Smart Watch", quantity: 2, price: 2500 },
    { id: "3", name: "Bluetooth Speaker", quantity: 1, price: 1800 },
  ]);

  // Calculate total cost
  const totalCost = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Function to remove item from cart
  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5", padding: 20 }}>
      {/* Header */}
      <Text style={{ fontSize: 24, fontWeight: "bold", color: "#2C3E50", textAlign: "center", marginBottom: 20 }}>
        🛒 Shopping Cart
      </Text>

      {/* Cart Items List */}
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "white",
              padding: 15,
              borderRadius: 10,
              marginBottom: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 4,
            }}
          >
            <View>
              <Text style={{ fontSize: 18, fontWeight: "bold", color: "#2C3E50" }}>{item.name}</Text>
              <Text style={{ fontSize: 14, color: "#555" }}>Quantity: {item.quantity}</Text>
              <Text style={{ fontSize: 14, color: "#555" }}>Price: ${item.price}</Text>
            </View>
            {/* Remove Button */}
            <TouchableOpacity onPress={() => removeItem(item.id)}>
              <MaterialIcons name="delete" size={24} color="#FF6347" />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Total Price Section */}
      <View
        style={{
          backgroundColor: "#FF6347",
          padding: 15,
          borderRadius: 10,
          marginVertical: 10,
          marginBottom:60
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "white", textAlign: "center" }}>
          Total: ${totalCost}
        </Text>
      </View>

      {/* Checkout Button */}
      <TouchableOpacity
        onPress={() => alert("Proceeding to Checkout!")}
        style={{
          backgroundColor: "#2C3E50",
          padding: 15,
          borderRadius: 25,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MaterialIcons name="shopping-cart" size={24} color="white" />
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 16,
            marginLeft: 8,
          }}
        >
          Checkout
        </Text>
      </TouchableOpacity>
    </View>
  );
}
