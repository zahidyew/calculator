const resetBtn = document.getElementById('reset');
const backspaceBtn = document.getElementById('backspace');
const decimalBtn = document.getElementById('decimal');
const display = document.getElementById('display');

const numberBtn = document.getElementsByClassName('btn number');
const operatorBtn = document.getElementsByClassName('btn operator');

var digit = '0';
//var pendingDigit;
var stringArray = [];

resetBtn.addEventListener('click', reset);
backspaceBtn.addEventListener('click', backspace);
decimalBtn.addEventListener('click', decimal);

// adding click event listener to each button
for (let i = 0; i < numberBtn.length; i++) {
   numberBtn[i].addEventListener('click', numbers);
}

for (let i = 0; i < operatorBtn.length; i++) {
   operatorBtn[i].addEventListener('click', operators);
}

function reset() {
   digit = '0';
   //pendingDigit = undefined;
   stringArray = [];

   display.innerText = digit;
}

function backspace() {
   let digitLength = digit.length;

   if (stringArray.includes('+') || stringArray.includes('-') || stringArray.includes('*') || stringArray.includes('/')) {
      stringArray.pop();
      display.innerText = '';//stringArray;
   }
   else {
      digit = digit.slice(0, digitLength - 1);

      if (digit === '') {
         digit = '0';
         stringArray = [];
      }
      display.innerText = digit;
   }

}

function decimal(clickBtn) {
   if (!digit.includes('.'))
      digit += '.';

   display.innerText = digit;
}

function numbers(clickBtn) {
   let numClicked = clickBtn.target.innerText;

   if (digit === '0')
      digit = '';

   digit += numClicked;
   display.innerText = digit;
}

function operators(clickBtn) {
   let operator = clickBtn.target.innerText;

   if (stringArray.includes('+') || stringArray.includes('-') || stringArray.includes('*') || stringArray.includes('/')) {
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
}