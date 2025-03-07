import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons"; 

export default function Layout() {
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#B0BEC5",
        tabBarShowLabel: true, // Show labels
        tabBarLabelStyle: {
          fontSize: 12, // Adjust text size
          fontWeight: "600",
          textAlign: "center",
          marginBottom: 6, // Space between text and icon
        },
        tabBarIconStyle: {
          alignItems: "center",
          justifyContent: "center",
        },
        tabBarStyle: {
          backgroundColor: "#2C3E50",
          borderRadius: 30,
          paddingBottom: 6,
          paddingTop: 6,
          marginHorizontal: 16,
          marginBottom: 24,
          height: 74,
          position: "absolute",
          shadowColor: "#000",
          shadowOpacity: 0.3,
          shadowOffset: { width: 0, height: 4 },
          shadowRadius: 8,
          display: "flex",
          justifyContent: "center", // Centers content in tab bar
          alignItems: "center",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chats",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="chat" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="rides"
        options={{
          title: "Rides",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="directions-car" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
