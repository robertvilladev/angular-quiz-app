import { QuizOption } from '../../models';

export interface PlainQuiz {
  id: string;
  options: QuizOption[];
  questionText: string;
  explanation: string;
  correctAnswerIndex: string;

  /*
    //TODO: future implementation
    tags: string[];
    difficulty: QuizDifficulty;
  */
}

export interface QuizDifficulty {
  id: string;
  name: string;
  description: string;
  type: QuizDifficultyType;
}

export enum QuizDifficultyType {
  EASY = 'easy',
  HARD = 'hard',
  MEDIUM = 'medium',
}
