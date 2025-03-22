import { tokenCache } from '@/cache';
import { ClerkLoaded, ClerkProvider } from '@clerk/clerk-expo';
import { StripeProvider } from '@stripe/stripe-react-native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback } from 'react';
import { View } from 'react-native';
import 'react-native-reanimated';
import { ToastProvider } from 'react-native-toast-notifications';
const publishableKeys ="pk_test_51OptiBGH41gt1tTCsBfasVJRiHPKhmPRUxJMq8Ead0Anxu4G1jhi4T83Tiig2G9cQ9HtFhOdkv4Mp5B71qzLXtLB00qkiGFaCu"

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!
console.log(publishableKey)

if (!publishableKey) {
  throw new Error('Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env')
}



// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  // Hide splash screen when assets are loaded
  const onLayoutRootView = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
      <StripeProvider   publishableKey={publishableKeys}>
    <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <ToastProvider>
          <Stack>
          {/* <Stack.Screen name="index" options={{ headerShown: false }} /> */}
          <Stack.Screen name="home" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(root)" options={{ headerShown: false }} />
        
          <Stack.Screen name="+not-found" />
      </Stack>
      </ToastProvider>
       <StatusBar style="auto" />
    </View>
    </StripeProvider>
    </ClerkLoaded>
    </ClerkProvider>

  


  );
}
