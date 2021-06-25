import React, { useState } from 'react';
import { fetchQuizQuestions } from './API';
// Components
import QuestionCard from "./components/QuestionCard";
import { AnswerObject, Difficulty, QuestionState } from './types';
import { GlobalStyle } from './App.style';

const total = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<Array<QuestionState>>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Array<AnswerObject>>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(total, Difficulty.EASY);
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // User answer
      const answer = e.currentTarget.value;
      // Check answer against correct answer
      const correct = questions[number].correct_answer === answer;
      // Add score if answer is correct
      if (correct) setScore(prev => prev + 1);
      // Save answer in the array for user answers
      const answerObject: AnswerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      }
      setUserAnswers(prev => [...prev, answerObject]);
    }
  }

  const nextQuestion = () => {
    // Move on to the next question if not the last question
    const nextQuestion = number + 1;
    if (nextQuestion === total) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }

  }

  return (
    <>
      <GlobalStyle />
      <div className="App">
        <h1>REACT QUIZ</h1>
        {gameOver || userAnswers.length === total
          ?
          (
            <button className="start" onClick={startTrivia}>
              Start
            </button>
          )
          : null}
        {!gameOver ? <p className="score">Score: {score}</p> : null}
        {loading ? <p>Loading Questions....</p> : null}
        {!loading && !gameOver ? <QuestionCard
          questionNumber={number + 1}
          totalQuestions={total}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        /> : null}
        {
          !gameOver
            && !loading
            && userAnswers.length === number + 1
            && number !== total
            ?
            <button className="next" onClick={nextQuestion}>
              Next Question
            </button>
            : null
        }
      </div>
    </>
  );
}

export default App;
