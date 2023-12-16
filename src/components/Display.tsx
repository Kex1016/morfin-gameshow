import { useState } from "react";
import { store } from "../store/Store";

function Display() {
  const [showAnswer, setShowAnswer] = useState(false);
  const [isOver, setIsOver] = useState(false);
  const storeInstance = store.useState();

  function rng(max: number) {
    return Math.floor(Math.random() * max);
  }

  function handleNext() {
    // Show the answer for 10 seconds
    setShowAnswer(true);
    setTimeout(() => {
      setShowAnswer(false);

      setTimeout(() => {
        // Remove the current question from the array
        const questions = storeInstance.questions.filter(
          (question) =>
            question.id !==
            storeInstance.questions[storeInstance.currentQuestionId].id
        );

        const answers = storeInstance.answers.filter(
          (answer) =>
            answer.questionId !==
            storeInstance.questions[storeInstance.currentQuestionId].id
        );

        store.setQuestions(questions);
        store.setAnswers(answers);

        // Get a random question
        const randomQuestionId = rng(questions.length);

        if (storeInstance.questions.length === 0) {
          return setIsOver(true);
        }

        store.setCurrentQuestionId(randomQuestionId);
      }, 500);
    }, 5000);
  }

  return (
    <>
      <div
        className={
          "answerModal fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-10 " +
          (showAnswer ? "active" : "")
        }
      >
        <div className="bg-white text-black p-5 rounded-lg min-w-[500px] max-w-5xl">
          <div className="progress bg-blue-600 h-2"></div>
          <p className="mb-5 text-[2.5em] font-bold text-center">
            {storeInstance.questions[storeInstance.currentQuestionId].text}
          </p>
          <p className="text-[1.5em] text-center">
            {storeInstance.answers[storeInstance.currentQuestionId].text}
          </p>
        </div>
      </div>
      <div className="min-h-screen flex flex-col justify-center items-center gap-5">
        <div className="fixed top-5 left-5 text-xl">
          #{storeInstance.questions[storeInstance.currentQuestionId].id + 1}
        </div>
        <h1 className="text-[3em] font-bold">
          {storeInstance.questions[storeInstance.currentQuestionId].text}
        </h1>
        <h2 className="text-[1.5em] font-light italic">
          Say your answers now!
        </h2>
        <div className="fixed bottom-5 right-5 max-w-[500px] gap-5" id="debug">
          {storeInstance.answers.map((answer) => {
            console.log(answer);

            const question = storeInstance.questions.find(
              (question) => question.id === answer.questionId
            );

            if (!question) {
              return null;
            }

            return (
              <>
                <div className="question-text text-[2em] font-bold">
                  {question.text}
                </div>
                <div className="answer-text text-[1.5em] font-light italic">
                  {answer.text}
                </div>
              </>
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => {
            handleNext();
          }}
          className={
            "fixed bottom-5 left-5 text-[1.25em] font-bold py-2 px-4 rounded " +
            (showAnswer ? "bg-gray-700" : "bg-blue-500 hover:bg-blue-700 z-0")
          }
          disabled={isOver}
        >
          Show answer
        </button>
      </div>
    </>
  );
}

export default Display;
