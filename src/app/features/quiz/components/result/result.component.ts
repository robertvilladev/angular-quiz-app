import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss',
})
export class ResultComponent {
  @Input() isCorrect: boolean | null = null;
  @Input() score: number = 0;
}
