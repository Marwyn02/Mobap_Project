import { useState, useEffect } from "react";
import {
  ImageBackground,
  View,
  Pressable,
  TextInput,
  Text,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";
import Question from "../components/Question";
import QuestionCount from "../components/QuestionCount";
import Level from "../components/Level";
import ResultButton from "../components/ResultButton";

// Get RANDOM questions from the data questions
const getRandomItem = (array, num) => {
  const shuffledArray = array.sort(() => 0.5 - Math.random());
  return shuffledArray.slice(0, num);
};

// Quiz 3
// Fill in the blank Quiz
// Topic:
//   HTML
//   CSS
//   Javascript
//   React
//   React-Native
//   PHP

export default function Quiz3() {
  const [questions, setQuestions] = useState([]);
  const [isCorrect, setIsCorrect] = useState(null);
  const [value, setValue] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    setQuestions(getRandomItem(data, 10)); // Pick a 10 random question when component mounts
  }, []);

  // Submits and check the player answer
  const onSubmit = () => {
    if (questions.length === 0) return;

    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswer = currentQuestion.a;

    if (value !== "" && value !== null && value !== undefined) {
      // Checks the players answer if correct or not undefined
      if (value.trim().toLowerCase() === correctAnswer.trim().toLowerCase()) {
        // Match the player answer if correct to the answer key
        // If player answer is correct
        setIsCorrect(true);
        setCorrectAnswersCount((prevCount) => prevCount + 1); // Add score player
      } else {
        // If wrong
        setIsCorrect(false);
      }
    } else {
      setIsCorrect(false);
    }

    // Continues here after the validation
    setTimeout(() => {
      setIsCorrect(null);
      setValue(""); // Set blank value after submission
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1); // Proceeds to next question
      } else {
        // If no available quiz left based on the number of random items
        setShowResult(true); // Show the end result of the quiz
      }
    }, 1500);
  };

  // Proceed to the result page to see the score
  const onShowResult = () => {
    setTimeout(() => {
      router.replace({
        pathname: "/result3",
        params: {
          correctAnswersCount,
          totalQuestions: questions.length,
        },
      });
    }, 2000);
  };

  if (questions.length === 0) {
    return <Text>Loading...</Text>; // Show loading while question is being selected
  }
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <ImageBackground
      source={require("../../public/Scene3.gif")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <Level level={3} />
      <View style={styles.container}>
        <QuestionCount
          showResult={showResult}
          currentQuestionIndex={currentQuestionIndex}
          correctAnswer={correctAnswersCount}
          questions={questions.length}
          quiz={3}
        />

        {!showResult ? (
          <>
            <Question
              isCorrect={isCorrect}
              currentQuestion={currentQuestion.q}
            />

            <View style={styles.answerContainer}>
              <TextInput
                multiline
                value={value}
                onChangeText={setValue}
                placeholder="Enter your answer here"
                blurOnSubmit={true}
                style={[
                  styles.textInput,
                  value.length > 30 && styles.textInputExtended,
                ]}
              />
              <Pressable
                style={[
                  styles.submitButton,
                  value === "" && styles.submitButtonDisabled,
                ]}
                onPress={onSubmit}
                disabled={value === ""}
              >
                <Text style={styles.submitButtonText}>Enter</Text>
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
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 96,
  },
  textInput: {
    backgroundColor: "gray",
    borderColor: "black",
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 14,
    marginHorizontal: 0,
    fontSize: 18,
    color: "black",
    width: 375,
    borderRadius: 8,
    transitionDuration: "300ms",
  },
  textInputExtended: {
    borderRadius: 16,
  },
  submitButton: {
    backgroundColor: "blue",
    paddingVertical: 12,
    borderRadius: 50,
    marginTop: 20,
  },
  submitButtonDisabled: {
    backgroundColor: "gray",
  },
  submitButtonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "600",
  },
});

const data = [
  {
    id: 0,
    q: "In react a method to handle state within a functional component is 'use___'.",
    a: "State",
  },
  {
    id: 1,
    q: "The http method is commonly used to submit form data to a server is ___",
    a: "POST",
  },
  {
    id: 2,
    q: "The ___ attribute in HTML is used to specify the text direction of the content",
    a: "dir",
  },
  {
    id: 3,
    q: "In web security, ___ is a technique used to protect web applications by ensuring that data sent to the server is valid and safe",
    a: "Input Validation",
  },
  {
    id: 4,
    q: "Which HTML tag is used to define a paragraph? (Opening tag only)",
    a: "<p>",
  },

  {
    id: 5,
    q: "In CSS how do you select an element with the ID header? ",
    a: "#header",
  },
  {
    id: 6,
    q: "Which HTML tag is used to define a table row? (Opening tag only)",
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
    q: "Which HTML tag is used to define an unordered list? (Opening tag only)",
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
    q: "Which HTML tag is used to define a list item within an ordered list? (Opening tag only)",
    a: "<li>",
  },
  {
    id: 18,
    q: "Which HTML tag is used to define a level-three heading? (Opening tag only)",
    a: "<h3>",
  },
  {
    id: 19,
    q: "Which HTML tag is used to define a table header cell? (Opening tag only)",
    a: "<th>",
  },
  {
    id: 20,
    q: "Which method is used to serialize an array or object into a JSON string in JavaScript?",
    a: "JSON.stringify()",
  },
  {
    id: 21,
    q: "What does 'AJAX' stand for?",
    a: "Asynchronous JavaScript and XML",
  },
  {
    id: 22,
    q: "Which PHP function is used to send raw HTTP headers to a client?",
    a: "header()",
  },
  {
    id: 23,
    q: "What does 'PDO' stand for in PHP?",
    a: "PHP Data Objects",
  },
  {
    id: 24,
    q: "Which HTML tag is used to embed a video in a webpage? (Opening tag only)",
    a: "<video>",
  },
  {
    id: 25,
    q: "Which PHP function is used to include the content of one PHP file into another PHP file?",
    a: "include()",
  },
  {
    id: 26,
    q: "Which HTML tag is used to define an inline frame? (Opening tag only)",
    a: "<iframe>",
  },
  {
    id: 27,
    q: "Which PHP function is used to perform a regular expression match?",
    a: "preg_match()",
  },
  {
    id: 28,
    q: "Which PHP function is used to split a string by a regular expression?",
    a: "preg_split()",
  },
  {
    id: 29,
    q: "What is the purpose of the 'template' tag in HTML? (Opening tag only)",
    a: "<template>",
  },
  {
    id: 30,
    q: "Which PHP function is used to sort an array in reverse order?",
    a: "rsort()",
  },
  {
    id: 31,
    q: "Which HTML tag is used to define emphasized text? (Opening tag only)",
    a: "<em>",
  },
  {
    id: 32,
    q: "Which PHP function is used to get the length of an array?",
    a: "count()",
  },
  {
    id: 33,
    q: "Which PHP function is used to delete a file?",
    a: "unlink()",
  },
  {
    id: 34,
    q: "Which React method is used to apply side effects in a function component?",
    a: "useEffect()",
  },
  {
    id: 35,
    q: "Which React Native component is used to display a short message at the bottom of the screen?",
    a: "ToastAndroid",
  },
  {
    id: 36,
    q: "Which PHP function is used to generate a random number?",
    a: "rand()",
  },
  {
    id: 37,
    q: "Which JavaScript method is used to parse a JSON string and convert it into a JavaScript object?",
    a: "JSON.parse()",
  },
  {
    id: 38,
    q: "Which React hook is used to add state to a function component?",
    a: "useState()",
  },
  {
    id: 39,
    q: "Which React Native component is used to create a button?",
    a: "Button",
  },
  {
    id: 40,
    q: "Which PHP function is used to connect to a MySQL database?",
    a: "mysqli_connect()",
  },
  {
    id: 41,
    q: "Which React method is used to return multiple elements from a component?",
    a: "Fragment",
  },
  {
    id: 42,
    q: "Which React Native component is used to create a scrolling container?",
    a: "ScrollView",
  },
  {
    id: 43,
    q: "Which PHP function is used to check if a variable is an array?",
    a: "is_array()",
  },
  {
    id: 44,
    q: "Which React hook is used to access the previous value of a prop or state?",
    a: "useRef()",
  },
  {
    id: 45,
    q: "Which React Native component is used to display images?",
    a: "Image",
  },
  {
    id: 46,
    q: "Which PHP function is used to get the current timestamp?",
    a: "time()",
  },
  {
    id: 47,
    q: "Which PHP function is used to start output buffering?",
    a: "ob_start()",
  },
  {
    id: 48,
    q: "Which React Native component is used to create a text input field?",
    a: "TextInput",
  },
  {
    id: 49,
    q: "Which PHP function is used to set a cookie?",
    a: "setcookie()",
  },
  {
    id: 50,
    q: "Which JavaScript method is used to call a function for each element in an array?",
    a: "forEach()",
  },
  {
    id: 51,
    q: "Which React Native component is used to create a view with flexbox layout?",
    a: "View",
  },
  {
    id: 52,
    q: "Which PHP function is used to include a file only once?",
    a: "include_once()",
  },
  {
    id: 53,
    q: "Which JavaScript method is used to create a new array with all elements that pass a test implemented by a provided function?",
    a: "filter()",
  },
  {
    id: 54,
    q: "Which React method is used to memoize a value or function?",
    a: "useMemo()",
  },
  {
    id: 55,
    q: "Which React Native component is used to create a section list?",
    a: "SectionList",
  },
  {
    id: 56,
    q: "Which PHP function is used to count all elements in an array?",
    a: "count()",
  },
  {
    id: 57,
    q: "Which JavaScript method is used to create a new array with the results of calling a provided function on every element in the calling array?",
    a: "map()",
  },
  {
    id: 58,
    q: "Which React Native component is used to create a list view?",
    a: "FlatList",
  },
  {
    id: 59,
    q: "Which JavaScript method is used to sort the elements of an array in place and return the sorted array?",
    a: "sort()",
  },
  {
    id: 60,
    q: "Which React Native component is used to display a progress bar?",
    a: "ProgressBarAndroid",
  },
  {
    id: 61,
    q: "Which JavaScript method is used to merge two or more arrays into a new array?",
    a: "concat()",
  },
  {
    id: 62,
    q: "Which JavaScript method is used to find the first element in an array that satisfies a condition?",
    a: "find()",
  },
];
