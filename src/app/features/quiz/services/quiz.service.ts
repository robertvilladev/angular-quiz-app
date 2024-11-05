// src/app/features/quiz/services/quiz.service.ts
import { Injectable } from '@angular/core';
import { GptApiService } from '../../../core/services/gpt-api.service';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private gptApiService: GptApiService) {}

  async fetchQuestion(prompt: string) {
    const response = await this.gptApiService.getQuizQuestions(prompt);
    console.log(
      '%csrc/app/features/quiz/services/quiz.service.ts:13 response',
      'color: #26bfa5;',
      response
    );
    const completion = response.choices[0].text;

    console.log(
      '%csrc/app/features/quiz/services/quiz.service.ts:15 completion',
      'color: #26bfa5;',
      completion
    );

    return completion;
  }
}

/*
 */
