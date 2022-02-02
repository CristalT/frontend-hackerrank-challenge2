# Javascript: Quiz App
Complete a partially completed JavaScript application. Complete the application as shown below in order to pass all the unit tests.

## Environment 

- Node Version: ^12.18.3
- Default Port: 8000

## Application demo

![](https://hrcdn.net/s3_pub/istreet-assets/AHiOHLpXlKdEA8v9uNrUOg/1063069-vanillajs-quiz-app-easy.gif)

## Application description

As developers, we love taking online quizzes. They help us in assessing our strengths and weaknesses.  As a part of your job in your company, you have been tasked with the responsibility to create a Quiz assessment web app. As a Frontend  Developer on this project, here is a list of features that you need to work on to make your Quiz app super successful: 
Add an Introduction View which contains the Instructions for the quiz and a Get Started Button

- Clicking the Get Started Button should start fetching the Question via an Ajax Call. Meanwhile, hide the instructions and show the loader view.
- The question data can be fetched by making an API call to https://jsonmock.hackerrank.com/api/questions/${ID} where ID is fetched from the hidden Input embedded in the page
- API response has the following format:
```json
  {
    "data": {
      "question": "Angular 2 components can be described using ________is a way to do some meta-programming.",
      "options": [
        "a) controllers, controller",
        "b) Loaders, loader",
        "c) typescripts, typescript",
        "d) decorators, decorator"
      ],
      "answer": 3,
      "id": 1
    }
  }
```

- Once the question data is fetched and is ready to be displayed, hide the loader and show the quiz view.
- Add a Quiz View which contains the question, the options of the question and a submit button
- The submit button should be disabled until an option is selected by the user
- Allow the users to select an option they think is correct
- When the user selects an answer, add the class `user-answer` to the option which the user has selected
- There can only be one active `user-answer` for any given question
- Allow the users to click on the submit button once they have selected their option, perform validation of the answer and then display whether their answer is correct or not.
- In case their answer is correct, show a green box using the HTML class `correct-answer`` in the answer selected. In case, it’s incorrect, show a red box using the HTML class `wrong-answer` in the selected answer and a green box using class `correct-answer` corresponding to the correct answer.

## Test Requirements 

In order for the test cases to pass:
- Keep all the "data-testid" attributes which are on the page.
- Add class correct-answer to the option which contains the correct answer for the question
- Add class wrong-answer to the option which contains the incorrect answer for the question
- Add class user-answer to the option which contains the user’s answer for the question

All the markup for the question has been added. As a candidate, you have to complete the Javascript file to implement the above-stated features/functionality.

## Project Specifications

**Read Only Files**
- `test/*`
- `src/index.js`
- `src/js/generateQuestionId.js`
- `src/index.html`
- `app.js`

**Commands**
- run: 
```bash
bash bin/env_setup && . $HOME/.nvm/nvm.sh && npm start
```
- install: 
```bash
bash bin/env_setup && . $HOME/.nvm/nvm.sh && npm install
```
- test: 
```bash
bash bin/env_setup && . $HOME/.nvm/nvm.sh && npm test
```
