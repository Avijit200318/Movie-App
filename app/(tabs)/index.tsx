import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";
import Img from "@/assets/images/bg.png"
import Logo from "@/assets/images/home logo.png"
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchPopularMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";

export default function Index() {
  const router = useRouter();

  const { data: movies, loading: moviesLoading, error: moviesError } = useFetch(() => fetchPopularMovies())

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <Image source={Img} className="absolute w-full z-0" />
      <ScrollView className="flex-1 px-5 ">
        <Image source={Logo} className="w-12 h-10 mt-4 mb-5 mx-auto" />
        {moviesLoading ? (
          <ActivityIndicator size="large" className="w-16 h-16 mt-20 mb-5 mx-auto" />) :
          moviesError ? (
            <Text>{moviesError?.message}</Text>
          ) : (
            <View className="flex-1 mt-5 pb-16">
              <SearchBar placeholder="Search for a movie" onPress={() => router.push("/search")} />
              <>
                <Text className="text-lg text-white font-semibold  mt-5 mb-3">Latest Movies</Text>
                <FlatList data={movies}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <MovieCard item={item} />
                  )}
                  numColumns={3}
                  columnWrapperStyle={{
                    justifyContent: "flex-start",
                    gap: 19,
                    paddingRight: 5,
                    marginBottom: 10
                  }}
                  scrollEnabled={false}
                  className="mt-2 pb-32"
                />
              </>
            </View>
          )
        }
      </ScrollView>
    </SafeAreaView>
  );
}
