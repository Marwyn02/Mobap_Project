import { router } from "expo-router";
import { Pressable, StyleSheet, Text, Image, View } from "react-native";

const end = () => {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text className="text-white text-3xl p-5 font-bold mb-5">
          You beat Code Crusaders!
        </Text>
        <Image
          source={require("../../public/Congratulations.gif")}
          className="w-screen h-[40%]"
          resizeMode="cover"
        />

        <Text className="text-white font-bold bg-black py-3 text-center text-2xl mt-5">
          You have defeated Glitch King!
        </Text>

        <Pressable
          className="bg-yellow-600 p-5 rounded-md mx-5 active:bg-orange-500"
          onPress={() => router.push("/")}
        >
          <Text className="text-center text-white font-bold">Start again</Text>
        </Pressable>

        <Text className="text-white text-center p-5 mt-2">
          Thank you for playing our game.
        </Text>
      </View>
    </View>
  );
};

export default end;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#000",
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
});
