function operate (a, operator, b) {
  switch (operator) {
    case '+': return a + b;
    case '−': return a - b;
    case '×': return a * b;
    case '÷': return a / b;
  }
}

const digits = document.getElementsByClassName('digit');
const operators = document.getElementsByClassName('operator')
const display = document.getElementById('display')
let result;
let expressionArray;
let i;

document.getElementById('clear-button').addEventListener('click', () => {display.textContent = ""});
document.getElementById('equal-button').addEventListener('click', calculateResult);
document.getElementById('decimal-button').addEventListener('click', decimalCheck);
document.getElementById('backspace-button').addEventListener('click', backspace);

function backspace() {
  expressionArray = display.textContent.split('');
  if (expressionArray[expressionArray.length - 1] === ' ') {
    expressionArray = expressionArray.slice(0, -3);
  }
  else (expressionArray.pop())
  display.textContent = expressionArray.join('');
}

function decimalCheck() {
  expressionArray = display.textContent.split(' ');
  let lastElementArray = expressionArray[expressionArray.length - 1].split('');
  for (i = 0; i < lastElementArray.length; i++) {
    if (lastElementArray[i] === '.') return;
  }
  display.textContent += '.'
}

function initDigits() {
  Array.from(digits).forEach(digit => digit.addEventListener('click', function(e) {
    display.textContent += e.target.textContent;
  }))
}

function initOperators() {
  Array.from(operators).forEach(operator => operator.addEventListener('click', function(e) {
    if (display.textContent[display.textContent.length - 1] === ' ' || display.textContent === '') return
    display.textContent += ` ${e.target.textContent} `;
  }))
}

function calculateResult() {
  expressionArray = display.textContent.split(' ');
  for (i = 0; i < expressionArray.length; i++) {
    if (expressionArray[i] == '÷' || expressionArray[i] == '×') {
      if (expressionArray[i+1] === '') return display.textContent;
      result = operate(parseFloat(expressionArray[i-1]), expressionArray[i], parseFloat(expressionArray[i+1]));
      expressionArray.splice([i-1], 3, result);
      i--;
    }
  }
  for (i = 0; i < expressionArray.length; i++) {
    if (expressionArray[i] == '+' || expressionArray[i] == '−') {
      if (expressionArray[i+1] === '') return display.textContent;
      result = operate(parseFloat(expressionArray[i-1]), expressionArray[i], parseFloat(expressionArray[i+1]));
      expressionArray.splice([i-1], 3, result);
      i--;
    }
  }
  display.textContent = expressionArray;
}

initDigits();
initOperators();