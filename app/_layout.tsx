import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback } from 'react';
import { View } from 'react-native';
import 'react-native-reanimated';
import { ToastProvider } from 'react-native-toast-notifications';


// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  // Hide splash screen when assets are loaded
  const onLayoutRootView = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  return (
    <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <ToastProvider>
          <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(root)" options={{ headerShown: false }} />
        
          <Stack.Screen name="+not-found" />
      </Stack>
      </ToastProvider>
       <StatusBar style="auto" />
    </View>

  


  );
}
