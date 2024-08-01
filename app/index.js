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
        className="px-5 py-2"
        onPress={() => router.push("(tabs)/comic")}
      >
        <Text className="absolute top-10 left-5 text-sm font-semibold underline tracking-wide">
          Read our comic
        </Text>
      </Pressable>

      <View style={styles.container}>
        <View style={styles.main}>
          <Pressable
            className="bg-black px-10 py-3 rounded-lg active:bg-gray-500"
            onPress={() => router.replace("(tabs)")}
          >
            <Text className="text-[#DDD] font-bold text-2xl text-center uppercase tracking-widest active:text-[#888]">
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
});
