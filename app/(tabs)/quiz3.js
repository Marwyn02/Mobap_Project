import { useState, useEffect } from "react";
import { View, Pressable, TextInput, Text, StyleSheet } from "react-native";
import { router } from "expo-router";

const getRandomItem = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

export default function Quiz3() {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [value, setValue] = useState(null);

  useEffect(() => {
    setSelectedQuestion(getRandomItem(data)); // Pick a random question when component mounts
  }, []);

  const onSubmit = () => {
    if (!selectedQuestion) return;

    const correctAnswer = selectedQuestion.a;
    if (value !== "" && value !== null && value !== undefined) {
      if (value.trim().toLowerCase() === correctAnswer.trim().toLowerCase()) {
        setIsCorrect(true);
        setTimeout(() => {
          router.push("/quiz4");
        }, 1000);
      } else {
        setIsCorrect(false);
      }
    } else {
      setIsCorrect(false);
    }
  };

  if (!selectedQuestion) {
    return <Text>Loading...</Text>; // Show loading while question is being selected
  }

  return (
    <View style={styles.container}>
      <View className="text-black mb-14 text-center font-bold bg-gray-100 w-screen py-2">
        <Text className="px-5 py-2">{selectedQuestion.q}</Text>
      </View>
      <View className="bg-gray-50 px-20 pt-10 pb-24">
        <TextInput
          onChangeText={setValue}
          placeholder="Enter your answer here"
          blurOnSubmit={true}
          className="bg-gray-200 px-4 py-2 text-sm text-black w-[300px]"
        />
        <Pressable
          className="bg-[#f4511e] py-2.5 rounded-md mt-5"
          onPress={onSubmit}
        >
          <Text className="text-center text-white font-semibold text-xs">
            Enter
          </Text>
        </Pressable>
      </View>
      {isCorrect === false && (
        <Text className="text-center text-red-500 font-semibold mt-2">
          Incorrect answer, please try again.
        </Text>
      )}
      {isCorrect === true && (
        <Text className="text-center text-green-500 font-semibold mt-2">
          Correct answer!
        </Text>
      )}
      <Pressable onPress={() => router.push("/quiz4")}>
        <Text>Skip</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 32,
    paddingBottom: 0,
    fontSize: 64,
    backgroundColor: "#000",
  },
});

const data = [
  {
    id: 1,
    q: "In react a method to handle state within a functional component is 'use___'.",
    a: "State",
  },
  {
    id: 2,
    q: "The http method is commonly used to submit form data to a server is ___",
    a: "POST",
  },
  {
    id: 3,
    q: "The ___ attribute in HTML is used to specify the text direction of the content",
    a: "dir",
  },
  {
    id: 4,
    q: "The ___ properly in CSS is used to add shadow to text.",
    a: "text-shadow",
  },
  {
    id: 5,
    q: "In web security, ___ is a technique used to protect web applications by ensuring that data sent to the server is valid and safe",
    a: "Input Validation",
  },
];