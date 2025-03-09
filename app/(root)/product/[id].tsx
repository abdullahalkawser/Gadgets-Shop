import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, FlatList, Modal } from "react-native";
import { PRODUCTS } from "@/assets/products"; // Ensure PRODUCTS is correctly imported
import { AntDesign } from "@expo/vector-icons"; // Importing icon from Expo
import { useRouter } from "expo-router"; // Importing router to navigate
import { Stack } from "expo-router"; // Import Stack to define screen headers

export default function ProductDetails() {
  const { id } = useLocalSearchParams();  
  const product = PRODUCTS.find((p) => p.id.toString() === id); // Ensure correct ID match
  const [cartCount, setCartCount] = useState(1); // Default to 1 item in the cart
  const [modalVisible, setModalVisible] = useState(false); // State to control the zoom modal visibility
  const [selectedImageIndex, setSelectedImageIndex] = useState(null); // State to store the selected image index
  const router = useRouter();

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Product Not Found</Text>
        <Text style={styles.errorText}>The product you're looking for does not exist.</Text>
      </View>
    );
  }

  // Handle increasing and decreasing the quantity of the product
  const increaseQuantity = () => setCartCount(cartCount + 1);
  const decreaseQuantity = () => cartCount > 1 && setCartCount(cartCount - 1);

  // Navigate to the Cart page
  const goToCart = () => {
    router.push("/cart");
  };

  // Handle image click to open modal
  const openImageModal = (index) => {
    setSelectedImageIndex(index);
    setModalVisible(true);
  };

  // Handle the close of modal
  const closeModal = () => {
    setModalVisible(false);
    setSelectedImageIndex(null);
  };

  // Handle next and previous image navigation
  const nextImage = () => {
    if (selectedImageIndex < product.imagesUrl.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  const previousImage = () => {
    if (selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Product Details",
          headerRight: () => (
            <TouchableOpacity onPress={goToCart} style={styles.cartIcon}>
              <AntDesign name="shoppingcart" size={24} color="black" />
              {cartCount > 0 && (
                <Text style={styles.cartCountText}>{cartCount}</Text>
              )}
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView contentContainerStyle={styles.container}>
        {/* Hero Image */}
        <Image source={product.heroImage} style={styles.heroImage} />
        
        {/* Title, Slug */}
        <Text style={styles.title}>{product.title}</Text>

        {/* Price and Total Price */}
        <View style={styles.priceContainer}>
          <View style={styles.priceWrapper}>
            <Text style={styles.price}>Unit Price: ${product.price.toFixed(2)}</Text>
          </View>
          <View style={styles.priceWrapper}>
            <Text style={styles.totalPrice}>Total Price: ${(product.price * cartCount).toFixed(2)}</Text>
          </View>
        </View>

        {/* Quantity Selector */}
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={decreaseQuantity} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{cartCount}</Text>
          <TouchableOpacity onPress={increaseQuantity} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Add to Cart Button */}
        <TouchableOpacity style={styles.cartButton} onPress={() => alert('Added to Cart')}>
          <AntDesign name="shoppingcart" size={20} color="white" />
          <Text style={styles.cartButtonText}>Add to Cart</Text>
        </TouchableOpacity>

        {/* Thumbnails of other images in a row */}
        <FlatList
          horizontal
          data={product.imagesUrl}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => openImageModal(index)}>
              <Image source={item} style={styles.thumbnail} />
            </TouchableOpacity>
          )}
        />
      </ScrollView>

      {/* Modal to show enlarged image */}
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={closeModal} style={styles.modalCloseButton}>
            <AntDesign name="closecircle" size={30} color="white" />
          </TouchableOpacity>

          <TouchableOpacity onPress={previousImage} style={styles.modalNavButton}>
            <AntDesign name="leftcircle" size={30} color="white" />
          </TouchableOpacity>

          <Image source={product.imagesUrl[selectedImageIndex]} style={styles.modalImage} />

          <TouchableOpacity onPress={nextImage} style={styles.modalNavButton}>
            <AntDesign name="rightcircle" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  heroImage: {
    width: "100%",
    height: 400,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  priceWrapper: {
    flex: 1,
    alignItems: "center",
  },
  price: {
    fontSize: 18,
    color: "green",
  },
  totalPrice: {
    fontSize: 18,
    color: "#FF6347",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  quantityButton: {
    backgroundColor: "#FF6347",
    padding: 10,
    borderRadius: 5,
  },
  quantityButtonText: {
    color: "white",
    fontSize: 18,
  },
  quantityText: {
    fontSize: 20,
    marginHorizontal: 15,
  },
  cartButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF6347",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  cartButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 5,
  },
  cartIcon: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  cartCountText: {
    position: "absolute",
    top: -5,
    right: -10,
    backgroundColor: "red",
    borderRadius: 10,
    color: "white",
    fontSize: 12,
    padding: 5,
  },
  thumbnail: {
    width: 150,
    height: 100,
    margin: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalImage: {
    width: "90%",
    height: "80%",
    resizeMode: "contain",
  },
  modalCloseButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 1,
  },
  modalNavButton: {
    position: "absolute",
    top: "50%",
    zIndex: 2,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 50,
  },
});
