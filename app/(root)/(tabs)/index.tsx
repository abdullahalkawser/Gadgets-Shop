import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const categories = ["Laptops", "Mobiles", "iPads"];
const allProducts = [
  { id: "1", name: "MacBook Pro", price: "$1299", image: "https://via.placeholder.com/100", category: "Laptops" },
  { id: "2", name: "Dell XPS 15", price: "$1499", image: "https://via.placeholder.com/100", category: "Laptops" },
  { id: "3", name: "iPhone 15 Pro", price: "$999", image: "https://via.placeholder.com/100", category: "Mobiles" },
  { id: "4", name: "Samsung Galaxy S23", price: "$899", image: "https://via.placeholder.com/100", category: "Mobiles" },
  { id: "5", name: "iPad Pro 12.9", price: "$1099", image: "https://via.placeholder.com/100", category: "iPads" },
  { id: "6", name: "Lenovo ThinkPad", price: "$1299", image: "https://via.placeholder.com/100", category: "Laptops" },
  { id: "7", name: "Google Pixel 8", price: "$799", image: "https://via.placeholder.com/100", category: "Mobiles" },
  { id: "8", name: "iPad Air", price: "$699", image: "https://via.placeholder.com/100", category: "iPads" },
  { id: "9", name: "OnePlus 11", price: "$799", image: "https://via.placeholder.com/100", category: "Mobiles" },
  { id: "10", name: "HP Spectre x360", price: "$1399", image: "https://via.placeholder.com/100", category: "Laptops" },
];

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState("Laptops");

  return (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      {/* Header Section */}
      <View
        style={{
          backgroundColor: "red",
          paddingVertical: 30,
          paddingHorizontal: 16,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Avatar & Name */}
        <View style={{ flexDirection: "row", alignItems: "center", top:10 }}>
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/men/41.jpg" }}
            style={{ width: 50, height: 50, borderRadius: 25, borderWidth: 2, borderColor: "white" }}
          />
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold", marginLeft: 20, }}>
          Abdullah {'\n'}AL Kawser
          </Text>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          onPress={() => alert("Logged out")}
          style={{
            backgroundColor: "white",
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 20,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <MaterialIcons name="logout" size={20} color="#2C3E50" />
          <Text style={{ color: "#2C3E50", fontWeight: "bold", marginLeft: 6 }}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View
        style={{
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
        }}
      >
        <MaterialIcons name="search" size={24} color="#777" />
        <TextInput
          placeholder="Search for products..."
          style={{ flex: 1, fontSize: 16, paddingVertical: 10, marginLeft: 8 }}
        />
      </View>

      {/* Category Section (Horizontal Scroll) */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 16, paddingLeft: 16 }}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            onPress={() => setSelectedCategory(category)}
            style={{
              backgroundColor: selectedCategory === category ? "#FF6347" : "white",
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 20,
              marginRight: 16,
              flexDirection: "row",
              alignItems: "center",
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 4,
            }}
          >
            <Image
              source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
              style={{ width: 25, height: 25, borderRadius: 12, marginRight: 8 }}
            />
            <Text style={{ fontWeight: "bold", color: selectedCategory === category ? "white" : "#2C3E50" }}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Product List */}
      <FlatList
        data={allProducts.filter((p) => p.category === selectedCategory)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "white",
              marginHorizontal: 16,
              marginTop: 12,
              borderRadius: 12,
              padding: 16,
              flexDirection: "row",
              alignItems: "center",
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowOffset: { width: 0, height: 4 },
              shadowRadius: 6,
            }}
          >
            {/* Image */}
            <Image source={{ uri: item.image }} style={{ width: 80, height: 80, borderRadius: 10 }} />

            {/* Details */}
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold", color: "#333" }}>{item.name}</Text>
              <Text style={{ fontSize: 16, color: "#777", marginTop: 4 }}>{item.price}</Text>

              {/* Review & Add Button */}
              <View style={{ flexDirection: "row", marginTop: 10 }}>
                <TouchableOpacity
                  onPress={() => alert("Viewing Reviews")}
                  style={{
                    backgroundColor: "#FFD700",
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 20,
                    marginRight: 8,
                  }}
                >
                  <Text style={{ fontWeight: "bold", color: "#2C3E50" }}>⭐ Reviews</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => alert("Added to Cart")}
                  style={{
                    backgroundColor: "#FF6347",
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 20,
                  }}
                >
                  <Text style={{ fontWeight: "bold", color: "white" }}>+ Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}
