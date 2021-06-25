export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard"
}

export type Question = {
    category: string,
    correct_answer: string,
    difficulty: Difficulty,
    incorrect_answers: Array<string>,
    question: string,
    type: string
}

export type QuestionState = Question & { answers: Array<string> };


export type AnswerObject = {
    question: string;
    answer: string;
    correct: boolean;
    correctAnswer: string;
}
  