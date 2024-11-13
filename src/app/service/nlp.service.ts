import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class NlpService {
  private apiKey = '';

  constructor() { }

  async sendPrompt(prompt: string) {
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=' + this.apiKey;
    const headers = {
      'Content-Type': 'application/json'
    };
    const data = {
      contents: [
        {
          parts: [
            {
              text: prompt
            }
          ]
        }
      ]
    };

    try {
      const response = await axios.post(url, data, { headers });
      console.log('API Response:', response.data); // Log the entire response
      return response.data; // Return the whole data object
    } catch (error) {
      console.error('Error sending prompt:', error);
      return 'An error occurred';
    }
  }
}