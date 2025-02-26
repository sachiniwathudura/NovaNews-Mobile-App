import { View, StyleSheet } from "react-native";
import { NewsDataType } from "../types";
import Animated, { interpolate, SharedValue, useAnimatedStyle } from "react-native-reanimated";

// news dot pagination//
type Props = {
    items: NewsDataType[];
    paginationIndex: number;
    scrollX: SharedValue<number>;
};

const Pagination = ({ items, paginationIndex, scrollX }: Props) => {
    return (
        <View style={styles.container}>
            {items.map((_, index) => {
                const animatedStyle = useAnimatedStyle(() => {
                    return {
                        width: interpolate(
                            scrollX.value,
                            [(index - 1) * 100, index * 100, (index + 1) * 100],
                            [8, 16, 8]
                        ),

                        opacity: interpolate(
                            scrollX.value,
                            [(index - 1) * 100, index * 100, (index + 1) * 100],
                            [0.5, 1, 0.5]
                        ),
                    };
                });

                return (
                    <Animated.View
                        key={index}
                        style={[
                            styles.dot,
                            {
                                backgroundColor: paginationIndex === index ? "#050407" : "#89858c",
                            },
                        ]}
                    />
                );
            })}
        </View>
    );
};

export default Pagination;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    dot: {
        height: 8,
        width: 8,
        marginHorizontal: 4,
        borderRadius: 8,
    },
});
