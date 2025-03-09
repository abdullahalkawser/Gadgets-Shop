import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      {/* Tabs screen with no header */}
      <Stack.Screen 
        name="(tabs)" 
        options={{ headerShown: false }} 
      />
      {/* Product screen */}
      <Stack.Screen 
        name="product" 
        options={{ headerShown: false }} 
      />
    </Stack>
  );
};

export default Layout;
