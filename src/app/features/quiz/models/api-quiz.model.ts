export interface ApiQuiz {
  id: number;
  question_text: string;
  wrong_answers: string[];
  correct_answer: string;
  explanation: string;
}
