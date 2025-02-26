import {View, StyleSheet, TextInput} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {Colors} from "../constants/Colors";

//search bar//
type Props = {
    withHorizontalPadding: boolean,
    setSearchQuery: Function,
}

const SearchBar = ({withHorizontalPadding,setSearchQuery}: Props) => {
    return (
        <View style={[styles.container,withHorizontalPadding && {paddingHorizontal:20}]}>
            <View style={styles.searchBar}>
                <Ionicons name='search-outline' size={20} color={Colors.white} />
                <TextInput placeholder={'Search'} placeholderTextColor={Colors.lightGrey}
                style={styles.searchText}
                autoCapitalize="none"
                onChangeText={query => setSearchQuery(query)}/>
            </View>
        </View>
    )
}

export default SearchBar;

const styles = StyleSheet.create({
    container: {
        //marginHorizontal: 20,
        marginBottom:20
    },
    searchBar: {
        backgroundColor: '#d3d1d1',
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderRadius:10,
        flexDirection: 'row',
        gap:10
    },
    searchText: {
        fontSize: 14,
        flex:1,
        color:Colors.lightGrey

    }
})