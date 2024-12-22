import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { image342 } from "../api/movieDb";
import { truncateText } from "../utils/truncate";

let { width, height } = Dimensions.get("window");

export default function MovieList({ title, data, hideSeeAll = false }) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header section displaying the title and "See All" button */}
      <View style={styles.header}>
        <Text
          style={{
            color: "#ffff",
            fontWeight: "bold",
            letterSpacing: 16 * 0.025,
          }}
        >
          {title}
        </Text>
        {/* Conditionally render "See All" button */}
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text style={styles.seeAll_button}>See All</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Scrollable horizontal list of movies */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data?.map((item) => {
          return (
            <TouchableWithoutFeedback
              key={item.id}
              onPress={() => navigation.push("Movie", item)} // Navigate to movie details screen on press
            >
              <View style={{ marginRight: 10 }}>
                {/* Movie poster */}
                <Image
                  style={styles.movie_image}
                  source={{ uri: image342(item?.poster_path) }}
                />
                {/* Movie title, truncated if too long */}
                <Text style={{ color: "#dddddd", textAlign: "center" }}>
                  {truncateText(item?.title)}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  movie_image: {
    width: width * 0.33,
    height: height * 0.22,
    borderRadius: 10,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 12,
    marginBottom: 10,
    marginTop: 10,
  },
  seeAll_button: {
    backgroundColor: "#eab308",
    padding: 10,
    borderRadius: 12,
    color: "#000000",
  },
});
