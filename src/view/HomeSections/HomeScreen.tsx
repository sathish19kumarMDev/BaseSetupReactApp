import React, { useCallback, useState } from "react"
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageBackground,
  Dimensions,
  Image,
  TextInput,
} from "react-native"
import { observer } from "mobx-react-lite"
import { useInjection } from "inversify-react"
import { useFocusEffect } from "@react-navigation/native"
import HomeVM from "../../viewModel/HomeVM"
import TYPES from "../../dependancyInjector/types"
import { ProductListResponseModel } from "../../model/apiResponseModel/ProductListResponseModel"

const windowWidth = Dimensions.get("window").width

const products = [
  { id: "1", name: "Samsung Galaxy S23", image: "https://placehold.co/150x150?text=Galaxy+S23", price: 799 },
  { id: "2", name: "iPhone 14 Pro", image: "https://placehold.co/150x150?text=iPhone+14+Pro", price: 999 },
  { id: "3", name: "Redmi Note 12", image: "https://placehold.co/150x150?text=Redmi+Note+12", price: 249 },
  { id: "4", name: "OnePlus 11R", image: "https://placehold.co/150x150?text=OnePlus+11R", price: 429 },
  { id: "5", name: "Realme Narzo 60", image: "https://placehold.co/150x150?text=Narzo+60", price: 199 },
  { id: "6", name: "Vivo V27 Pro", image: "https://placehold.co/150x150?text=Vivo+V27+Pro", price: 379 },
  { id: "7", name: "iQOO Z7", image: "https://placehold.co/150x150?text=iQOO+Z7", price: 239 },
  { id: "8", name: "Motorola Edge 40", image: "https://placehold.co/150x150?text=Edge+40", price: 429 },
  { id: "9", name: "Poco X5 Pro", image: "https://placehold.co/150x150?text=Poco+X5+Pro", price: 319 },
  { id: "10", name: "Lava Blaze 5G", image: "https://placehold.co/150x150?text=Lava+Blaze+5G", price: 149 },
  { id: "11", name: "Samsung M14 5G", image: "https://placehold.co/150x150?text=Samsung+M14+5G", price: 199 },
  { id: "12", name: "Apple iPhone SE 2022", image: "https://placehold.co/150x150?text=iPhone+SE+2022", price: 429 },
  { id: "13", name: "Nokia G42 5G", image: "https://placehold.co/150x150?text=Nokia+G42+5G", price: 159 },
  { id: "14", name: "Infinix Zero 5G", image: "https://placehold.co/150x150?text=Infinix+Zero+5G", price: 189 },
  { id: "15", name: "Micromax IN Note 2", image: "https://placehold.co/150x150?text=Micromax+Note+2", price: 179 },
  { id: "16", name: "Asus ROG Phone 6", image: "https://placehold.co/150x150?text=ROG+Phone+6", price: 899 },
  { id: "17", name: "Google Pixel 7a", image: "https://placehold.co/150x150?text=Pixel+7a", price: 499 },
  { id: "18", name: "Nothing Phone 2", image: "https://placehold.co/150x150?text=Nothing+Phone+2", price: 599 },
  { id: "19", name: "Tecno Camon 20", image: "https://placehold.co/150x150?text=Camon+20", price: 169 },
  { id: "20", name: "Honor 90 5G", image: "https://placehold.co/150x150?text=Honor+90+5G", price: 349 },
]

type Props = {
  item : ProductListResponseModel
}

const ProductCard = ({ item }: Props) => {
    return (
      <ImageBackground
        source={{ uri: item.image }}
        style={styles.card}
        imageStyle={{ borderRadius: 10 }}
      >
        <View style={styles.overlay}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>${item.price}</Text>
        </View>
      </ImageBackground>
    )
  }
  
  const HomeScreen = () => {
    const viewModel = useInjection<HomeVM>(TYPES.THomeVM)
    const [search, setSearch] = useState("")
  
    useFocusEffect(
      useCallback(() => {
        const apiCall = async () => {
          await viewModel.callApi("")
        }
        apiCall()
      }, [])
    )
  
    return (
      <View style={styles.container}>
        {/* 🔍 Search Bar */}
        <View style={styles.searchContainer}>
          {/* <Icon name="search" size={20} color="#555" style={styles.searchIcon} /> */}
          <TextInput
            placeholder="Search products"
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
            placeholderTextColor="#888"
          />
        </View>
  
        {/* 🖼️ Banner */}
        <Image
          source={{ uri: "https://placehold.co/400x200?text=Banner" }}
          style={styles.banner}
          resizeMode="cover"
        />
  
        {/* 🛒 Product List */}
        <FlatList
          data={viewModel.productList}
          renderItem={({ item }) => <ProductCard item={item} />}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    )
  }
  
  export default observer(HomeScreen)
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff"
    },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#f1f1f1",
      borderRadius: 25,
      margin: 10,
      paddingHorizontal: 12,
      height: 45,
    },
    searchIcon: {
      marginRight: 8,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      color: "#000",
    },
    banner: {
      width: windowWidth - 20,
      height: 200,
      borderRadius: 10,
      alignSelf: "center",
      backgroundColor:"orange",
      marginVertical: 10,
    },
    row: {
      justifyContent: "space-between",
      paddingHorizontal: 10,
      marginTop: 10,
    },
    card: {
      width: (windowWidth - 30) / 2,
      height: 180,
      borderRadius: 10,
      overflow: "hidden",
      backgroundColor: "red",
      justifyContent: "flex-end",
    },
    overlay: {
      backgroundColor: "rgba(0,0,0,0.5)",
      padding: 8,
    },
    name: {
      color: "white",
      fontWeight: "bold",
      fontSize: 14,
    },
    price: {
      color: "#FFD700",
      fontWeight: "600",
      fontSize: 13,
      marginTop: 4,
    },
  })
  