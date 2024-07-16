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
      source={require("../public/main.gif")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.main}>
          <Text style={styles.title}>Code Crusaders</Text>
          <Pressable
            className="bg-black p-4 w-screen active:bg-gray-500"
            onPress={() => router.push("(tabs)")}
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
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
});
