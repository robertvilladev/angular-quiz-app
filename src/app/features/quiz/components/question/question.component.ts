import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlainQuiz } from '../../models/ui-quiz.model';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss',
})
export class QuestionComponent {
  @Input() question: PlainQuiz | null = null;
  @Output() answerSelected = new EventEmitter();

  loading: boolean = false;

  selectAnswer(answerId: string) {
    this.answerSelected.emit(answerId);
  }
}
