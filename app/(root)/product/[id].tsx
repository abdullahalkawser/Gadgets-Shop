import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, FlatList, Modal } from "react-native";
import { PRODUCTS } from "@/assets/products";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Stack } from "expo-router";
import { useCartStore } from "@/store/cartStore";
import { useToast } from 'react-native-toast-notifications';

export default function ProductDetails() {
  const { id } = useLocalSearchParams();
  const product = PRODUCTS.find((p) => p.id.toString() === id);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const router = useRouter();
  const { items, addItem, increment, decrement } = useCartStore();
  const toast = useToast();

  // Get the current quantity of the product in the cart
  const cartItem = items.find((item) => item.id === product?.id);
  const cartCount = cartItem ? cartItem.quantity : 0;

  // Handle adding to cart
  const handleAddToCart = () => {
    if (product && cartCount === 0) {
      addItem(product, 1); // Adds the product to the cart with quantity 1 by default
    }
    toast.show(`${product.title} added to cart!`, {
      type: "success",
      placement: "top", // Set the position of the toast
      duration: 2000, // Ensure it shows long enough
      style: {
        top: 100,       // Set the position to 100 units from the top
      },
    });
  };

  // Handle increasing the quantity of the product
  const increaseQuantity = () => {
    if (product) {
      if (cartCount === 0) {
        addItem(product, 1);  // Add the item with quantity 1 if it's not in the cart
      } else {
        increment(product.id);  // If the product is already in the cart, increment by 1
      }
      toast.show(`${product.title} added to cart!`, {
        type: 'success',
        placement: "top", // Set the position of the toast
        duration: 2000, // Ensure it shows long enough
        style: {
          top: 100,       // Set the position to 100 units from the top
        },
      });
    }
  };

  // Handle decreasing the quantity of the product
  const decreaseQuantity = () => {
    if (product && cartCount > 0) {
      decrement(product.id);  // This will decrease the quantity by 1, ensuring it doesn't go below 0
      toast.show(`${product.title} removed from cart!`, {
        type: 'info',
        placement: "top", // Set the position of the toast
        duration: 2000, // Ensure it shows long enough
        style: {
          top: 100,       // Set the position to 100 units from the top
        },
      });
    }
  };

  // Navigate to the Cart page
  const goToCart = () => {
    router.push("/(root)/(tabs)/cart");
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
              {cartCount > 0 && <Text style={styles.cartCountText}>{cartCount}</Text>}
            </TouchableOpacity>
          ),
        }}
      />
      
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={product.heroImage} style={styles.heroImage} />
        <Text style={styles.title}>{product.title}</Text>

        <View style={styles.priceContainer}>
          <View style={styles.priceWrapper}>
            <Text style={styles.price}>Unit Price: ${product.price.toFixed(2)}</Text>
          </View>
          <View style={styles.priceWrapper}>
            <Text style={styles.totalPrice}>Total Price: ${(product.price * cartCount).toFixed(2)}</Text>
          </View>
        </View>

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

      <View style={styles.quantityAndCartContainer}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={decreaseQuantity} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{cartCount}</Text>
          <TouchableOpacity onPress={increaseQuantity} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
          <AntDesign name="shoppingcart" size={20} color="white" />
          <Text style={styles.cartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
   
    alignItems: "center",
    backgroundColor: "#fff",
  },
  heroImage: {
    width: "100%",
    height: '300',
    resizeMode: "contain",
  
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
  quantityAndCartContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",  // Ensures space between quantity control and button
    width: "100%",  // Ensures full width usage
    marginBottom: 20,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
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
