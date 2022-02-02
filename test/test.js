import {findAllByTestId, findByTestId, findByText, fireEvent, getByTestId, waitFor} from "@testing-library/dom"
import "@testing-library/jest-dom/extend-expect"
import jsdom, {JSDOM} from "jsdom"
import path from "path"
import {fetchQuestionById, setupQuestion} from "./utils";

const BASE = path.resolve(__dirname, "../src");

let virtualConsole
let dom, body

describe('quiz app test', function () {
  beforeEach(async () => {
    virtualConsole = new jsdom.VirtualConsole();
    virtualConsole.on("error", console.error);
    dom = await JSDOM.fromFile(`${BASE}/index.html`, {
      runScripts: "dangerously",
      resources: "usable",
      pretendToBeVisual: true,
      virtualConsole
    })
    await loadDom(dom)

    body = dom.window.document.body
  })

  it('Should render the pre quiz view on the screen initially and hide the loader', async function () {
    const preQuizView = getByTestId(body, "pre-quiz-instructions")
    expect(preQuizView).toBeDefined()
    expect(preQuizView).toBeVisible()

    const loader = getByTestId(body, "loader-view")
    expect(loader).toBeDefined()
    expect(loader).not.toBeVisible()
  });

  it('Should should show the loader and hide other components on clicking Start Quiz Button', async function () {
    const startButton = getByTestId(body, "start-button")
    expect(startButton).toBeDefined()
    fireEvent.click(startButton)

    const loader = getByTestId(body, "loader-view")
    expect(loader).toBeDefined()
    expect(loader).toBeVisible()

    const preQuizView = getByTestId(body, "pre-quiz-instructions")
    expect(preQuizView).toBeDefined()
    expect(preQuizView).not.toBeVisible()
  });

  it('Should render the question on the screen', async function () {
    const startButton = getByTestId(body, "start-button")
    expect(startButton).toBeDefined()
    fireEvent.click(startButton)

    const preQuizView = getByTestId(body, "pre-quiz-instructions")
    expect(preQuizView).toBeDefined()
    expect(preQuizView).not.toBeVisible()

    const loader = getByTestId(body, "loader-view")
    expect(loader).toBeDefined()
    expect(loader).toBeVisible()

    const id = getByTestId(body, "current-question-id").getAttribute('value')

    const questionData = await fetchQuestionById(parseInt(id));
    const quiz = await findByTestId(body, "quiz")
    await waitFor(() => expect(quiz).toBeVisible())

    const question = await findByTestId(body, "question")
    expect(question).toBeVisible()
    expect(innerText(question)).toEqual(questionData.question)

    expect(loader).not.toBeVisible()
  });

  it('Should render the options for the question on the screen', async function () {
    const {questionData} = await setupQuestion(body);

    const optionsContainer = await findByTestId(body, "options-container")
    await waitFor(() => expect(optionsContainer).toBeVisible())

    const options = optionsContainer.children
    expect(options.length).toEqual(4)

    for (let i = 0; i < options.length; i++) {
      const option = options[i]
      expect(innerText(option)).toEqual(questionData.options[i])
    }
  });

  it('Should allow the user to select an option', async function () {
    await setupQuestion(body);

    const optionsContainer = await findByTestId(body, "options-container")
    await waitFor(() => expect(optionsContainer).toBeVisible())

    const submitButton = await findByTestId(body, "submit-button")
    expect(submitButton).toBeVisible()
    expect(submitButton).toHaveAttribute("disabled", "true")

    const options = optionsContainer.children
    fireEvent.click(options[1])

    expect(submitButton).not.toHaveAttribute("disabled");
    expect(options[1]).toHaveClass("user-answer")
  });

  it('Should validate answer if the user answer is correct ', async function () {
    const {questionData} = await setupQuestion(body);

    const submitButton = await findByTestId(body, "submit-button")
    const optionsContainer = await findByTestId(body, "options-container")
    await waitFor(() => expect(optionsContainer).toBeVisible())
    const options = optionsContainer.children

    const correctAnswer = options[questionData.answer]
    expect(correctAnswer).toBeVisible()
    fireEvent.click(correctAnswer)
    expect(correctAnswer).toHaveClass("user-answer")

    fireEvent.click(submitButton)
    expect(correctAnswer).toHaveClass("correct-answer")
  });

  it('Should validate answer if the user answer is incorrect ', async function () {
    const {questionData} = await setupQuestion(body);

    const submitButton = await findByTestId(body, "submit-button")
    const optionsContainer = await findByTestId(body, "options-container")
    await waitFor(() => expect(optionsContainer).toBeVisible())
    const options = optionsContainer.children

    const answerIndex = questionData.answer ? 0 : 1;
    const selectedOption = options[answerIndex]
    expect(selectedOption).toBeVisible()
    fireEvent.click(selectedOption)
    expect(selectedOption).toHaveClass("user-answer")

    fireEvent.click(submitButton)
    expect(selectedOption).toHaveClass("wrong-answer")
    expect(selectedOption).not.toHaveClass("correct-answer")
    expect(options[questionData.answer]).toHaveClass("correct-answer")
  });
});


function loadDom(dom) {
  return new Promise((resolve, _) => {
    virtualConsole.on("log", log => {
      if (log === "DOM Loaded") resolve(dom)
    })
  })
}

function innerText(node) {
  return node.innerText || node.textContent
}