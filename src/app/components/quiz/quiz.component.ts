import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import quiz__questions from '../../../assets/data/quiz_questions.json';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [NgIf, NgFor, NgClass],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css', './quiz.responsive.component.css'],
})
export class QuizComponent implements OnInit {
  title: string = '';
  questions: any;
  questionSelected: any;

  answer: string[] = [];
  answerSelected: string = '';

  questionIndex: number = 0;
  questionMaxIndex: number = 0;
  finalAnswer: string = '';

  finished: boolean = false;

  constructor() {}
  ngOnInit(): void {
    if (quiz__questions) this.finished = false;
    this.title = quiz__questions.title;
    this.questions = quiz__questions.questions;
    this.questionSelected = this.questions[this.questionIndex];

    this.questionIndex = 0;
    this.questionMaxIndex = this.questions.length;
  }

  playerChoice(value: string) {
    this.answer.push(value);
    this.nextStep();
  }
  async nextStep() {
    this.questionIndex += 1;

    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex];
    } else {
      this.finalAnswer = await this.checkResult(this.answer);
      this.finished = true;
      this.answerSelected =
        quiz__questions.results[
          this.finalAnswer as keyof typeof quiz__questions.results
        ];
    }
  }

  async checkResult(answers: string[]) {
    const result = answers.reduce((prev, current, i, arr) => {
      if (
        arr.filter((item) => item === prev).length >
        arr.filter((item) => item === current).length
      ) {
        return prev;
      } else {
        return current;
      }
    });
    return result;
  }
}
