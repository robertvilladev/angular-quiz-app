import { Injectable } from '@angular/core';
import { questions } from '@mocks/quiz.json';
import { ApiQuiz } from '@app/features/quiz/models/api-quiz.model';

@Injectable({
  providedIn: 'root',
})
export class MockedApiService {
  constructor() {}

  maxQuestions = 5;
  initialIndex = Math.floor(Math.random() * questions.length);

  fetchQuestionsGroup(): ApiQuiz[] {
    const group = questions.slice(
      this.initialIndex,
      this.initialIndex + this.maxQuestions
    );

    if (group.length < this.maxQuestions) {
      const remaining = this.maxQuestions - group.length;
      group.push(...questions.slice(0, remaining));
    }

    return group;
  }
}
