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
  