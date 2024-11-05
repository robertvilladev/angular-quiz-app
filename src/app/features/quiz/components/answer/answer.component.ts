import { CommonModule } from '@angular/common';
import { Component, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-answer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './answer.component.html',
  styleUrl: './answer.component.scss',
})
export class AnswerComponent {
  userAnswer: string = '';
  @Output() answerSubmitted = new EventEmitter<string>();

  submitAnswer() {
    const trimmedAnswer = this.userAnswer.trim();
    this.answerSubmitted.emit(trimmedAnswer);
    this.userAnswer = ''; // Reset the input
  }
}
