import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import newsCategoryList from "../constants/Categories";
import { Colors } from "../constants/Colors";
import { useRef, useState } from "react";
//category //
type Props = {
    onCategoryChanged: (category: string) => void;
};

const Categories: React.FC<Props> = ({ onCategoryChanged }) => {
    const scrollRef = useRef<ScrollView | null>(null);
    const itemRef = useRef<(TouchableOpacity | null)[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleSelectCategory = (index: number) => {
        setActiveIndex(index);

        itemRef.current[index]?.measure((x, y, width, height, pageX) => {
            scrollRef.current?.scrollTo({ x: pageX - 20, y: 0, animated: true });
        });

        onCategoryChanged(newsCategoryList[index].slug);
    };

    return (
        <View>
            <Text style={styles.title}>Trending Right Now</Text>
            <ScrollView
                ref={scrollRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.itemsWrapper}
            >
                {newsCategoryList.map((item, index) => (
                    <TouchableOpacity
                        ref={(el) => (itemRef.current[index] = el)}
                        key={index}
                        style={[styles.item, activeIndex === index && styles.activeItem]}
                        onPress={() => handleSelectCategory(index)}
                    >
                        <Text style={[styles.itemText, activeIndex === index && styles.itemTextActive]}>
                            {item.title}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

export default Categories;

const styles = StyleSheet.create({

    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "black",
        marginBottom: 10,
        marginLeft: 20,
    },
    itemsWrapper: {
        gap: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    item: {
        borderWidth: 1,
        borderColor: Colors.darkGrey,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 10,
    },
    activeItem: {
        backgroundColor: Colors.tabIconSelected,
        borderColor: Colors.tabIconSelected,
    },
    itemText: {
        fontSize: 14,
        color: "black",
        letterSpacing: 0.5,
    },
    itemTextActive: {
        color: "white",
        fontWeight: "bold",
    },
});
