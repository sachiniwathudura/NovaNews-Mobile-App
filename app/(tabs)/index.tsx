import {useSafeAreaInsets} from "react-native-safe-area-context";
import {StyleSheet, View, Text, ActivityIndicator, ScrollView} from "react-native";
import Header from "../../components/Header";
import SearchBar from  "../../components/SearchBar";
import {useEffect, useState} from "react";
import {NewsDataType} from "../../types";
import axios from "axios";
import BreakingNews from "../../components/BreakingNews";
import Categories from "../../components/Categories";
import NewsList from "../../components/NewsList";
import Loading from "../../components/Loading";

type Props = {}
const Page = (props: Props) => {
    const {top: safeTop} = useSafeAreaInsets();
    const [breakingNews, setBreakingNews] = useState<NewsDataType[]>([]);
    const [news, setNews] = useState<NewsDataType[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getBreakingNews();
        getNews();
    },[]);

    const getBreakingNews = async ()=>{
        try {
            const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY }&country=in,lk&language=en,si&category=education,politics,science,technology,world&image=1&removeduplicate=1&size=5`
            const response = await axios.get(URL);

            // console.log(response.data);
            if (response && response.data) {
               setBreakingNews(response.data.results);
               setIsLoading(false);
            }
             // API key = pub_688125271182cc9b928ab4c51d31c9a1b84c2
            //url 2 ->https://newsdata.io/api/1/news?apikey=pub_688125271182cc9b928ab4c51d31c9a1b84c2&country=in,lk&language=en,si&image=1
        }catch(err:any){
          console.log(err.message);
        }
    };

    const getNews = async (category:string = '')=>{
        try {
            let categoryString = '';
            if (category.length !== 0) {
                categoryString = `&category=${category}`
            }
            const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY }&country=in,lk,wo&language=en,si&image=1&removeduplicate=1&size=10${categoryString}`;
            const response = await axios.get(URL);

            console.log(response.data);
            if (response && response.data) {
                setNews(response.data.results);
                setIsLoading(false);
            }
        }catch(err:any){
            console.log(err.message);
        }
    };

    const onCatChanged = (category:string)=>{
        console.log("Category:",category);
        setNews([]);
        getNews(category);
    }

    return (
        <ScrollView style={[styles.container, {paddingTop: safeTop}]}>
            <Header/>
            <SearchBar withHorizontalPadding={true}/>
            {isLoading ?(
                <Loading size={'large'}/>
            ):(
                <BreakingNews newsList={breakingNews} />
            )}
            <Categories onCategoryChanged={onCatChanged}/>
            <NewsList newsList={news}/>
        </ScrollView>
    )
}
export default Page;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});