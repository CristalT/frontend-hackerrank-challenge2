import {findByTestId, fireEvent, getByTestId} from "@testing-library/dom";

const API_URL = 'https://jsonmock.hackerrank.com';
const axios = require('axios');

const fetchQuestionById = (id) => {
  return new Promise(((resolve, reject) => {
    axios(`${API_URL}/api/questions/${id}`)
      .then(response => {
        resolve(response.data.data)
      })
      .catch(reject);
  }))
};

const setupQuestion = async (body) => {
  const startButton = getByTestId(body, "start-button")
  expect(startButton).toBeDefined()
  fireEvent.click(startButton)

  const id = getByTestId(body, "current-question-id").getAttribute('value')

  const questionData = await fetchQuestionById(parseInt(id));
  await findByTestId(body, "quiz")

  return {questionData};
};


module.exports = {
  fetchQuestionById,
  setupQuestion,
};
