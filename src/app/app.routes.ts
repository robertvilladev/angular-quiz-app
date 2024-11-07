import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { QuizComponent } from './features/quiz/quiz.component';

export const routes: Routes = [
  {
    path: 'quiz',
    component: QuizComponent,
  },
  { path: '', redirectTo: '/quiz', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
