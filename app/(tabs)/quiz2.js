import React, { useState, useEffect } from "react";
import { router } from "expo-router";
import { Pressable, View, StyleSheet, Text } from "react-native";

const getRandomItem = (array, num) => {
  const shuffledArray = array.sort(() => 0.5 - Math.random());
  return shuffledArray.slice(0, num);
};

export default function quiz2() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    setQuestions(getRandomItem(data, 10)); // Pick 5 random questions when component mounts
  }, []);

  const onAnswer = (answer) => {
    const currentQuestion = questions[currentQuestionIndex];

    if (answer === currentQuestion.a) {
      setCorrectAnswersCount((prevCount) => prevCount + 1);
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }

    setTimeout(() => {
      setIsCorrect(null);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        router.replace({
          pathname: "/result2",
          params: { correctAnswersCount, totalQuestions: questions.length },
        });
      }
    }, 1000); // Clear feedback after 1 second
  };

  if (questions.length === 0) {
    return <Text>Loading...</Text>; // Show loading while questions are being selected
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
      <View className="flex flex-row space-x-2 px-20 pt-10 pb-24 bg-white">
        <Pressable
          className="mt-5 bg-blue-300 w-full py-2.5 rounded-md"
          onPress={() => onAnswer("True")}
        >
          <Text className="text-xs font-bold text-center text-gray-700">
            True
          </Text>
        </Pressable>

        <Pressable
          className="mt-5 bg-red-300 w-full py-2.5 rounded-md"
          onPress={() => onAnswer("False")}
        >
          <Text className="text-xs font-bold text-center text-gray-700">
            False
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
    q: "The div tag is used to define a division and section in a HTML document.",
    a: "True",
  },
  {
    id: 2,
    q: "CSS is stand for cascading style sheet",
    a: "True",
  },
  {
    id: 3,
    q: "In HTML the h1 tag is used to define the smallest heading",
    a: "False",
  },
  {
    id: 4,
    q: "HTML stands for HyperText Markup Language",
    a: "True",
  },
  {
    id: 5,
    q: "The <span> element in HTML is a block-level element",
    a: "False",
  },
  {
    id: 6,
    q: "The <div> element in HTML is used to create divisions or section in a document",
    a: "True",
  },
  {
    id: 7,
    q: "CSS can be use to change the color of text on a webpage",
    a: "True",
  },
  {
    id: 8,
    q: "The id attribute in HTML must be unique within a document",
    a: "True",
  },
  {
    id: 9,
    q: "JavaScript arrays can contain elements of different data types",
    a: "Trye",
  },
  {
    id: 10,
    q: "The <span> element in HTML is a block-level element",
    a: "False",
  },
  {
    id: 11,
    q: "The <ul> element is used to create order lists",
    a: "False",
  },
  {
    id: 12,
    q: "JavaScript is case-insensitive",
    a: "False",
  },
  {
    id: 13,
    q: "The <table> element is used to create tables in HTML",
    a: "True",
  },
  {
    id: 14,
    q: "The <ol> element is used to create unordered-list",
    a: "False",
  },
  {
    id: 15,
    q: "CSS Grid layout can be used to manipulate the DOM (Document Object Model)",
    a: "True",
  },
  {
    id: 16,
    q: "JavaScript can be used to make HTTP requests to a server",
    a: "True",
  },
  {
    id: 17,
    q: "CSS pseudo-classes start with a double colon (::) ",
    a: "False",
  },
  {
    id: 18,
    q: "Flexbox is one-dimensional layout method in CSS",
    a: "True",
  },
  {
    id: 19,
    q: "JSON stands for JavaScript Object Notation",
    a: "True",
  },
  {
    id: 20,
    q: "The <style> element is used to add external CSS to an HTML document",
    a: "False",
  },
  {
    id: 21,
    q: "JavaScript is a programming language primarily used for client-side scripting in web development.",
    a: "True",
  },
  {
    id: 22,
    q: "jQuery is a JavaScript library designed to simplify HTML DOM traversal and manipulation.",
    a: "True",
  },
  {
    id: 23,
    q: "JavaScript is a statically typed language.",
    a: "False",
  },
  {
    id: 24,
    q: "HTML is used to define the structure and content of web pages.",
    a: "True",
  },
  {
    id: 25,
    q: "AJAX stands for Asynchronous JavaScript and XML.",
    a: "True",
  },
  {
    id: 26,
    q: "In jQuery, the '$' sign is an alias for the 'jQuery' function.",
    a: "True",
  },
];
