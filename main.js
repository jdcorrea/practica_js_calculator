//Variable declarations
let numberOnMemory = 0;
let numberOnScreen = 0;
let stringNumberbyUser = '';
let numberOnMemoryActive = false;
let numberOnScreenActive = false;
let previousKeyIsOperator = false;
let onErrorExecution = false;
let operator = '';
let operatorOnMemory = '';
let screenOperator = document.getElementById('operator');
let screenResult = document.getElementById('operation-result');

// screenOperator.textContent = '';

//Functions
function checkOperation(operation) {
  validateOnErrorExecution();
  screenOperator.textContent = operation;
  resultOnMemoryOrScreen();

  switch (operation) {
    case '+':
      operator = 'plus';
      break;
    case '-':
      operator = 'minus';
      break;
    case '*':
      operator = 'multiply';
      break;
    case '/':
      operator = 'divide';
      break;
  }

  if (numberOnScreenActive) {
    executeOperation(operatorOnMemory);
  }
  operatorOnMemory = operator;
  stringNumberbyUser = '';
}

function cleanScreenInputs() {
  numberOnScreen = 0;
  numberOnMemory = 0;
  stringNumberbyUser = '';
  screenOperator.textContent = '';
  screenResult.textContent = '0';
  numberOnScreenActive = false;
  numberOnMemoryActive = false;
}

function equalOperation() {
  resultOnMemoryOrScreen();
  executeOperation(operatorOnMemory);
}

function executeOperation(operation, numberOnScreenActived) {
  switch (operation) {
    case 'plus':
      numberOnMemory = sumNumbers(numberOnMemory, numberOnScreen);
      break;
    case 'minus':
      numberOnMemory = substractNumbers(numberOnMemory, numberOnScreen);
      break;
    case 'multiply':
      numberOnMemory = multiplyNumbers(numberOnMemory, numberOnScreen);
      break;
    case 'divide':
      numberOnMemory = divideNumbers(numberOnMemory, numberOnScreen);
      break;
  }

  if (isNaN(numberOnMemory)) {
    screenOperator.textContent = 'Math.Error';
    screenResult.textContent = NaN;
    onErrorExecution = true;
  } else {
    screenResult.textContent = numberOnMemory.toFixed(2);
  }

  numberOnScreenActive = false;
}

function numberByUser(buttonPressedByUser) {
  previousKeyIsOperator = false;
  validateOnErrorExecution();
  
  if (validateMaxNumberByUser()) {
    printNumberOnScreen(buttonPressedByUser);
  } else {
    const MAX_NUMBER_REACHED = 'Max number reached';
    screenOperator.textContent = MAX_NUMBER_REACHED;
  }
  
  screenResult.scrollLeft = screenResult.scrollWidth;
}


function printNumberOnScreen(numberPressed) {
  if (stringNumberbyUser == '0') {
    stringNumberbyUser = numberPressed;
  } else {
    stringNumberbyUser += '' + numberPressed;
  }
  screenResult.textContent = stringNumberbyUser;
}

function resultOnMemoryOrScreen() {
  if (stringNumberbyUser != '') {
    if (numberOnMemoryActive) {
      numberOnScreen = parseFloat(stringNumberbyUser);
      numberOnScreenActive = true;
    } else {
      numberOnMemory = parseFloat(stringNumberbyUser);
      numberOnScreenActive = false;
      numberOnMemoryActive = true;
    }
  }
  stringNumberbyUser = '';
}

function validateMaxNumberByUser() {
  const MAX_NUMBER_ALLOWED_BY_USER = 24;
  
  if (stringNumberbyUser.length <= MAX_NUMBER_ALLOWED_BY_USER) {
    return true;
  } else {
    return false;
  }
}

function validateOnErrorExecution() {
  if (onErrorExecution) {
    cleanScreenInputs();
    onErrorExecution = false;
  }
}
//Math functions available for calculator
function sumNumbers(number1, number2) {
  return number1 + number2;
}

function substractNumbers(number1, number2) {
  return number1 - number2;
}

function multiplyNumbers(number1, number2) {
  return number1 * number2;
}

function divideNumbers(number1, number2) {
  if (number2 === 0) {
    return 'NaN';
  }
  return number1 / number2;
}