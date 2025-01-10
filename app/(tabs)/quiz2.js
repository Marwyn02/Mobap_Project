import React, { useState, useEffect } from "react";
import { router } from "expo-router";
import {
  Pressable,
  View,
  StyleSheet,
  Text,
  ImageBackground,
} from "react-native";
import Question from "../components/Question";
import QuestionCount from "../components/QuestionCount";
import Level from "../components/Level";
import ResultButton from "../components/ResultButton";

// Get RANDOM questions from the data questions
const getRandomItem = (array, num) => {
  const shuffledArray = array.sort(() => 0.5 - Math.random());
  return shuffledArray.slice(0, num);
};

// Quiz 2
// True and False Quiz
// Topic:
//   HTML
//   CSS
//   Javascript
//   PHP

export default function quiz2() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    setQuestions(getRandomItem(data, 10)); // Pick 10 random questions when component mounts
  }, []);

  // Submits and check the player answer
  const onAnswer = (answer) => {
    setSelectedAnswer(true);
    const currentQuestion = questions[currentQuestionIndex];

    if (answer === currentQuestion.a) {
      // If player's answer is correct
      setCorrectAnswersCount((prevCount) => prevCount + 1); // Add score to the player
      setIsCorrect(true);
    } else {
      // If wrong
      setIsCorrect(false); // No added score
    }

    // Continues here after the validation
    setTimeout(() => {
      setIsCorrect(null);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1); // Proceeds to the next question
        setSelectedAnswer(null);
      } else {
        // If no available quiz left based on the number of random items
        setShowResult(true); // Show the end result of the quiz
        setSelectedAnswer(null);
      }
    }, 1500);
  };

  // Proceed to the result page to see the score
  const onShowResult = () => {
    setTimeout(() => {
      router.replace({
        pathname: "/result2",
        params: {
          correctAnswersCount,
          totalQuestions: questions.length,
        },
      });
    }, 1000);
  };

  if (questions.length === 0) {
    return <Text>Loading...</Text>; // Show loading while questions are being selected
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <ImageBackground
      source={require("../../public/Scene2.gif")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <Level level={2} />
      <View style={styles.container}>
        <QuestionCount
          showResult={showResult}
          currentQuestionIndex={currentQuestionIndex}
          correctAnswer={correctAnswersCount}
          questions={questions.length}
          quiz={2}
        />

        {!showResult ? (
          <>
            <Question
              isCorrect={isCorrect}
              currentQuestion={currentQuestion.q}
            />

            <View style={styles.answerContainer}>
              <Pressable
                style={({ pressed }) => [
                  styles.answerButton,
                  styles.trueButton,
                  pressed && styles.trueButtonPressed,
                ]}
                onPress={() => onAnswer("True")}
                disabled={selectedAnswer !== null}
              >
                <Text style={styles.answerText}>True</Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  styles.answerButton,
                  styles.falseButton,
                  pressed && styles.falseButtonPressed,
                ]}
                onPress={() => onAnswer("False")}
                disabled={selectedAnswer !== null}
              >
                <Text style={styles.answerText}>False</Text>
              </Pressable>
            </View>
          </>
        ) : (
          <ResultButton doPress={onShowResult} />
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 0,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  answerContainer: {
    flexDirection: "row",
    paddingTop: 20,
    paddingBottom: 96,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
  },
  answerButton: {
    marginTop: 20,
    padding: 10,
    width: 176,
    borderRadius: 50,
  },
  trueButton: {
    backgroundColor: "blue",
  },
  trueButtonPressed: {
    backgroundColor: "lightblue",
  },
  falseButton: {
    backgroundColor: "red",
  },
  falseButtonPressed: {
    backgroundColor: "lightcoral",
  },
  answerText: {
    fontSize: 18,
    textAlign: "center",
    color: "white",
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
  {
    id: 27,
    q: "PHP supports both procedural and object-oriented programming paradigms.",
    a: "True",
  },
  {
    id: 28,
    q: "The `this` keyword in JavaScript always refers to the global object.",
    a: "False",
  },
  {
    id: 29,
    q: "JavaScript is a compiled language.",
    a: "False",
  },
  {
    id: 30,
    q: "The `typeof` operator can be used to determine the data type of a variable.",
    a: "True",
  },
  {
    id: 31,
    q: "The `===` operator checks for both value and type equality.",
    a: "True",
  },
  {
    id: 32,
    q: "The `null` and `undefined` values are equal.",
    a: "False",
  },
  {
    id: 33,
    q: "JavaScript supports destructuring assignment.",
    a: "True",
  },
  {
    id: 34,
    q: "PHP is a case-sensitive language.",
    a: "False",
  },
  {
    id: 35,
    q: "The `$_GET` superglobal array is used to collect form data sent with the HTTP GET method.",
    a: "True",
  },
  {
    id: 36,
    q: "PHP supports interfaces but not abstract classes.",
    a: "False",
  },
  {
    id: 37,
    q: "PHP sessions are stored on the server.",
    a: "True",
  },
  {
    id: 38,
    q: "PHP supports namespaces.",
    a: "True",
  },
  {
    id: 39,
    q: "The `include` and `require` statements are identical in functionality.",
    a: "False",
  },
  {
    id: 40,
    q: "PHP supports error handling using try-catch blocks.",
    a: "True",
  },
  {
    id: 41,
    q: "PHP is a compiled language.",
    a: "False",
  },
];
