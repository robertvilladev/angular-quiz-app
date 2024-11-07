import { Injectable } from '@angular/core';
import { MockedApiService } from '@app/core/services/mocked-api.service';
import { Observable, of } from 'rxjs';
import { mapApiQuizToPlainQuiz } from '../models/quiz-mappers';
import { PlainQuiz } from '../models/ui-quiz.model';

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
