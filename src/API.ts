import { Difficulty, Question } from "./types";
import { shuffleArray } from "./utils";

export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty) => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    const data = await fetch(endpoint);
    const jsonData = await data.json();
    return jsonData.results.map((question:Question) => (
        {
            ...question,
            answers: shuffleArray([
                ...question.incorrect_answers, 
                question.correct_answer
            ])
        }
    ));
}