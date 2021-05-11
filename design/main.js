//Variable declarations

let numberOnScreen = 0;
let numberOnMemory = 0;
let executeOperation = false;
let resultValue = 0;
let stringNumberbyUser = '';
let operator = '';
let screenOperator = document.getElementById('operator');
let screenResult = document.getElementById('operation-result');

//Load inicialization values
screenResult.textContent = 0;

//Clic listener for keys and assignation of temp values
document.querySelectorAll(".button-key").forEach(item => {
  item.addEventListener('click', event => {
    actionByUser(item);
    if (executeOperation) {
      switch (operator) {
        case 'plus':
          numberOnMemory = sumNumbers(numberOnMemory, numberOnScreen);
        case 'minus':
          numberOnMemory = substractNumbers(numberOnMemory, numberOnScreen);
        case 'multiply':
          numberOnMemory = multiplyNumbers(numberOnMemory, numberOnScreen);
        case 'divide':
          numberOnMemory = divideNumbers(numberOnMemory, numberOnScreen);
      }
      screenResult.textContent = numberOnMemory; 
    }
  })
});

//Functions
function actionByUser(item) {
  const buttonPressed = item.innerHTML;
  console.log(buttonPressed);

  if (isNaN(buttonPressed)) {
    executeOperation = false;
    screenOperator.textContent = buttonPressed;
    
    switch (buttonPressed) {
      case '+':
        operator = 'plus';
        break;
      case '−':
        operator = 'minus';
        break;
      case '×':
        operator = 'multiply';
        break;
      case '÷':
        operator = 'divide';
        break;
      case '=':
        executeOperation = true;
        break;
      case 'CE':
        cleanVariables();
    }

    if (numberOnMemory !== 0) {
      numberOnScreen = parseFloat(stringNumberbyUser);
    } else {
      numberOnMemory = parseFloat(stringNumberbyUser);
    }
    stringNumberbyUser = '';
  }
  else {
    screenOperator.textContent = '';
    stringNumberbyUser += buttonPressed;
    screenResult.textContent = stringNumberbyUser;
  }
}

function cleanVariables() {
  numberOnScreen = 0;
  numberOnMemory = 0;
  screenOperator.textContent = '';
  screenResult.textContent = '0';
}

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
  return number2 = 0 ? 'NaN' : number1 / number2;
}