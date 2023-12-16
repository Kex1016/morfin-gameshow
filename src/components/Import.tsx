import { Answer, Question, store } from "../store/Store";

function Import() {
  function handleImport() {
    // Text format: question|answer
    const importText = (
      document.getElementById("import") as HTMLTextAreaElement
    ).value;

    if (!importText) {
      return;
    }

    const questions = importText.split("\n");
    const questionsArray: Question[] = [];
    const answersArray: Answer[] = [];

    // remove empty lines
    for (let i = 0; i < questions.length; i++) {
      if (questions[i] === "") {
        questions.splice(i, 1);
        i--;
      }
    }

    let id = 0;
    for (const question of questions) {
      const [text, answer] = question.split("|");
      questionsArray.push({ id, text });
      answersArray.push({ id, text: answer, questionId: id });
      id++;
    }

    store.addQuestions(questionsArray);
    store.addAnswers(answersArray);
    store.setImported(true);
  }

  return (
    <>
      <div className="container mt-5 mx-auto">
        <div className="row">
          <div className="col-12">
            <h1 className="text-2xl font-bold mb-5">Import</h1>
            <p className="mb-5">Import your questions and answers below.</p>
            <p className="mb-5">
              Format:
              <code className="bg-gray-200 text-gray-800 p-1 rounded-lg ml-2">
                question|answer
              </code>
            </p>

            <div className="form-group mb-5">
              <textarea
                name="import"
                id="import"
                className="w-full h-64 px-3"
                placeholder="Your questions in 'question|answer' format"
                required
              />
            </div>
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleImport}
            >
              Import
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Import;
