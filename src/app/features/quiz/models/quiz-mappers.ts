import { QuizOption } from '../../models';
import { ApiQuiz } from './api-quiz.model';
import { PlainQuiz } from './ui-quiz.model';

export const mapApiQuizToPlainQuiz = (apiQuiz: ApiQuiz): PlainQuiz => {
  const randomString = Math.random().toString(36).substring(7);

  const options = [...apiQuiz.wrong_answers, apiQuiz.correct_answer].sort(
    () => Math.random() - 0.5
  );

  const correctAnswerIndex = options.indexOf(apiQuiz.correct_answer);
  const mappedOptions = mapQuizToQuizOptions(options, correctAnswerIndex);

  return {
    id: randomString,
    options: mappedOptions,
    explanation: apiQuiz.explanation,
    questionText: apiQuiz.question_text,
    correctAnswerIndex: mappedOptions[correctAnswerIndex].id,
  };
};

export const mapQuizToQuizOptions = (
  quizOptions: string[],
  correctAnswerIndex: number
): QuizOption[] => {
  return quizOptions.map((option, index) => ({
    id: index.toString(),
    text: option,
    isCorrect: index === correctAnswerIndex,
  }));
};
