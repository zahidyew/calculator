const toggle = document.getElementById('toggle');
const discountDiv = document.getElementById('discountDiv');
const actualPriceElem = document.getElementById('priceBefore');
const discountElem = document.getElementById('discount');
const afterDiscountElem = document.getElementById('priceAfter');
const savedElem = document.getElementById('saved');
const calculate = document.getElementById('calculate');

discountDiv.style.display = 'none';
toggle.addEventListener('click', getToggled);
calculate.addEventListener('click', calculateDiscount);

function getToggled() {
   const calculator = document.getElementById('theCalcDiv');
   if (toggle.checked) {
      calculator.style.display = 'none';
      discountDiv.style.display = 'block';
   }
   else {
      calculator.style.display = 'block';
      discountDiv.style.display = 'none';
   }
}

function calculateDiscount() {
   let price = actualPriceElem.value;
   let discount = discountElem.value;

   if (price != "" && discount != "") {
      let afterDiscount = price * (1 - discount / 100);
      let saved = price - afterDiscount;

      afterDiscountElem.value = "RM" + afterDiscount.toFixed(2);
      savedElem.value = "You saved RM" + saved.toFixed(2);
   }
}

// binding ENTER to calculateDiscount func
document.onkeydown = function (key) {
   key = key || window.event;
   switch (key.which || key.keyCode) {
      case 13: //13 is ASCII for Enter
         calculateDiscount();
         break;
   }
}