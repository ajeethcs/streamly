import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React from "react";
import { image185 } from "../api/movieDb";
import _ from "lodash";

export default function Cast({ cast }) {
  return (
    <View style={styles.container}>
      {/* Section Title */}
      <Text style={styles.title}>Top Cast</Text>

      {/* Horizontal scrollable list for the cast */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {cast &&
          cast.map((person, index) => {
            return (
              <TouchableOpacity key={index} style={styles.scroll_container}>
                {/* Display cast member's image or default avatar */}
                <Image
                  style={styles.castImage}
                  source={{
                    uri:
                      image185(person.profile_path) ??
                      "https://static.vecteezy.com/system/resources/thumbnails/036/280/651/small_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg",
                  }}
                />
                {/* Display cast member's name */}
                <Text style={styles.castName}>{person?.name}</Text>
                {/* Display truncated character name */}
                <Text style={styles.characterName}>
                  {_.truncate(person?.character, {
                    length: 19,
                    omission: "...",
                  })}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 6,
    marginBottom: 6,
  },
  castName: {
    color: "#ffff",
    fontSize: 14,
    marginTop: 10,
  },
  characterName: {
    color: "lightgray",
    fontSize: 12,
  },
  castImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  title: {
    color: "#ffff",
    fontSize: 18,
    marginLeft: 10,
    marginBottom: 10,
  },
  scroll_container: {
    marginRight: 10,
    alignItems: "center",
  },
});
