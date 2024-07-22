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

const getRandomItem = (array, num) => {
  const shuffledArray = array.sort(() => 0.5 - Math.random());
  return shuffledArray.slice(0, num);
};

export default function Quiz1() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCorrect, setIsCorrect] = useState(null);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);

  useEffect(() => {
    setQuestions(getRandomItem(data, 10)); // Pick 3 random questions when component mounts
  }, []);

  const onChoiceSelect = (key, selectedChoice) => {
    if (questions.length === 0) return;
    setSelectedAnswer(key);

    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswer = currentQuestion.a;

    if (selectedChoice !== null) {
      if (
        selectedChoice.trim().toLowerCase() ===
        correctAnswer.trim().toLowerCase()
      ) {
        setIsCorrect(true);

        setCorrectAnswersCount((prevCount) => prevCount + 1);
      } else {
        setIsCorrect(false);
        const correctKey = Object.keys(
          currentQuestion.c.find(
            (choice) => Object.values(choice)[0] === currentQuestion.a
          )
        )[0];
        setCorrectAnswer(correctKey);
      }
    } else {
      setIsCorrect(false);
    }

    setTimeout(() => {
      setIsCorrect(null);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setCorrectAnswer(null);
      } else {
        setShowResult(true);
        setSelectedAnswer(null);
      }
    }, 1500);
  };

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
      <Text className="text-2xl font-bold py-10 px-5">Level 1</Text>
      <View style={styles.container}>
        <QuestionCount
          showResult={showResult}
          currentQuestionIndex={currentQuestionIndex}
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
              {currentQuestion.c.map((choice, index) => (
                <View key={index} className="p-1 w-full">
                  {Object.entries(choice).map(([key, value]) => (
                    <Pressable
                      key={key}
                      className={`bg-white border border-gray-500 flex flex-row items-center py-1 rounded-full active:bg-blue-50 w-full ${
                        selectedAnswer === key && correctAnswer === null
                          ? "bg-green-400 border-green-400"
                          : correctAnswer === key
                          ? "bg-green-400 border-green-400"
                          : ""
                      } `}
                      onPress={() => onChoiceSelect(key, value)}
                      disabled={selectedAnswer !== null}
                    >
                      <Text className="uppercase text-center text-green-600 font-medium text-base bg-green-200 px-3.5 py-1.5 rounded-full ml-2 mr-3">
                        {key}
                      </Text>
                      <Text className="text-center text-black text-base">
                        {value}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              ))}
            </View>
          </View>
        ) : (
          <View>
            <Pressable
              onPress={() => onShowResult()}
              className="bg-green-600 px-6 py-2.5 mb-10 rounded-full active:bg-green-800 duration-300"
            >
              <Text className="text-white font-semibold tracking-wider">
                Show Result
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end", // Align content at the bottom
    alignItems: "center", // Center content horizontally
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
    q: "Which HTML attribute is used to define inline styles?",
    c: [{ a: "style" }, { b: "class" }, { c: "styles" }, { d: "font" }],
    a: "style",
  },
  {
    id: 5,
    q: "How do you create a function in JavaScript?",
    c: [
      { a: "function myFunction()" },
      { b: "function:myFunction()" },
      { c: "function = myFunction()" },
      { d: "func myFunction()" },
    ],
    a: "function myFunction()",
  },
  {
    id: 6,
    q: "How do you add a comment in a CSS file?",
    c: [
      { a: "// this is a comment" },
      { b: "/* this is a comment */" },
      { c: "<!-- this is a comment -->" },
      { d: "' this is a comment" },
    ],
    a: "/* this is a comment */",
  },
  {
    id: 7,
    q: "Which property is used to change the background color in CSS?",
    c: [
      { a: "color" },
      { b: "background-color" },
      { c: "bgcolor" },
      { d: "bg-color" },
    ],
    a: "background-color",
  },
  {
    id: 8,
    q: "Which HTML tag is used to define an internal style sheet?",
    c: [{ a: "<style>" }, { b: "<css>" }, { c: "<script>" }, { d: "<link>" }],
    a: "<style>",
  },
  {
    id: 9,
    q: "How do you write an IF statement in JavaScript?",
    c: [
      { a: "if i == 5 then" },
      { b: "if (i == 5)" },
      { c: "if i = 5" },
      { d: "if i = 5 then" },
    ],
    a: "if (i == 5)",
  },
  {
    id: 10,
    q: "Which CSS property controls the text size?",
    c: [
      { a: "font-style" },
      { b: "text-size" },
      { c: "font-size" },
      { d: "text-style" },
    ],
    a: "font-size",
  },
  {
    id: 11,
    q: "What is the correct HTML element for inserting a line break?",
    c: [{ a: "<br>" }, { b: "<lb>" }, { c: "<break>" }, { d: "<newline>" }],
    a: "<br>",
  },
  {
    id: 12,
    q: "How do you select an element with id 'demo' in CSS?",
    c: [{ a: "#demo" }, { b: ".demo" }, { c: "demo" }, { d: "*demo" }],
    a: "#demo",
  },
  {
    id: 13,
    q: "Which HTML attribute specifies an alternate text for an image, if the image cannot be displayed?",
    c: [{ a: "title" }, { b: "alt" }, { c: "src" }, { d: "longdesc" }],
    a: "alt",
  },
  {
    id: 14,
    q: "Which method is used to serialize an object into a JSON string in JavaScript?",
    c: [
      { a: "JSON.parse()" },
      { b: "JSON.stringify()" },
      { c: "JSON.toString()" },
      { d: "JSON.convert()" },
    ],
    a: "JSON.stringify()",
  },
  {
    id: 15,
    q: "How do you declare a JavaScript variable?",
    c: [
      { a: "var carName;" },
      { b: "v carName;" },
      { c: "variable carName;" },
      { d: "carName var;" },
    ],
    a: "var carName;",
  },
  {
    id: 16,
    q: "Which CSS property is used to change the text color of an element?",
    c: [
      { a: "text-color" },
      { b: "color" },
      { c: "font-color" },
      { d: "text-style" },
    ],
    a: "color",
  },
  {
    id: 17,
    q: "In HTML, which attribute is used to specify that an input field must be filled out?",
    c: [
      { a: "placeholder" },
      { b: "validate" },
      { c: "required" },
      { d: "formvalidate" },
    ],
    a: "required",
  },
  {
    id: 18,
    q: "Which HTML element is used to specify a footer for a document or section?",
    c: [
      { a: "<bottom>" },
      { b: "<footer>" },
      { c: "<foot>" },
      { d: "<section>" },
    ],
    a: "<footer>",
  },
  {
    id: 19,
    q: "Which method is used to add an element at the end of an array in JavaScript?",
    c: [{ a: "push()" }, { b: "add()" }, { c: "unshift()" }, { d: "pop()" }],
    a: "push()",
  },
  {
    id: 20,
    q: "What does CSS stand for?",
    c: [
      { a: "Creative Style Sheets" },
      { b: "Cascading Style Sheets" },
      { c: "Computer Style Sheets" },
      { d: "Colorful Style Sheets" },
    ],
    a: "Cascading Style Sheets",
  },
  {
    id: 21,
    q: "Which HTML element is used to define the title of a document?",
    c: [{ a: "<meta>" }, { b: "<title>" }, { c: "<head>" }, { d: "<link>" }],
    a: "<title>",
  },
  {
    id: 22,
    q: "How do you make a list that lists the items with numbers in HTML?",
    c: [{ a: "<ul>" }, { b: "<ol>" }, { c: "<dl>" }, { d: "<list>" }],
    a: "<ol>",
  },
  {
    id: 23,
    q: "Which HTML attribute is used to define the inline JavaScript?",
    c: [{ a: "script" }, { b: "js" }, { c: "onclick" }, { d: "event" }],
    a: "onclick",
  },
  {
    id: 24,
    q: "How can you make a bulleted list in HTML?",
    c: [{ a: "<list>" }, { b: "<ol>" }, { c: "<dl>" }, { d: "<ul>" }],
    a: "<ul>",
  },
  {
    id: 25,
    q: "Which property is used to change the font of an element in CSS?",
    c: [
      { a: "font-style" },
      { b: "font-family" },
      { c: "font-weight" },
      { d: "font-size" },
    ],
    a: "font-family",
  },
  {
    id: 26,
    q: "What does the <a> HTML element represent?",
    c: [
      { a: "An image" },
      { b: "A hyperlink" },
      { c: "A paragraph" },
      { d: "A header" },
    ],
    a: "A hyperlink",
  },
  {
    id: 27,
    q: "How do you call a function named 'myFunction' in JavaScript?",
    c: [
      { a: "call function myFunction()" },
      { b: "myFunction()" },
      { c: "call myFunction()" },
      { d: "myFunction(call)" },
    ],
    a: "myFunction()",
  },
  {
    id: 28,
    q: "Which HTML attribute is used to specify the link destination in an anchor tag?",
    c: [{ a: "href" }, { b: "source" }, { c: "link" }, { d: "target" }],
    a: "href",
  },
  {
    id: 29,
    q: "What is the correct HTML tag for defining a table header?",
    c: [{ a: "<th>" }, { b: "<thead>" }, { c: "<td>" }, { d: "<header>" }],
    a: "<th>",
  },
  {
    id: 30,
    q: "How do you select all elements with the class name 'myClass' in CSS?",
    c: [
      { a: ".myClass" },
      { b: "#myClass" },
      { c: "myClass" },
      { d: "*myClass" },
    ],
    a: ".myClass",
  },
  {
    id: 31,
    q: "How do you center an element horizontally within its container using CSS?",
    c: [
      { a: "text-align: center;" },
      { b: "margin: 0 auto;" },
      { c: "display: flex; justify-content: center;" },
      { d: "all of the above" },
    ],
    a: "all of the above",
  },
  {
    id: 32,
    q: "What is the correct CSS syntax to change the background color of a div element?",
    c: [
      { a: "background-color: red;" },
      { b: "color: red;" },
      { c: "body { background-color: red; }" },
      { d: "div-style: background-color: red;" },
    ],
    a: "background-color: red;",
  },
  {
    id: 33,
    q: "Which CSS property is used to control the spacing between elements?",
    c: [{ a: "margin" }, { b: "padding" }, { c: "border" }, { d: "spacing" }],
    a: "margin",
  },
  {
    id: 34,
    q: "Which built-in method returns the length of a string?",
    c: [{ a: "length()" }, { b: "len()" }, { c: "size()" }, { d: "length" }],
    a: "length",
  },
  {
    id: 35,
    q: "What is the correct syntax for a single-line comment in JavaScript?",
    c: [
      { a: "// comment" },
      { b: "# comment" },
      { c: "/* comment */" },
      { d: "' comment '" },
    ],
    a: "// comment",
  },
  {
    id: 36,
    q: "What is the result of the following JavaScript code: 5 + '5'?",
    c: [{ a: "10" }, { b: "55" }, { c: "NaN" }, { d: "Error" }],
    a: "55",
  },
  {
    id: 37,
    q: "Which event occurs when the user clicks on an HTML element?",
    c: [
      { a: "onclick" },
      { b: "onmouseclick" },
      { c: "onmouseover" },
      { d: "onkeypress" },
    ],
    a: "onclick",
  },
];
