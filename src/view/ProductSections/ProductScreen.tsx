import { StyleSheet, Text, View } from "react-native"
import {observer} from "mobx-react-lite"


const ProductScreem = () =>{
    return(
        <View style= {style.container}>
            <Text>Home Screen</Text>
        </View>
    )
}

const style = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default observer(ProductScreem)