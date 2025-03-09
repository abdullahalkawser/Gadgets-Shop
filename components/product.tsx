import { Link } from "expo-router";
import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";

export default function ProductList({ product }) {
  return (
<Link asChild href={`/products`}>
    <Pressable style={styles.productItem}>
      {/* Product Image */}
      <Image source={product.heroImage} style={styles.productImage} />

      {/* Product Title */}
      <Text style={styles.productTitle}>{product.title}</Text>

      {/* Product Price */}
      <Text style={styles.productPrice}>${product.price.toFixed(3)}</Text>
    </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  productItem: {
    flex: 1,
    margin: 8,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3, // For Android shadow
    justifyContent: "center",
    alignItems: "center",
  },
  productImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  productPrice: {
    fontSize: 14,
    color: "#FF6347", // Price color (Tomato)
  },
});
