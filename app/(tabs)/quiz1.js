import { router } from "expo-router";
import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Pressable,
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

// Shuffle the question choices
const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

// Quiz 1
// Multiple Choice Quiz
// Topic:
//   HTML
//   CSS
//   Javascript

export default function Quiz1() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCorrect, setIsCorrect] = useState(null);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [shuffledChoices, setShuffledChoices] = useState([]);

  useEffect(() => {
    setQuestions(getRandomItem(data, 10)); // Pick 10 random questions when component mounts
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      setShuffledChoices(shuffle([...questions[currentQuestionIndex].c])); // Shuffle the 4 choices in every questions
    }
  }, [questions, currentQuestionIndex]);

  // Submit selected choice
  const onChoiceSelect = (key, selectedChoice) => {
    if (questions.length === 0) return;
    setSelectedAnswer(key); // Fetch the players answer key

    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswer = currentQuestion.a;

    if (selectedChoice !== null) {
      // Check if the player chooses an answer
      if (
        selectedChoice.trim().toLowerCase() ===
        correctAnswer.trim().toLowerCase() // Check if the player answer is the same with the answer key
      ) {
        // If player answer is correct
        setIsCorrect(true);
        setCorrectAnswersCount((prevCount) => prevCount + 1); // Add score to the player
      } else {
        // If wrong
        setIsCorrect(false);
        setCorrectAnswer(correctAnswer); // Show the correct answer if the player gets the wrong answer
      }
    } else {
      setIsCorrect(false);
    }

    // Continue here after the validation of player answer
    setTimeout(() => {
      setIsCorrect(null);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1); // Proceeds to the next question
        setSelectedAnswer(null);
        setCorrectAnswer(null);
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
        pathname: "/result1",
        params: {
          correctAnswersCount,
          totalQuestions: questions.length,
        },
      });
    }, 1000);
  };

  if (questions.length === 0) {
    return <Text>Loading...</Text>; // Show loading while question is being selected
  }
  const currentQuestion = questions[currentQuestionIndex];
  return (
    <ImageBackground
      source={require("../../public/Scene1.gif")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <Level level={1} />
      <View style={styles.container}>
        <QuestionCount
          showResult={showResult}
          currentQuestionIndex={currentQuestionIndex}
          correctAnswer={correctAnswersCount}
          questions={questions.length}
          quiz={1}
        />

        {!showResult ? (
          <View>
            <Question
              isCorrect={isCorrect}
              currentQuestion={currentQuestion.q}
            />
            <View className="bg-white flex flex-col flex-wrap gap-y-2 py-6 px-3">
              {shuffledChoices.map((choice, index) => (
                <Pressable
                  key={index}
                  className={`bg-white border border-gray-500 flex flex-row items-center py-1 rounded-full active:bg-blue-50 w-full ${
                    selectedAnswer === index && correctAnswer === null
                      ? "bg-green-400 border-green-400"
                      : correctAnswer === index
                      ? "bg-green-400 border-green-400"
                      : ""
                  } `}
                  onPress={() => onChoiceSelect(index, choice)}
                  disabled={selectedAnswer !== null}
                >
                  <Text className="uppercase text-center text-green-600 font-medium text-base bg-green-200 px-3.5 py-1.5 rounded-full ml-2 mr-3">
                    {String.fromCharCode(65 + index)}
                  </Text>
                  <Text className="text-center text-black text-base">
                    {choice}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
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
    justifyContent: "flex-end", // Align content at the bottom
    padding: 0,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center", // Center content vertically
  },
});

const data = [
  {
    id: 1,
    q: "Which HTML tag is used to define a hyperlink?",
    c: ["<Link>", "<a>", "<href>", "<anchor>"],
    a: "<a>",
  },
  {
    id: 2,
    q: "Which CSS property is used to change the text color of an element?",
    c: ["font-color", "text-color", "color", "text-style"],
    a: "color",
  },
  {
    id: 3,
    q: "What is the correct syntax to include an external javascript file in an HTML document?",
    c: [
      "<script link='script.js'></script>",
      "<script src='script.js'></script>",
      "<script href='script.js'></script>",
      "<script file='script.js'></script>",
    ],
    a: "<script src='script.js'></script>",
  },
  {
    id: 4,
    q: "Which HTML attribute is used to define inline styles?",
    c: ["style", "class", "styles", "font"],
    a: "style",
  },
  {
    id: 5,
    q: "How do you create a function in JavaScript?",
    c: [
      "function myFunction()",
      "function:myFunction()",
      "function = myFunction()",
      "func myFunction()",
    ],
    a: "function myFunction()",
  },
  {
    id: 6,
    q: "How do you add a comment in a CSS file?",
    c: [
      "// this is a comment",
      "/* this is a comment */",
      "<!-- this is a comment -->",
      "' this is a comment",
    ],
    a: "/* this is a comment */",
  },
  {
    id: 7,
    q: "Which property is used to change the background color in CSS?",
    c: ["color", "background-color", "bgcolor", "bg-color"],
    a: "background-color",
  },
  {
    id: 8,
    q: "Which HTML tag is used to define an internal style sheet?",
    c: ["<style>", "<css>", "<script>", "<link>"],
    a: "<style>",
  },
  {
    id: 9,
    q: "How do you write an IF statement in JavaScript?",
    c: ["if i == 5 then", "if (i == 5)", "if i = 5", "if i = 5 then"],
    a: "if (i == 5)",
  },
  {
    id: 10,
    q: "Which CSS property controls the text size?",
    c: ["font-style", "text-size", "font-size", "text-style"],
    a: "font-size",
  },
  {
    id: 11,
    q: "What is the correct HTML element for inserting a line break?",
    c: ["<br>", "<lb>", "<break>", "<newline>"],
    a: "<br>",
  },
  {
    id: 12,
    q: "How do you select an element with id 'demo' in CSS?",
    c: ["#demo", ".demo", "demo", "*demo"],
    a: "#demo",
  },
  {
    id: 13,
    q: "Which HTML attribute specifies an alternate text for an image, if the image cannot be displayed?",
    c: ["title", "alt", "src", "longdesc"],
    a: "alt",
  },
  {
    id: 14,
    q: "Which method is used to serialize an object into a JSON string in JavaScript?",
    c: [
      "JSON.parse()",
      "JSON.stringify()",
      "JSON.toString()",
      "JSON.convert()",
    ],
    a: "JSON.stringify()",
  },
  {
    id: 15,
    q: "How do you declare a JavaScript variable?",
    c: ["var carName;", "v carName;", "variable carName;", "carName var;"],
    a: "var carName;",
  },
  {
    id: 16,
    q: "Which CSS property is used to change the text color of an element?",
    c: ["text-color", "color", "font-color", "text-style"],
    a: "color",
  },
  {
    id: 17,
    q: "In HTML, which attribute is used to specify that an input field must be filled out?",
    c: ["placeholder", "validate", "required", "formvalidate"],
    a: "required",
  },
  {
    id: 18,
    q: "Which HTML element is used to specify a footer for a document or section?",
    c: ["<bottom>", "<footer>", "<foot>", "<section>"],
    a: "<footer>",
  },
  {
    id: 19,
    q: "Which method is used to add an element at the end of an array in JavaScript?",
    c: ["push()", "add()", "unshift()", "pop()"],
    a: "push()",
  },
  {
    id: 20,
    q: "What does CSS stand for?",
    c: [
      "Creative Style Sheets",
      "Cascading Style Sheets",
      "Computer Style Sheets",
      "Colorful Style Sheets",
    ],
    a: "Cascading Style Sheets",
  },
  {
    id: 21,
    q: "Which HTML element is used to define the title of a document?",
    c: ["<meta>", "<title>", "<head>", "<link>"],
    a: "<title>",
  },
  {
    id: 22,
    q: "How do you make a list that lists the items with numbers in HTML?",
    c: ["<ul>", "<ol>", "<dl>", "<list>"],
    a: "<ol>",
  },
  {
    id: 23,
    q: "Which HTML attribute is used to define the inline JavaScript?",
    c: ["script", "js", "onclick", "event"],
    a: "onclick",
  },
  {
    id: 24,
    q: "How can you make a bulleted list in HTML?",
    c: ["<list>", "<ol>", "<dl>", "<ul>"],
    a: "<ul>",
  },
  {
    id: 25,
    q: "Which property is used to change the font of an element in CSS?",
    c: ["font-style", "font-family", "font-weight", "font-size"],
    a: "font-family",
  },
  {
    id: 26,
    q: "What does the <a> HTML element represent?",
    c: ["An image", "A hyperlink", "A paragraph", "A header"],
    a: "A hyperlink",
  },
  {
    id: 27,
    q: "How do you call a function named 'myFunction' in JavaScript?",
    c: [
      "call function myFunction()",
      "myFunction()",
      "call myFunction()",
      "myFunction(call)",
    ],
    a: "myFunction()",
  },
  {
    id: 28,
    q: "Which HTML attribute is used to specify the link destination in an anchor tag?",
    c: ["href", "source", "link", "target"],
    a: "href",
  },
  {
    id: 29,
    q: "What is the correct HTML tag for defining a table header?",
    c: ["<th>", "<thead>", "<td>", "<header>"],
    a: "<th>",
  },
  {
    id: 30,
    q: "How do you select all elements with the class name 'myClass' in CSS?",
    c: [".myClass", "#myClass", "myClass", "*myClass"],
    a: ".myClass",
  },
  {
    id: 31,
    q: "How do you center an element horizontally within its container using CSS?",
    c: [
      "text-align: center;",
      "margin: 0 auto;",
      "display: flex; justify-content: center;",
      "all of the above",
    ],
    a: "all of the above",
  },
  {
    id: 32,
    q: "What is the correct CSS syntax to change the background color of a div element?",
    c: [
      "background-color: red;",
      "color: red;",
      "body { background-color: red; }",
      "div-style: background-color: red;",
    ],
    a: "background-color: red;",
  },
  {
    id: 33,
    q: "Which CSS property is used to control the spacing between elements?",
    c: ["margin", "padding", "border", "spacing"],
    a: "margin",
  },
  {
    id: 34,
    q: "Which built-in method returns the length of a string?",
    c: ["length()", "len()", "size()", "length"],
    a: "length",
  },
  {
    id: 35,
    q: "What is the correct syntax for a single-line comment in JavaScript?",
    c: ["// comment", "# comment", "/* comment */", "' comment '"],
    a: "// comment",
  },
  {
    id: 36,
    q: "What is the result of the following JavaScript code: 5 + '5'?",
    c: ["10", "55", "NaN", "Error"],
    a: "55",
  },
  {
    id: 37,
    q: "Which event occurs when the user clicks on an HTML element?",
    c: ["onclick", "onmouseclick", "onmouseover", "onkeypress"],
    a: "onclick",
  },
];
