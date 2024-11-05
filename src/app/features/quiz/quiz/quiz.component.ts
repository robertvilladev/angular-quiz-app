import { Component } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { QuestionComponent } from '../components/question/question.component';
import { AnswerComponent } from '../components/answer/answer.component';
import { CommonModule } from '@angular/common';
import { ResultComponent } from '../components/result/result.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, QuestionComponent, AnswerComponent, ResultComponent],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss',
})
export class QuizComponent {
  question: string = '';
  isCorrect: boolean | null = null;
  score: number = 0;

  constructor(private quizService: QuizService) {}

  // subscribe to the user answer

  async fetchQuestion() {
    this.question = await this.quizService.fetchQuestion(
      'Ask a question for the quiz'
    );
    this.isCorrect = null; // Reset correctness for new question
  }

  async submitAnswer(answer: string) {
    // Here, we assume we’re checking the answer based on predefined logic.
    // For simplicity, let's assume a correct answer is "yes".
    //TODO: Implement a more complex logic to check the answer
    this.isCorrect = answer.toLowerCase() === 'yes';
    if (this.isCorrect) {
      this.score++;
    }
  }
}
