import * as React from 'react';
import { Text, TextInput, Button, View, StyleSheet, SafeAreaView } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { Link } from 'expo-router'; 

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState('');
  const [error, setError] = React.useState('');

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    try {
      await signUp.create({ emailAddress, password });
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true);
      setError('');  // Clear any previous errors
    } catch (err) {
      console.error('Error during sign-up:', JSON.stringify(err, null, 2));
      setError('An error occurred while signing up. Please try again.');
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({ code });
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace('/(root)/(tabs)/profile');  
      } else {
        console.error('Verification failed', signUpAttempt);
        setError('Verification failed. Please check the code and try again.');
      }
    } catch (err) {
      console.error('Error during verification:', JSON.stringify(err, null, 2));
      setError('An error occurred during verification. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {pendingVerification ? (
        <View style={styles.card}>
          <Text style={styles.title}>Verify Your Email</Text>
          <TextInput
            style={styles.input}
            value={code}
            placeholder="Enter verification code"
            onChangeText={(code) => setCode(code)}
            keyboardType="number-pad"
          />
          {error && <Text style={styles.error}>{error}</Text>}
          <Button title="Verify" onPress={onVerifyPress} color="#007bff" />
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.title}>Sign Up</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Enter email"
            onChangeText={(email) => setEmailAddress(email)}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            value={password}
            placeholder="Enter password"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
          {error && <Text style={styles.error}>{error}</Text>}
          <Button title="Continue" onPress={onSignUpPress} color="#007bff" />
          <View style={styles.footer}>
            <Text>Already have an account?</Text>
            <Link href="/sign-in">
              <Text style={styles.link}>Login</Text>
            </Link>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  error: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  link: {
    color: '#007bff',
    fontWeight: 'bold',
  },
});
