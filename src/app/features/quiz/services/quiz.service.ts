import { Injectable } from '@angular/core';
import { MockedApiService } from '@app/core/services/mocked-api.services';
import { Observable, of } from 'rxjs';
import { PlainQuiz } from '../models/ui-quiz.model';
import { mapApiQuizToPlainQuiz } from '../models/quiz-mappers';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private mockedService: MockedApiService) {}

  getQuiz(): Observable<PlainQuiz[]> {
    const questions = this.mockedService.fetchQuestionsGroup();
    const parsedQuestions = questions.map(mapApiQuizToPlainQuiz);
    return of(parsedQuestions);
  }
}
