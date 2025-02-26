import React, {useEffect, useRef, useState} from "react";
import {View, Text, StyleSheet, FlatList, ViewToken, Dimensions, useWindowDimensions} from "react-native";
import SliderItem from "../components/SliderItem";
import { NewsDataType } from "../types";
import Animated, {
    runOnJS,
    useAnimatedRef,
    useAnimatedScrollHandler,
    useDerivedValue,
    useSharedValue
} from "react-native-reanimated";
import Pagination from "../components/Pagination";

type Props = {
    newsList: Array<NewsDataType>;
};

const BreakingNews = ({ newsList }: Props) => {
    const [data, setData] = useState(newsList);
    const [paginationIndex, setPaginationIndex] = useState(0);
    const scrollX = useSharedValue(0);
    const ref = useAnimatedRef<Animated.FlatList<any>>();
    const [isAutoPlay, setIsAutoPlay] = useState(true);
    const interval = useRef<NodeJS.Timeout | null>(null);
    const offset = useSharedValue(0);
    const {width} = useWindowDimensions();

    const onScrollHandler = useAnimatedScrollHandler({
        onScroll: (e) => {
            scrollX.value = e.contentOffset.x;
        },
        onMomentumEnd:(e)=>{
            offset.value = e.contentOffset.x;
        }
    });

    //== auto play section ==//

    useEffect(() => {
        if (isAutoPlay) {
            interval.current = setInterval(() => {
                runOnJS(() => {
                    offset.value = offset.value + width;
                    ref.current?.scrollToOffset({ offset: offset.value, animated: true });
                })();
            }, 3000);
        } else {
            if (interval.current) {
                clearInterval(interval.current);
                interval.current = null;
            }
        }
        return () => {
            if (interval.current) clearInterval(interval.current);
        };
    }, [isAutoPlay]);

    useDerivedValue(() => {
        ref.current?.scrollToOffset({ offset: offset.value, animated: true });
    });

    const onViewableItemsChanged = ({
                                        viewableItems,
                                    }: {
        viewableItems: ViewToken[];
    }) => {
        if (viewableItems.length > 0 && viewableItems[0].index !== undefined) {
            setPaginationIndex(viewableItems[0].index % newsList.length);
        }
    };

    const viewabilityConfig = {
        itemVisiblePercentThreshold: 50,
    };

    const viewabilityConfigCallbackPairs = useRef([
        { viewabilityConfig, onViewableItemsChanged },
    ]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Breaking News</Text>
            {newsList.length > 0 ? (
                <Animated.FlatList
                    ref={ref}
                    data={data}
                    keyExtractor={(item, index) => item.id || `list_item${index}`}
                    renderItem={({ item, index }) => (
                        <SliderItem slideItem={item} index={index} scrollX={scrollX} />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    onScroll={onScrollHandler}
                    scrollEventThrottle={16}
                    viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                        if (data.length < newsList.length * 2) {
                            setData([...data, ...newsList]);
                        }
                    }}
                    onScrollBeginDrag={()=>{
                        setIsAutoPlay(false);
                    }}
                    onScrollEndDrag={()=>{
                        setIsAutoPlay(true);
                    }}
                />
            ) : (
                <Text>No breaking news available.</Text>
            )}

            <Pagination items={newsList} scrollX={scrollX} paginationIndex={paginationIndex} />
        </View>
    );
};

export default BreakingNews;

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "black",
        marginBottom: 10,
        marginLeft: 20,
    },
});
