// do not modify

const generateQuestionId = () => {
  const id = randomIntInRange(0, 6);
  document.getElementById('current-question-id').value = id.toString();
};

const randomIntInRange = (min, max, notIn) => {
  const value = Math.floor(Math.random() * (max - min + 1) + min);
  if (notIn && notIn.includes(value)) {
    return randomIntInRange(min, max, notIn);
  } else {
    return value;
  }
};

generateQuestionId();