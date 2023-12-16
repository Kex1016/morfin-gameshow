import NState from "nstate";

export type Answer = {
  id: number;
  text: string;
  questionId: number;
};

export type Question = {
  id: number;
  text: string;
};

interface StoreInterface {
  questions: Question[];
  answers: Answer[];
  currentQuestionId: number;
  timeout: number;
  imported: boolean;
}

// The store class, which extends NState
export class Store extends NState<StoreInterface> {
  incQuestionId() {
    this.setState({
      currentQuestionId: this.state.currentQuestionId + 1,
    });
  }

  addAnswer(answer: Answer) {
    this.setState({
      answers: [...this.state.answers, answer],
    });
  }

  addAnswers(answers: Answer[]) {
    this.setState({
      answers: [...this.state.answers, ...answers],
    });
  }

  setAnswers(answers: Answer[]) {
    this.setState({
      answers,
    });
  }

  addQuestion(question: Question) {
    this.setState({
      questions: [...this.state.questions, question],
    });
  }

  addQuestions(questions: Question[]) {
    this.setState({
      questions: [...this.state.questions, ...questions],
    });
  }

  setQuestions(questions: Question[]) {
    this.setState({
      questions,
    });
  }

  getQuestionById(id: number) {
    return this.state.questions.find((question) => question.id === id);
  }

  getAnswerById(id: number) {
    return this.state.answers.find((answer) => answer.id === id);
  }

  getAnswersByQuestionId(id: number) {
    return this.state.answers.filter((answer) => answer.questionId === id);
  }

  getQuestions() {
    return this.state.questions;
  }

  getAnswers() {
    return this.state.answers;
  }

  getCurrentQuestionId() {
    return this.state.currentQuestionId;
  }

  setCurrentQuestionId(currentQuestionId: number) {
    this.setState({
      currentQuestionId: currentQuestionId,
    });
  }

  getImported() {
    return this.state.imported;
  }

  setImported(imported: boolean) {
    this.setState({
      imported: imported,
    });
  }

  getTimeout() {
    return this.state.timeout;
  }

  setTimeout(timeout: number) {
    this.setState({
      timeout: timeout,
    });
  }
}

// Initialize the store
export const store = new Store({
  questions: [],
  answers: [],
  currentQuestionId: 0,
  imported: false,
  timeout: 60,
});
