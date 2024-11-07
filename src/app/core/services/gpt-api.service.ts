import { Injectable } from '@angular/core';
import OpenAI from 'openai';

@Injectable({
  providedIn: 'root',
})
export class GptApiService {
  constructor() {}

  defaultPrompt = 'What is the capital of France?';

  async getQuizQuestions(prompt = this.defaultPrompt): Promise<unknown> {
    const openai = new OpenAI({
      apiKey: '',
      dangerouslyAllowBrowser: true,
      project: '',
    });

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'gpt-4o-mini',
    });

    return completion;
  }
}
