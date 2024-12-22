import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from "react-native";
import React from "react";
import Carousel from "react-native-reanimated-carousel";
import { useNavigation } from "@react-navigation/native";
import { image500 } from "../api/movieDb";
import { LinearGradient } from "expo-linear-gradient";

let { width, height } = Dimensions.get("window");

export default function TrendingMovies({ data }) {
  const navigation = useNavigation();

  // Handle click event to navigate to the Movie details screen
  const handleClick = (item) => {
    navigation.push("Movie", item);
  };

  return (
    <View style={styles.trendingMovies_container}>
      {/* Carousel for displaying trending movies */}
      <View style={styles.image_carousel}>
        <Carousel
          loop
          width={width}
          height={width * 0.62}
          autoPlay={true}
          autoPlayInterval={3000}
          defaultIndex={0}
          data={data}
          renderItem={({ item }) => (
            <MovieCard handleClick={handleClick} item={item} />
          )}
        />
      </View>
    </View>
  );
}

const MovieCard = ({ item, handleClick }) => {
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <View style={styles.movie_card_container}>
        {/* Display movie image */}
        <Image
          source={{ uri: image500(item.backdrop_path) }}
          style={styles.trending_movie_img}
          resizeMode="cover"
        />
        {/* Linear gradient overlay for better text visibility */}
        <LinearGradient
          style={styles.linearGradient}
          colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />
        {/* Movie title */}
        <View style={styles.text_container}>
          <Text style={styles.movie_title}>{item?.title}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  trending_movie_img: {
    width: width * 0.6,
    height: height * 0.3,
    width,
  },
  linearGradient: {
    width,
    height: height * 0.09,
    position: "absolute",
    bottom: 0,
  },
  movie_card_container: {
    position: "relative",
  },
  movie_title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  text_container: {
    position: "absolute",
    boxShadow:
      "box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
    bottom: 10,
    left: 15,
  },
  image_carousel: {},
  trendingMovies_container: {
    marginTop: 10,
  },
});
