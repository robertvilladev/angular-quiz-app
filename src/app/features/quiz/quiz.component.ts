import { Component, OnInit } from '@angular/core';
import { PlainQuiz } from './models/ui-quiz.model';
import { AnswerComponent } from './components/answer/answer.component';
import { QuestionComponent } from './components/question/question.component';
import { CommonModule } from '@angular/common';
import { ResultComponent } from './components/result/result.component';
import { QuizService } from './services/quiz.service';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, QuestionComponent, AnswerComponent, ResultComponent],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss',
})
export class QuizComponent implements OnInit {
  questions: PlainQuiz[] = []; // Stores all fetched questions
  currentQuestionIndex: number = 0; // Tracks the current question index
  score: number = 0; // Tracks the user's score

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.loadQuestions();
  }

  get currentQuestion(): PlainQuiz | null {
    return this.questions[this.currentQuestionIndex] || null;
  }

  loadQuestions() {
    this.quizService.getQuiz().subscribe({
      next: (questions) => {
        this.questions = questions;
      },
      error: (err) => console.error('Failed to load questions', err),
    });
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  previousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  selectAnswer(answerId: string) {
    const currentQuestion = this.currentQuestion;
    if (!currentQuestion) return;

    const isCorrect = currentQuestion.correctAnswerIndex === answerId;

    if (isCorrect) {
      alert('Correct answer!');
      this.score++;
      /*   this.nextQuestion(); */
    } else {
      console.log(' incorrect', 'color: #26bfa5;');
    }

    console.log(
      '%csrcapp\featuresquizquiz.component.ts:67 score',
      'color: #26bfa5;',
      this.score
    );
  }
}
