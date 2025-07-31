import { useNavigation } from "@react-navigation/native"
import { StyleSheet, Text, View } from "react-native"
import { StackNavigation } from "../../../App"
import { useEffect } from "react"

const SplashScreen = () => {
    const navigation = useNavigation<StackNavigation>()
    
    useEffect(()=>{
        setTimeout(() => {
            navigation.reset({
                index: 0,
                routes: [{ name: 'HomeScreen' }],
              })
            
        },2000)
    },[])

    return (
        <View style={style.container}>
            <Text style={style.text}>Splash Screen</Text>
            <Text style={style.text}>Loading...</Text>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text:{
        fontSize: 20
    }
})

export default SplashScreen;