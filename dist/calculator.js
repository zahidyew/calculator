const resetBtn = document.getElementById('reset');
const backspaceBtn = document.getElementById('backspace');
const decimalBtn = document.getElementById('decimal');
const display = document.getElementById('display');

const numberBtn = document.getElementsByClassName('btn number');
const operatorBtn = document.getElementsByClassName('btn operator');
const symbols = ['+', '-', '*', '/'];
const normalFontSize = 42 + 'px';

var digit = '0';
//var pendingDigit;
var stringArray = [];

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

   display.style.fontSize = normalFontSize;

   display.innerText = digit;
});

backspaceBtn.addEventListener('click', () => {
   let digitLength = digit.length;

   if (isOperatorInArray() && isOperatorOnDisplay()) {
      // delete the operator from the array first, then show the numbers back
      stringArray.pop();
      digit = '' + stringArray;
      display.innerText = stringArray;
      stringArray = []; // empty out the array to avoid error of duplicates
   }
   else {
      digit = digit.slice(0, digitLength - 1); // slice the most recent number

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
   display.style.fontSize = normalFontSize;

   if (digit === '0')
      digit = '';

   digit += numClicked;
   display.innerText = digit;
}

function isOperatorInArray() {
   return stringArray.length != 0 && symbols.some(arr => stringArray[stringArray.length - 1].includes(arr));
}

function isOperatorOnDisplay() {
   //return symbols.some(arr => display.innerText.includes(arr));

   if (symbols.some(symbl => display.innerText.includes(symbl))) {
      if (display.innerText.includes('-') && !isOperatorInArray())
         return false;
      else 
         return true;
   }
   else 
      return false;
}

function pushValue(operator) {
   stringArray.push(display.innerText);
   stringArray.push(operator);
   digit = '';
   display.innerText = operator; //stringArray.join(" ");
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
   
            checkForOverflow(totals);
            display.innerText = totals;
         }
         break;
      default:
         break;
   }
   console.log(stringArray);
}

function checkForOverflow(totals) {
   if(totals.toString().length > 8) {
      display.style.fontSize = 22 + 'px';
   }
   //console.log(totals.toString().length);
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