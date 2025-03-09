import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  StyleSheet,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; // For navigation
import { PRODUCTS } from "@/assets/products"; // Assuming PRODUCTS is an array of product objects.
import ProductList from "@/components/product";
import CategoryList from "@/components/listHeader";

export default function HomeScreen() {
  const router = useRouter(); // Use router for navigation

  // Navigate to Cart Page
  const goToCart = () => {
    router.push("/cart"); // Assuming "/cart" is the path to the cart page
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        {/* Avatar & Name */}
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/men/41.jpg" }}
            style={styles.avatar}
          />
          <Text style={styles.userName}>
            Abdullah {'\n'}AL Kawser
          </Text>
        </View>

        {/* Cart Icon Button */}
        <TouchableOpacity onPress={goToCart} style={styles.cartButton}>
          <MaterialIcons name="shopping-cart" size={24} color="white" />
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity
          onPress={() => alert("Logged out")}
          style={styles.logoutButton}
        >
          <MaterialIcons name="logout" size={20} color="#2C3E50" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <MaterialIcons name="search" size={24} color="#777" />
        <TextInput
          placeholder="Search for products..."
          style={styles.searchInput}
        />
      </View>

      {/* Scrollable Content */}
      <ScrollView style={styles.scrollContainer}>
        {/* Category List */}
        <CategoryList />

        {/* Product List */}
        <Text style={styles.productext}>Product</Text>
        <FlatList
          data={PRODUCTS}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ProductList product={item} />}
          numColumns={2}
          contentContainerStyle={styles.productList}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContainer: {
    flexGrow: 1, // Ensures content stretches as needed
  },
  header: {
    backgroundColor: "#FF6347", // Tomato color for a warm feel
    paddingVertical: 30,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5, // For Android shadow
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "white",
  },
  userName: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 20,
  },
  logoutButton: {
    backgroundColor: "white",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  logoutText: {
    color: "#2C3E50",
    fontWeight: "bold",
    marginLeft: 6,
  },
  cartButton: {
    backgroundColor: "#FF6347",
    padding: 10,
    borderRadius: 50,
  },
  searchBar: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 16,
    paddingHorizontal: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
    marginLeft: 8,
    height: 40,
    fontFamily: 'Roboto', // You can choose any modern font
  },
  productList: {
    paddingBottom: 20,
    paddingTop: 10,
  },
  productext: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 20,
  },
});
