import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import TrendingMovies from "../components/trendingMovies";
import MovieList from "../components/movieList";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/loading";
import {
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from "../api/movieDb";

export default function HomeScreen() {
  // State variables to store movie data and loading status
  const [trending, setTrending] = useState([]);
  const [upComing, setUpComing] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);

  // Navigation object to navigate between screens
  const navigate = useNavigation();

  // Fetch data when the component mounts
  useEffect(() => {
    getTrendingMovies();
    getUpComingMovies();
    getTopRatedMovies();
  }, []);

  // Fetch trending movies from the API and update state
  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    if (data?.results) {
      setTrending(data.results);
      setLoading(false);
    }
  };

  // Fetch upcoming movies from the API and update state
  const getUpComingMovies = async () => {
    const data = await fetchUpcomingMovies();
    if (data?.results) {
      setUpComing(data.results);
      setLoading(false);
    }
  };

  // Fetch top-rated movies from the API and update state
  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies();
    if (data?.results) {
      setTopRated(data.results);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* SafeAreaView ensures proper spacing for status bar */}
      <SafeAreaView>
        <StatusBar barStyle={"light-content"} />
        {/* Header Section */}
        <View style={styles.header}>
          <Bars3CenterLeftIcon size={30} strokeWidth={2} color="white" />
          <Text style={styles.titleText}>
            <Text style={styles.text}>S</Text>treamly
          </Text>
          {/* Navigate to search screen on icon press */}
          <TouchableOpacity onPress={() => navigate.navigate("Search")}>
            <MagnifyingGlassIcon size={30} strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {/* Show loading spinner or movie content */}
      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {/* Render movie components only if data is available */}
          {trending.length > 0 && <TrendingMovies data={trending} />}
          {upComing.length > 0 && (
            <MovieList title="Upcoming" data={upComing} />
          )}
          {topRated.length > 0 && (
            <MovieList title={"Top Rated on IMDb"} data={topRated} />
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  // Styling for the highlighted "M" in the title
  text: {
    color: "#eab308",
  },
  // Styling for the main title text
  titleText: {
    fontSize: 34,
    fontWeight: 600,
    color: "#ffff",
  },
  // Styling for the header section
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
  // Styling for the container view
  container: {
    flex: 1,
    backgroundColor: "rgba(23,23,23,1)",
  },
});
