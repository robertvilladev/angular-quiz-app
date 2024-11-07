export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface AnswerFeedback {
  isCorrect: boolean;
  message: string;
}
