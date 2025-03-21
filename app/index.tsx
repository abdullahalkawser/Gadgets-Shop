import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';
import { StripeProvider } from "@stripe/stripe-react-native";
import PaymentScreen from '@/components/PaymentScreen';


export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth();
  console.log('isSignedIn:', isSignedIn);

  if (!isSignedIn) {
    return <Redirect href={'/(auth)/sign-up'} />;
  }

  return (
    <StripeProvider publishableKey="pk_test_51OptiBGH41gt1tTCsBfasVJRiHPKhmPRUxJMq8Ead0Anxu4G1jhi4T83Tiig2G9cQ9HtFhOdkv4Mp5B71qzLXtLB00qkiGFaCu">
      <PaymentScreen />
      <Redirect href={'/(auth)/welcome'} />
    </StripeProvider>
  );
}
