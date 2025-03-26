import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';
import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import SplashScreen from '@/components/splashScreen';


export default function AuthRoutesLayout() {
  const [isShowSplashScreen, setIsShowSplashScreen] = useState(true);
  const { isSignedIn } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShowSplashScreen(false);
    }, 9000);

    return () => clearTimeout(timer); // Cleanup function
  }, []);

  console.log('isSignedIn:', isSignedIn);

  if (isShowSplashScreen) {
    return <SplashScreen />;
  }

  if (!isSignedIn) {
    return <Redirect href={'/(auth)/sign-up'} />;
  }

  return <Redirect href={'/(root)/(tabs)'} />;
}
