//Variable declarations
const MINIMUM_FONTSIZE = 10;
let numberOnScreen = 0;
let numberOnMemory = 0;
let prevKeyisNan = true;
let equalKeyActive = false;
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
    const buttonPressed = item.innerHTML;
    actionByUser(buttonPressed);
    if (equalKeyActive && prevKeyisNan) {
      switch (operator) {
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
        numberOnMemory = 0;
      } else {
        screenResult.textContent = numberOnMemory.toFixed(2);
        changeFontBasedOnLength(screenResult.textContent.length);
      }
    }
  })
});

window.addEventListener('resize', function(event) {
  screenResult.style.fontSize = '4rem';
  changeFontBasedOnLength(screenResult.textContent.length)});

//Functions
function actionByUser(buttonPressed) {

  if (isNaN(buttonPressed)) {
    prevKeyisNan = true;
    equalKeyActive = false;
    checkOperation(buttonPressed);
  }
  else {
    prevKeyisNan = false;
    equalKeyActive = false;
    screenOperator.textContent = '';
    if (stringNumberbyUser.length <= 24) {
      stringNumberbyUser += buttonPressed;
      screenResult.textContent = stringNumberbyUser;
      changeFontBasedOnLength(screenResult.textContent.length);
    } else {
      screenOperator.textContent = 'Max number reached';
    }
  }
}

function checkOperation(buttonPressed) {
  screenOperator.textContent = buttonPressed;

  switch (buttonPressed) {
    case '+':
      operator = 'plus';
      break;
    case '−':
      operator = 'minus';
      break;
    case '×':
      //debugger;
      operator = 'multiply';
      break;
    case '÷':
      operator = 'divide';
      break;
    case '=':
      equalKeyActive = true;
      break;
    case 'CE':
      cleanVariables();
  }
  if (stringNumberbyUser != '') {
    if (numberOnMemory !== 0) {
      numberOnScreen = parseFloat(stringNumberbyUser);
    } else {
      numberOnMemory = parseFloat(stringNumberbyUser);
    }
  }
  stringNumberbyUser = '';
}

function cleanVariables() {
  numberOnScreen = 0;
  numberOnMemory = 0;
  stringNumberbyUser = 0;
  screenOperator.textContent = '';
  screenResult.textContent = '0';
  screenResult.style.fontSize = '4rem';
}

function changeFontBasedOnLength(lengthToCalculate) {
  let screenWidthToUse = screenResult.clientWidth;
  let fontSizeActive = 0;
  let screenResultUsed = 0;

  fontSizeActive =parseFloat(
      window.getComputedStyle(
      screenResult, null).getPropertyValue('font-size'));
  
  if (fontSizeActive <= MINIMUM_FONTSIZE ) {
    return;
  }

  console.log(fontSizeActive);
  screenResultUsed = (lengthToCalculate * fontSizeActive);

  if (screenResultUsed >= screenWidthToUse) {
    let fontSizeToUse = (fontSizeActive - 0.01) > MINIMUM_FONTSIZE
                      ? (fontSizeActive/10) - 0.01
                      : MINIMUM_FONTSIZE / 10;
    screenResult.style.fontSize = fontSizeToUse + 'rem';
    changeFontBasedOnLength(lengthToCalculate);
  }
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
  return number2 == 0 ? 'NaN' : number1 / number2;
}