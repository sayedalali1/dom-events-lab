/*-------------------------------- Constants --------------------------------*/
const OPERATORS = ['+', '-', '*', '/'];
const ERROR_MESSAGES = {
    //write in CAPS
  DIVIDE_BY_ZERO: 'Error: invalid',
  INVALID_INPUT: 'Invalid input'
};

/*-------------------------------- Variables --------------------------------*/
let currentInput = '';
let currentOperator = '';
let previousResult = null;

/*------------------------ Cached Element References ------------------------*/
const buttons = document.querySelectorAll('.button');
const calculator = document.querySelector('#calculator');
const displayElement = document.querySelector('.display'); // Not by class - its by ID

/*----------------------------- Event Listeners -----------------------------*/
buttons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const value = event.target.innerText;
    if (OPERATORS.includes(value)) {
      handleOperator(value);
    } else if (value === '=') {
      calculateResult();
    } else if (value === 'C') {
      clearDisplay();
    } else {
      updateDisplay(value);
    }

    // This log is for testing purposes to verify we're getting the correct value
    console.log(event.target.innerText);
  });
});

calculator.addEventListener('click', (event) => {
  // This log is for testing purposes to verify we're getting the correct value
  console.log(event.target.innerText);

  // Example
  if (event.target.classList.contains('number')) {
    // Do something with a number
  }

  // Example
  if (event.target.innerText === '*') {
    // Do something with this operator
  }
});

/*----------------- Functions -----------------*/

// operator input
function handleOperator(operator) {
  if (currentInput === '') return;

  //not === witout '!' answer will always be wrong
  if (previousResult !== null) { 
    calculateResult();
  } else {
    previousResult = parseFloat(currentInput);
  }

  currentOperator = operator;
  currentInput = '';
}

// calculate result
function calculateResult() {
  if (currentInput === '' || currentOperator === '') return;

  const currentNumber = parseFloat(currentInput);
  let result;

  switch (currentOperator) {
    case '+':
      result = previousResult + currentNumber;
      break;
    case '-':
      result = previousResult - currentNumber;
      break;
    case '*':
      result = previousResult * currentNumber;
      break;
    case '/':
        // Recheck statment, copied from other work
      if (currentNumber === 0) {
        displayError(ERROR_MESSAGES.DIVIDE_BY_ZERO); 
        return;
      }
      result = previousResult / currentNumber;
      break;
    default:
      displayError(ERROR_MESSAGES.INVALID_INPUT);
      return;
  }

  displayResult(result);
  resetCalculator();
}

// update the display
function updateDisplay(value) {
  currentInput += value;
  displayElement.innerText = currentInput;
}

// clear display
function clearDisplay() {
  currentInput = '';
  currentOperator = '';
  previousResult = null;
  displayElement.innerText = '';
}

// display result
function displayResult(result) {
  displayElement.innerText = result;
}

// display an error
function displayError(message) {
  displayElement.innerText = message;
  setTimeout(() => {
    clearDisplay();
  }, 2000);
}

// reset the calculator
function resetCalculator() {
  currentInput = '';
  currentOperator = '';
  previousResult = null;
}
