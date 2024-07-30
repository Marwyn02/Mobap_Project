import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

const lost = () => {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={styles.container}>
          <Text className="text-red-500 text-3xl p-5 font-bold mb-5">
            You Lost!
          </Text>

          <Text className="text-white font-bold bg-black py-3 text-center text-2xl mx-12 my-5">
            You have been defeated by Glitch King!
          </Text>

          <Pressable
            className="bg-yellow-600 p-5 mx-10 rounded-md active:bg-orange-500"
            onPress={() => router.push("/quiz5")}
          >
            <Text className="text-center text-white font-bold">
              Fight Glitch King again!
            </Text>
          </Pressable>
        </View>

        <Pressable onPress={() => router.push("/")}>
          <Text className="text-center text-white underline font-bold">
            Go home
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default lost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 64,
    backgroundColor: "#000",
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
});
