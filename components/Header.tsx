import {StyleSheet, View, Text, Image, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {Colors} from "../constants/Colors";

type Props = {}
const Header = (props: Props) => {

    //user profile//
    return (
        <View style={styles.container}>
            <View style={styles.userInfo}>
                <Image source={require("../assets/image/alina.jpg")} style={styles.userImg}/>
                <View style={{gap: 3}}>
                    <Text style={styles.welcomeTxt}>Welcome !!!</Text>
                    <Text style={styles.userName}>Sachini Madubhashini</Text>
                </View>
            </View>
            <TouchableOpacity onPress={() => {
            }}>
                <Ionicons name="notifications-outline" size={24} color="#000"/>
            </TouchableOpacity>
        </View>
    )
}
export default Header;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center",
        marginBottom:20
    },
    userImg: {
        width: 50,
        height: 50,
        borderRadius: 30,
    },
    userInfo: {
        marginLeft: 5,
        flexDirection: "row",
        alignItems: "center",
    },
    welcomeTxt: {
        marginLeft: 10,
        fontSize: 12,
        color: Colors.darkGrey,
    },
    userName: {
        marginLeft: 10,
        fontSize: 14,
        color: Colors.black,
        fontWeight: '700',

    }
})
