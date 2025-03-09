import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { CATEGORIES } from '@/assets/categories';

const CategoryList = () => {
  return (
    <View style={styles.container}>
    
      <Image source={require('../assets/images/hero.png')} style={styles.heroImage} />
      <Text style={styles.context}>Category</Text>
      <FlatList
        data={CATEGORIES}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.slug}
        renderItem={({ item }) => (
          <View style={styles.categoryItem}>
            <Image source={{ uri: item.imageUrl }} style={styles.categoryImage} />
            <Text style={styles.categoryText}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  heroImage: {
    width: '100%',
  
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
    borderRadius: 20, // Rounded corners for better aesthetics
    borderWidth: 2,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // Shadow effect for Android

  },
  categoryItem: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 40, // 100% round
    borderWidth: 2,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  categoryText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  context:{
    fontSize:20,

    fontWeight: "bold",
    marginBottom:10,
    marginLeft:20
  },
});

export default CategoryList;
