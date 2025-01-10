import { router } from "expo-router";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Page() {
  return (
    <ImageBackground
      source={require("../public/Intro.gif")}
      style={styles.backgroundImage}
    >
      <Pressable
        style={styles.pressableComic}
        onPress={() => router.push("(tabs)/comic")}
      >
        <Text style={styles.textComic}>Read our comic</Text>
      </Pressable>

      <View style={styles.container}>
        <View style={styles.main}>
          <Pressable
            style={({ pressed }) => [
              styles.pressablePlay,
              pressed && styles.pressablePlayActive,
            ]}
            onPress={() => router.replace("(tabs)")}
          >
            <Text
              style={({ pressed }) => [
                styles.textPlay,
                pressed && styles.textPlayActive,
              ]}
            >
              Play
            </Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  main: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 570,
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  backgroundImage: {
    flex: 1,
    position: "relative",
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  pressableComic: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  textComic: {
    position: "absolute",
    top: 40,
    left: 20,
    fontSize: 14,
    fontWeight: "600",
    textDecorationLine: "underline",
    letterSpacing: 1.5,
  },
  pressablePlay: {
    backgroundColor: "black",
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 10,
  },
  pressablePlayActive: {
    backgroundColor: "gray",
  },
  textPlay: {
    color: "#DDD",
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  textPlayActive: {
    color: "#888",
  },
});
