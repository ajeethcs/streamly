import {
  View,
  Text,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useCallback, useState } from "react";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { debounce } from "lodash";
import { image500, searchMovies } from "../api/movieDb";
import { truncateText } from "../utils/truncate";

const { width, height } = Dimensions.get("window");

export default function SearchScreen() {
  const navigation = useNavigation();
  const [results, setResults] = useState([]);

  const handleSearch = (value) => {
    if (value?.length > 2) {
      searchMovies({
        query: value,
        include_adult: "true",
        language: "en-US",
        page: "1",
      }).then((data) => {
        setResults(data.results);
      });
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder="Search movie"
          placeholderTextColor={"lightgray"}
          style={styles.searchInput}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={styles.search_cancel}
        >
          <XMarkIcon color="white" size={25} />
        </TouchableOpacity>
      </View>
      {results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          style={styles.searchList_container}
        >
          <Text
            style={{ color: "#ffff", fontWeight: "semibold", marginLeft: 1 }}
          >
            Results ({results.length})
          </Text>
          <View style={styles.searchResults_container}>
            {results.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => navigation.push("Movie", item)}
                >
                  <View style={{ marginTop: 10 }}>
                    <Image
                      style={styles.searchMovie_image}
                      alt="image"
                      source={{
                        uri:
                          image500(item.poster_path) ??
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdL3FeRfpb0YfZ168d3qcJg20m63e4AAXx8A&s",
                      }}
                    />
                    <Text style={styles.movie_title}>
                      {truncateText(item.title)}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#27272a",
    flex: 1,
  },
  movie_title: {
    color: "#ffff",
    textAlign: "center",
  },
  searchMovie_image: {
    width: width * 0.44,
    height: height * 0.3,
    borderRadius: 12,
    marginBottom: 8,
  },
  searchResults_container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  searchBar: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // borderColor: "rgb(115 115 115 / var(--tw-bg-opacity, 1))",
    borderColor: "#737373",
    borderWidth: 1,
    borderRadius: 20,
    padding: 8,
  },
  searchInput: {
    paddingBottom: 10,
    flex: 1,
    fontWeight: "semibold",
    color: "white",
    letterSpacing: 16 * 0.05,
  },
  search_cancel: {
    padding: 5,
    margin: 1,
    backgroundColor: "#737373",
    borderRadius: 30,
  },
  searchList_container: {
    display: "flex",
  },
});
