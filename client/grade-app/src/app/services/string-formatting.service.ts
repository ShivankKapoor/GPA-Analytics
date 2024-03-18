import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringFormattingService {

  constructor() { }

  toServer(text: string): string {
    return text.toLowerCase();
  }

  toTitleCase(text: string): string {
    return text.replace(/\b\w/g, (char) => char.toUpperCase());
  }

  convertToSentenceCase(paragraph: string): string {
    const sentences = paragraph.split('. ');
    const sentenceCaseSentences = sentences.map((sentence) => {
      const trimmedSentence = sentence.trim();
      if (trimmedSentence.length > 0) {
        return trimmedSentence.charAt(0).toUpperCase() + trimmedSentence.slice(1);
      } else {
        return trimmedSentence;
      }
    });
    return sentenceCaseSentences.join('. ');
  }
}