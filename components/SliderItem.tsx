import React from "react";
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {NewsDataType} from "../types";
import Animated, {Extrapolation, interpolate, SharedValue, useAnimatedStyle} from "react-native-reanimated";
import {LinearGradient} from "expo-linear-gradient";
import {Colors} from "../constants/Colors";
import {Link} from "expo-router";

//sliders//
type Props = {
    slideItem: NewsDataType;
    index: number;
    scrollX: SharedValue<number>;
};


const { width } = Dimensions.get("screen");

const SliderItem = ({ slideItem, index, scrollX }: Props) => {

    const rnStyle = useAnimatedStyle(()=>{
        return{
            transform: [
                {
                    translateX:interpolate(
                        scrollX.value,
                        [(index-1) * width , index * width,(index + 1) * width],
                        [-width * 0.15, 0, width * 0.15],
                        Extrapolation.CLAMP
                    ),
                },
                {
                    scale:interpolate(
                        scrollX.value,
                        [(index -1) * width , index * width , (index + 1) * width],
                        [0.9,1,0.9],
                        Extrapolation.CLAMP
                    ),
                },
            ],
        };
    });

    return (
        <Link href={`/news/${slideItem.article_id}`} asChild>
        <TouchableOpacity>
        <Animated.View key={index} style={[styles.itemWrapper,rnStyle]}>
            <Image source={{ uri: slideItem.image_url }} style={styles.image} />
            <LinearGradient colors={["transparent", "rgba(0,0,0,0.8)"]} style={styles.overlay}>
                <View style={styles.textContainer}>
                    <Text style={styles.title} numberOfLines={2}>{slideItem.title}</Text>
                    {/* <Text style={styles.description}>{slideItem.description}</Text> */}
                    {slideItem.source_icon && (
                        <Image source={{ uri: slideItem.source_icon }} style={styles.sourceIcon} />
                    )}
                    <Text style={styles.sourceName}>{slideItem.source_name}</Text>
                </View>
            </LinearGradient>
        </Animated.View>
        </TouchableOpacity>
        </Link>
    );
};

export default SliderItem;

const styles = StyleSheet.create({
    itemWrapper: {
        width: width,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },
    image: {
        width: width - 60,
        height: 180,
        borderRadius: 20,
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 30,
        right: 0,
        width: width - 60,
        height: 180,
        borderRadius: 20,
        padding: 20,

    },
    textContainer: {
        alignItems: "center",
        paddingBottom: 10,
    },
    title: {
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "center",
        color: "#fff",
    },
    description: {
        fontSize: 14,
        textAlign: "center",
        color: "#ddd",
    },
    sourceIcon: {
        width: 25,
        height: 25,
        borderRadius: 12.5,
        marginTop: 5,
    },
    sourceName: {
        fontSize: 12,
        fontWeight: "600",
        color:Colors.white,
    },


});