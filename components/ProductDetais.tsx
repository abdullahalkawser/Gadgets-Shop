import { useLocalSearchParams } from "expo-router";
import { View, Text, ScrollView } from "react-native";

const ProductDetails = () => {
  const { slug } = useLocalSearchParams(); // Get product slug

  return (
    <ScrollView>
      <Text>Details for: {slug}</Text>
    </ScrollView>
  );
};

export default ProductDetails;
