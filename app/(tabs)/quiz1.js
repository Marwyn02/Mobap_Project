import { router } from "expo-router";
import { useState, useEffect } from "react";
import { View, StyleSheet, Text, TextInput, Pressable } from "react-native";

const getRandomItem = (array, num) => {
  const shuffledArray = array.sort(() => 0.5 - Math.random());
  return shuffledArray.slice(0, num);
};

export default function Quiz1() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCorrect, setIsCorrect] = useState(null);
  const [value, setValue] = useState(null);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

  useEffect(() => {
    setQuestions(getRandomItem(data, 10)); // Pick 3 random questions when component mounts
  }, []);

  const onSubmit = () => {
    if (questions.length === 0) return;

    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswer = currentQuestion.a;

    if (value !== "" && value !== null && value !== undefined) {
      if (value.trim().toLowerCase() === correctAnswer.trim().toLowerCase()) {
        setIsCorrect(true);
        setCorrectAnswersCount((prevCount) => prevCount + 1);
      } else {
        setIsCorrect(false);
      }
    } else {
      setIsCorrect(false);
    }

    setTimeout(() => {
      setIsCorrect(null);
      setValue("");
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        router.replace({
          pathname: "/result1",
          params: { correctAnswersCount, totalQuestions: questions.length },
        });
      }
    }, 1000);
  };

  if (questions.length === 0) {
    return <Text>Loading...</Text>; // Show loading while question is being selected
  }
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <View style={styles.container}>
      <Text className="text-white text-center mb-4">
        Question {currentQuestionIndex + 1} / {questions.length}
      </Text>

      <View className="text-black mb-14 text-center font-bold bg-gray-100 w-screen py-2">
        <Text className="px-5 py-2">{currentQuestion.q}</Text>
      </View>
      <View className="bg-gray-50 px-20 pt-10 pb-24">
        <TextInput
          value={value}
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
          Incorrect answer!
        </Text>
      )}
      {isCorrect === true && (
        <Text className="text-center text-green-500 font-semibold mt-2">
          Correct answer!
        </Text>
      )}
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
    q: "Which HTML tag use to define a hyperlink?",
    c: [
      {
        a: "<Link>",
      },
      {
        b: "<a>",
      },
      {
        c: "<href>",
      },
      { d: "<anchor>" },
    ],
    a: "<a>",
  },
  {
    id: 2,
    q: "Which CSS property use to change the text color of an element?",
    c: [
      {
        a: "font-color",
      },
      {
        b: "text-color",
      },
      {
        c: "color",
      },
      { d: "text-style" },
    ],
    a: "color",
  },
  {
    id: 3,
    q: "What is the correct syntax to include an external javascript file in a HTML document?",
    c: [
      {
        a: "<script link='script.js'></script>",
      },
      {
        b: "<script src='script.js'></script>",
      },
      {
        c: "<script href='script.js'></script>",
      },
      { d: "<script file='script.js'></script>" },
    ],
    a: "<script src='script.js'></script>",
  },
  {
    id: 4,
    q: "Which HTML tag is used to define a paragraph?",
    a: "<p>",
  },

  {
    id: 5,
    q: "In CSS how do you select an element with the ID header? ",
    a: "#header",
  },
  {
    id: 6,
    q: "Which HTML tag is used to define a table row?",
    a: "<tr>",
  },
  {
    id: 7,
    q: "What is the correct way to write a JavaScript comment?",
    a: "//",
  },
  {
    id: 8,
    q: "Which JavaScript method is used to remove the last element from an array and returns that element?",
    a: "pop()",
  },
  {
    id: 9,
    q: "What does HTML stand for?",
    a: "HyperText Markup Language",
  },
  {
    id: 10,
    q: "Which HTML tag is used to define an unordered list?",
    a: "<ul>",
  },
  {
    id: 11,
    q: "What CSS property is used to create space between the element's border and inner content?",
    a: "padding",
  },
  {
    id: 12,
    q: "Which HTML attribute is used to define inline styles?",
    a: "style",
  },
  {
    id: 13,
    q: "Which HTML attribute is used to specify that a button should be disabled?",
    a: "disabled",
  },
  {
    id: 14,
    q: "What does CSS stand for?",
    a: "Cascading Style Sheets",
  },
  {
    id: 15,
    q: "Which CSS property is used to set the size of the font?",
    a: "font-size",
  },
  {
    id: 16,
    q: "What does DOM stand for?",
    a: "Document Object Model",
  },
  {
    id: 17,
    q: "Which HTML tag is used to define a list item within an ordered list?",
    a: "<li>",
  },
  {
    id: 18,
    q: "Which HTML tag is used to define a level-three heading?",
    a: "<h3>",
  },
];
