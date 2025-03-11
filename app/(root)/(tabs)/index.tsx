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
import { useCartStore } from "@/store/cartStore";

export default function HomeScreen() {
  const router = useRouter();
  const { getItemCount } = useCartStore();

  // Navigate to Cart Page
  const goToCart = () => {
    router.push("/cart");
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
          <Text style={styles.userName}>Abdullah AL </Text>
        </View>

        {/* Cart Icon with Badge */}
        <TouchableOpacity onPress={goToCart} style={styles.cartButton} activeOpacity={0.7}>
          <MaterialIcons name="shopping-cart" size={24} color="white" />
          {getItemCount() > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{getItemCount()}</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity
          onPress={() => alert("Logged out")}
          style={styles.logoutButton}
          activeOpacity={0.7}
        >
          <MaterialIcons name="logout" size={20} color="#2C3E50" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <MaterialIcons name="search" size={24} color="#777" />
        <TextInput placeholder="Search for products..." style={styles.searchInput} />
      </View>

      {/* Scrollable Content */}
      <ScrollView style={styles.scrollContainer}>
        {/* Category List */}
        <CategoryList />

        {/* Product List */}
        <Text style={styles.productText}>Product</Text>
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
    flexGrow: 1,
  },
  header: {
    backgroundColor: "#FF6347",
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
    elevation: 5,
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
    position: "relative",
  },
  cartBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
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
  },
  productList: {
    paddingBottom: 20,
    paddingTop: 10,
    paddingHorizontal: 16,
  },
  productText: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 20,
  },
});
