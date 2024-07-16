import { router } from "expo-router";
import { Text, StyleSheet, Pressable } from "react-native";
import { useState } from "react";

export default function Tab() {
  const [continueMsg, setContinueMsg] = useState(false);

  const pressFunction = () => {
    setContinueMsg(false);
    setTimeout(() => router.push("/quiz5"), 1000);
  };

  setTimeout(() => setContinueMsg(true), 3000);
  return (
    <Pressable style={styles.container} onPress={pressFunction}>
      <Text className="text-xl text-[#f4511e] font-bold my-8">
        Introduction
      </Text>
      <Text className="text-center font-medium text-white mb-5">
        In a world gripped by darkness and peril, where the very fabric of
        reality hangs in the balance, a hero emerges from the shadows. It is a
        time of great uncertainty, as sinister forces threaten to plunge the
        world into eternal chaos. In the midst of this turmoil, a lone
        adventurer steps forward, driven by a sense of duty and destiny.
      </Text>
      <Text className="text-center font-medium text-white mb-5">
        As the protagonist embarks on their journey, the weight of the world
        rests upon their shoulders. Armed with courage and determination, they
        traverse treacherous lands and face formidable challenges. Along the
        way, they will uncover ancient mysteries, forge powerful alliances, and
        confront their deepest fears.
      </Text>
      <Text className="text-center font-medium text-white mb-10">
        But the path to victory is fraught with danger, and the fate of the
        world hangs in the balance. Will the hero rise to the occasion and
        fulfill their destiny, or will darkness prevail? Only time will tell as
        the epic saga of Code Conquest unfolds.{" "}
      </Text>
      <Text className="text-center text-[#f4511e] opacity-80">
        {continueMsg ? "Press anywhere to continue" : ""}{" "}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    fontSize: 64,
    backgroundColor: "#000",
  },
});
