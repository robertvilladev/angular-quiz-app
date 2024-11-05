import { Component, Input } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss',
})
export class QuestionComponent {
  @Input() question: string = '';
  loading: boolean = false;

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.fetchNewQuestion();
  }

  public generateRandomQuestion() {
    const randomInitialPromptOptions = [
      "What's the capital of France?",
      'What is the largest planet in our solar system?',
      'What is the most populous country in the world?',
      "What's the tallest mountain in the world?",
      "What's the largest ocean on Earth?",
    ];

    return randomInitialPromptOptions[
      Math.floor(Math.random() * randomInitialPromptOptions.length)
    ];
  }

  async fetchNewQuestion() {
    this.loading = true;

    try {
      const initialPrompt = this.generateRandomQuestion();
      this.question = await this.quizService.fetchQuestion(initialPrompt);
    } catch (error) {
      console.error('Error fetching question:', error);
    } finally {
      this.loading = false;
    }
  }
}
