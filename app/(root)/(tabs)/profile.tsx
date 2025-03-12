import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const { signOut } = useAuth(); // Clerk's signOut method
  const router = useRouter(); // To navigate to other pages

  // Function to handle logout
  const handleLogout = async () => {
    try {
      await signOut(); // Logs the user out from Clerk
      router.replace("/(auth)/sign-in"); // Redirects to the sign-in page
    } catch (err) {
      console.error("Error logging out", err);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5", padding: 20 }}>
      {/* Profile Image Section */}
      <View style={{ alignItems: "center", marginTop: 40 }}>
        <Image
          source={{
            uri: "https://randomuser.me/api/portraits/men/41.jpg", // Change to user's image
          }}
          style={{
            width: 140, // Bigger profile image
            height: 140,
            borderRadius: 70,
            borderWidth: 4,
            borderColor: "#FF6347",
          }}
        />
      </View>

      {/* User Information Section */}
      <View
        style={{
          backgroundColor: "white",
          padding: 20,
          borderRadius: 15,
          marginTop: 20,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 4 },
          shadowRadius: 6,
        }}
      >
        {/* Name */}
        <View
          style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}
        >
          <MaterialIcons name="person" size={24} color="#FF6347" />
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#2C3E50",
              marginLeft: 10,
            }}
          >
            Abdullah AL KAWSER
          </Text>
        </View>

        {/* Phone Number */}
        <View
          style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}
        >
          <MaterialIcons name="phone" size={24} color="#FF6347" />
          <Text style={{ fontSize: 16, color: "#555", marginLeft: 10 }}>
            +880 1234 567 890
          </Text>
        </View>

        {/* Email */}
        <View
          style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}
        >
          <MaterialIcons name="email" size={24} color="#FF6347" />
          <Text style={{ fontSize: 16, color: "#555", marginLeft: 10 }}>
            kauser@email.com
          </Text>
        </View>

        {/* Address */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialIcons name="location-on" size={24} color="#FF6347" />
          <Text
            style={{
              fontSize: 16,
              color: "#555",
              marginLeft: 10,
              flex: 1,
              flexWrap: "wrap",
            }}
          >
            123, Dhaka, Bangladesh
          </Text>
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        onPress={handleLogout}
        style={{
          backgroundColor: "#FF6347",
          padding: 14,
          borderRadius: 30,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 40,
          shadowColor: "#000",
          shadowOpacity: 0.2,
          shadowOffset: { width: 0, height: 4 },
          shadowRadius: 8,
        }}
      >
        <MaterialIcons name="logout" size={26} color="white" />
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 18,
            marginLeft: 10,
          }}
        >
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}
