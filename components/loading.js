import { View, Text, Dimensions, StyleSheet } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";

const { width, height } = Dimensions.get("window");
export default function Loading() {
  return (
    <View style={styles.container}>
      <Progress.CircleSnail thickness={12} size={160} color="#eab308" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height,
    width,
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
