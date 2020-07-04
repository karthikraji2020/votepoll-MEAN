import { Option } from './options.interface';

export interface QuizQuestion {
  questionId: number;
  questionText: string;
  options: Option[];
  answer: string;
  selectedOption: string;
}
