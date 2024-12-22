import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/cast";
import MovieList from "../components/movieList";
import Loading from "../components/loading";
import {
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovies,
  image500,
} from "../api/movieDb";

// Get the screen dimensions
let { width, height } = Dimensions.get("window");

export default function MovieScreen() {
  const { params: item } = useRoute(); // Access the movie item passed via navigation
  const navigation = useNavigation(); // Access navigation methods
  const [movieData, setMovieData] = useState({}); // State to store movie details
  const [movieCredits, setMovieCredits] = useState({}); // State to store movie cast and crew
  const [isFavourite, setIsFavourite] = useState(false); // State to handle favorite status
  const [similarMovies, setSimilarMovies] = useState([]); // State to store similar movies
  const [loading, setLoading] = useState(false); // State to handle loading indicator

  useEffect(() => {
    // Fetch movie details, credits, and similar movies when the screen loads
    if (item) {
      getMovieDetails(item.id);
      getMovieCredits(item.id);
      getSimilarMovies(item.id);
    }
  }, []);

  // Fetch movie details using API
  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id);
    if (data) {
      setMovieData(data);
    }
  };

  // Fetch movie credits (cast and crew) using API
  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredits(id);
    if (data) {
      setMovieCredits(data);
    }
  };

  // Fetch similar movies using API
  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarMovies(id);
    if (data?.results) {
      setSimilarMovies(data.results);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        {/* Header with back and favorite buttons */}
        <SafeAreaView style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <ChevronLeftIcon size={28} strokeWidth={2.5} color={"black"} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)}>
            <HeartIcon size={35} color={isFavourite ? "red" : "black"} />
          </TouchableOpacity>
        </SafeAreaView>

        {loading ? (
          <Loading /> // Show loading indicator if data is being fetched
        ) : (
          <View>
            {/* Movie Poster */}
            <Image
              style={styles.movie_poster}
              source={{ uri: image500(movieData.poster_path) }}
            />
            {/* Gradient overlay for poster */}
            <LinearGradient
              style={styles.linearGradient}
              colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
            />
          </View>
        )}
      </View>

      {/* Movie Details */}
      <View style={styles.movieDetails}>
        <Text style={styles.movie_title}>{movieData?.title}</Text>
        <Text style={styles.movie_details}>
          {`${movieData?.status}  ${
            movieData?.release_date?.split("-")[0]
          }  •  ${movieData?.runtime} min`}
        </Text>
        {/* Display genres */}
        <View style={styles.genres}>
          {movieData?.genres?.map((item, index) => (
            <Text key={item.id} style={styles.movie_details}>
              {item?.name} {index < movieData.genres.length - 1 ? "•" : null}
            </Text>
          ))}
        </View>
        {/* Movie Description */}
        <Text style={styles.movie_description}>{movieData?.overview}</Text>
      </View>

      {/* Cast Component */}
      <Cast cast={movieCredits?.cast} />

      {/* Similar Movies */}
      <MovieList
        title="Similar movies"
        data={similarMovies}
        hideSeeAll={true}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    flex: 1,
    backgroundColor: "rgba(23,23,23,1)",
    color: "#fffff",
  },
  movie_description: {
    color: "#adadad",
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    textAlign: "center",
  },
  movie_title: {
    color: "#ffff",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  movie_details: {
    color: "#ffff",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  movie_poster: {
    height: height * 0.55,
    width,
  },
  genres: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  movieDetails: {
    marginTop: -(height * 0.09),
    display: "flex",
  },
  linearGradient: {
    width,
    height: height * 0.3,
    position: "absolute",
    bottom: 0,
  },
  header: {
    position: "absolute",
    zIndex: 20,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 4,
  },
  backButton: {
    backgroundColor: "#eab308",
    padding: 8,
    borderRadius: 12,
    margin: 10,
  },
});
