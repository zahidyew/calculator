const resetBtn = document.getElementById('reset');
const backspaceBtn = document.getElementById('backspace');
const decimalBtn = document.getElementById('decimal');
const display = document.getElementById('display');

const numberBtn = document.getElementsByClassName('btn number');
const operatorBtn = document.getElementsByClassName('btn operator');

var digit = '0';
//var pendingDigit;
var stringArray = [];
const symbols = ['+', '-', '*', '/'];

// adding click event listener to each button
for (let i = 0; i < numberBtn.length; i++) {
   numberBtn[i].addEventListener('click', numbers);
}

for (let i = 0; i < operatorBtn.length; i++) {
   operatorBtn[i].addEventListener('click', operators);
}

resetBtn.addEventListener('click', () => {
   digit = '0';
   //pendingDigit = undefined;
   stringArray = [];

   display.innerText = digit;
});

backspaceBtn.addEventListener('click', () => {
   let digitLength = digit.length;

   if (isOperatorInArray()) {
      stringArray.pop();
      digit = '' + stringArray;
      display.innerText = stringArray;//'';//stringArray;
      stringArray = [];
   }
   else {
      digit = digit.slice(0, digitLength - 1);

      if (digit === '') {
         digit = '0';
         stringArray = [];
      }
      display.innerText = digit;
   }
});

decimalBtn.addEventListener('click', () => {
   if (!digit.includes('.'))
      digit += '.';

   display.innerText = digit;
});

function numbers(clickBtn) {
   let numClicked = clickBtn.target.innerText;

   if (digit === '0')
      digit = '';

   digit += numClicked;
   display.innerText = digit;
}

function isOperatorInArray() {
   return stringArray.length != 0 && symbols.some(arr => stringArray[stringArray.length - 1].includes(arr));
}

function isOperatorOnDisplay() {
   return symbols.some(arr => display.innerText.includes(arr));
}

function pushValue(operator) {
   stringArray.push(display.innerText);
   stringArray.push(operator);
   digit = '';
   display.innerText = operator;
}

function popFirstThenPush(operator) {
   stringArray.pop();
   stringArray.push(operator);
   digit = '';
   display.innerText = operator;
}

function operators(clickBtn) {
   let operator = clickBtn.target.innerText;
   //console.log(symbols.some(arr => stringArray.includes(arr)));

   switch (operator) {
      case '+':
         //pendingDigit = display.innerText;
         if (isOperatorOnDisplay()) {
            popFirstThenPush('+');
         }
         else {
            pushValue('+');
         }
         break;
      case '−':
         if (isOperatorOnDisplay()) {
            popFirstThenPush('-');
         }
         else {
            pushValue('-');
         }
         break;
      case '×':
         if (isOperatorOnDisplay()) {
            popFirstThenPush('*');
         }
         else {
            pushValue('*');
         }
         break;
      case '÷':
         if (isOperatorOnDisplay()) {
            popFirstThenPush('/');
         }
         else {
            pushValue('/');
         }
         break;
      case '=':
         //pendingDigit = display.innerText;
         if (isOperatorOnDisplay()) {
         }
         else {
            stringArray.push(display.innerText);
            let totals = eval(stringArray.join(' '));
            digit = '0';
            stringArray = [];
            display.innerText = totals;
         }
         break;
      default:
         break;
   }
   console.log(stringArray)
}

/* function operators(clickBtn) {
   let operator = clickBtn.target.innerText;
   let symbols = ['+', '-', '*', '/'];

   //console.log(symbols.some(arr => stringArray.includes(arr)));

   if (symbols.some(arr => stringArray.includes(arr))) {
      switch (operator) {
         case '=':
            //pendingDigit = display.innerText;
            stringArray.push(display.innerText);
            let totals = eval(stringArray.join(' '));
            digit = '0';
            stringArray = [];
            display.innerText = totals;
            break;

         default:
            break;
      }
   }
   else {
      switch (operator) {
         case '+':
            //pendingDigit = display.innerText;
            stringArray.push(display.innerText);
            stringArray.push('+');
            digit = '0';
            display.innerText = operator;
            break;

         case '−':
            stringArray.push(display.innerText);
            stringArray.push('-');
            digit = '0';
            display.innerText = operator;
            break;

         case '×':
            stringArray.push(display.innerText);
            stringArray.push('*');
            digit = '0';
            display.innerText = operator;
            break;

         case '÷':
            stringArray.push(display.innerText);
            stringArray.push('/');
            digit = '0';
            display.innerText = operator;
            break;

         case '=':
            break;

         default:
            break;
      }
   }
} */