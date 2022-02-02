// Js code goes here
const generateQuestionId = require("./generateQuestionId");

var startBtn = document.getElementById("start-button"),
  submitBtn = document.getElementById("submit-button"),
  loader = document.getElementById("loader-view"),
  question = document.getElementById("question"),
  optionsContainer = document.getElementById("options-container"),
  state = {};

function handleResponse(response) {
  return response.json().then((json) => {
    if (response.ok) return json;
    else return Promise.reject(json);
  });
}

async function runProgram() {
  // Empty options
  optionsContainer.innerHTML = "";
  loader.style.display = "block";
  state = {};

  if (!state.answerId) submitBtn.disabled = true;
  else submitBtn.disabled = false;

  generateQuestionId();
  var questionId = document.getElementById("current-question-id").value,
    url = `https://jsonmock.hackerrank.com/api/questions/${questionId}`;

  // Fetch data from API
  await fetch(url)
    .then(handleResponse)
    .then((res) => {
      state.data = res.data;
      // Show question
      question.textContent = state.data.question;

      // Show options
      let html = "";
      let optionsArr = state.data.options;
      for (let q in optionsArr) {
        html = `<div data-answer-id="${q}">${optionsArr[q]}</div>`;
        optionsContainer.insertAdjacentHTML("beforeend", html);
      }

      for (let opt of [...optionsContainer.childNodes]) {
        opt.classList.remove("user-answer");
        opt.onclick = () => {
          // Remove user-answer class from previous selected options
          document.querySelectorAll(".user-answer").forEach((ans) => {
            ans.classList.remove("user-answer");
          });
          // Add selected class to clicked option
          opt.classList.add("user-answer");
          // Store answer id
          state.answerId = +opt.dataset.answerId;
          submitBtn.disabled = false;
        };
      }

      // Perform validation, show correct and wrong answer
      submitBtn.onclick = () => {
        let selectedAnswer = state.answerId,
          correctAnswer = state.data.answer;
        let selectedElement = document.querySelector(
            `div[data-answer-id="${selectedAnswer}"]`
          ),
          correctElement = document.querySelector(
            `div[data-answer-id="${correctAnswer}"]`
          );
        correctElement.classList.add("correct-answer");
        if (selectedAnswer !== correctAnswer) {
          selectedElement.classList.add("wrong-answer");
        }

        // Load new question
        setTimeout(runProgram, 1500);
      };
    })
    .finally(() => {
      // Hide loader
      loader.style.display = "none";
    });
}

// Load question when start button is clicked
startBtn.onclick = () => runProgram();

// Load question at script load
runProgram();
