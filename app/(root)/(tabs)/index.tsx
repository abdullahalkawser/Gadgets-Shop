import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      {/* Header Section */}
      <View
        style={{
          backgroundColor: "#2C3E50",
          paddingVertical: 30, // Increased padding for a bigger header
          paddingHorizontal: 16,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Avatar & Name */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={{
              uri: "https://randomuser.me/api/portraits/men/41.jpg", // Change to your user's image
            }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              borderWidth: 2,
              borderColor: "white",
            }}
          />
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontWeight: "bold",
              marginLeft: 12,
            }}
          >
            Abdullah AL{"\n"}Kawser
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
          <Text style={{ color: "#2C3E50", fontWeight: "bold", marginLeft: 6 }}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>

      {/* Body Content (Example) */}
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: "bold", color: "#2C3E50" }}>
          Welcome to the Home Screen!
        </Text>
      </View>
    </View>
  );
}
