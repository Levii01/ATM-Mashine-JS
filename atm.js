var card = {
  pin: 5,
  authentication: false,
  endabled: true,
};
var account = {
  name: 'Miłosz',
  surname: 'Sędziak',
  balance: 500,
  myCard: card,
};
var atm = {
  money: 4000,
  access: false,
  password: 's',
  secondPassword: 'secret',
};
var errors = {
  cardDisabled: 'Card is disabled. Contact with operator to activate card.',
  blockCard: 'Incorrect Pin. Card has been disabled.',
  wrongOperatorPassword: 'Wrong operator password',
  atmNoMoneyOperator: "Can't withdraw, not enough money in ATM",
  noMoneyAccount: "You don't have enough money in your account",
  atmNoMoneyAccount: "We must apologise you because we don't have enough money in this ATM." +
  '<br>You need to find another ATM or visit our bank.',
};

function starter() {
  timer();
  firstChoice();
}

function firstChoice() {
  document.getElementById('box1').innerHTML = '<h2>Select option:</h2>'
  + '<button class="button" onclick="insertPin()"><span>Insert card </span></button> '
  + '<br/><button class="button" onclick="pinOperator()"><span>Log in as operator </span></button>';
  document.getElementById('box2').innerHTML = '';
}


// #
// operator function!!!
// #

function pinOperator() {
  document.getElementById('box2').innerHTML = '<h2>Insert password:</h2> '
  + '<input type="text" id="passwordPlace" /><button class="button" onclick="testPasswordOperator()"><span>OK</span></button>';
}

function testPasswordOperator() {
  insertedPassword = document.getElementById('passwordPlace').value;
  // document.getElementById('box2').innerHTML = insertedPassword == atm.password;
  if (insertedPassword == atm.password) {
    operatorLogIn();
    operatorOption();
    document.getElementById('box2').innerHTML = '<h2>Correct password!.</h2>';
  } else {
    firstChoice();
    document.getElementById('errors').innerHTML = errors.wrongOperatorPassword;
  }
}

function operatorOption() {
  document.getElementById('box1').innerHTML =
  '<h2>ATM operator options:</h2> <button class="button" onclick="atmChargeMoney()"><span>Add money to ATM</span></button>'
   + '<br/><button class="button" onclick="atmWithdrawMoney()"><span>Withdraw money from ATM</span></button>'
   + '<br/><button class="button" onclick="showAtmBalance()"><span>Show ATM balance</span></button>'
   + '<br/><button class="button" onclick="endabledCard()"><span>Activate user card</span></button>'
   + '<br/><button class="button" onclick="operatorLogOut()"><span>Log out</span></button>';
}

function atmWithdrawMoney() {
  document.getElementById('box2').innerHTML = '<h2>Withdraw ATM:</h2><br>'
  + 'How much money you want to withdraw?<br>'
  + '<input type="number" id="removeMoneyAtm" value=0 /><button class="button" onclick="withdrawAtm()"><span>OK</span></button>';
}

function withdrawAtm() {
  insertedMoneyAtm2 = parseInt(document.getElementById('removeMoneyAtm').value);
  if (atm.money >= insertedMoneyAtm2) {
    atm.money -= insertedMoneyAtm2;
    document.getElementById('box2').innerHTML = '<h2>Withdraw ATM:</h2><br>'
    + 'Amount: ' + insertedMoneyAtm2 + '$<br/> New balance: ' + atm.money + '$';
  }else {
    document.getElementById('box2').innerHTML = '<h2>Withdraw fail:</h2><br>'
    + 'Not enough money in ATM';
    document.getElementById('errors').innerHTML = errors.atmNoMoneyOperator;

  }
}

function atmChargeMoney() {
  document.getElementById('box2').innerHTML = '<h2>Add money to ATM:</h2><br>'
  + 'How much money you want to charge?<br>'
  + '<input type="number" id="addMoneyAtm" value=0 /><button class="button" onclick="chargeAtm()"><span>OK</span></button>';
}

function chargeAtm() {
  insertedMoneyAtm = parseInt(document.getElementById('addMoneyAtm').value);
  atm.money += insertedMoneyAtm;
  document.getElementById('box2').innerHTML = '<h2>Charged ATM:</h2><br>'
  + 'Amount: ' + insertedMoneyAtm + '$<br/> New balance: ' + atm.money + '$';
}

function showAtmBalance() {
  document.getElementById('box2').innerHTML = '<h2>Current ATM balance:</h2><br><h3>' + atm.money + '$</h3>';
}

// #
// account function!!!!!!
// #
function insertPin() {
  document.getElementById('box2').innerHTML = '<h2>Insert pin card:</h2> '
  + '<input type="number" id="pin" /><button class="button" onclick="testPinUser()"><span>OK</span></button>';
}

function testPinUser() {
  insertedPin = parseInt(document.getElementById('pin').value);
  if (card.endabled) {
    pinAuthentication();
  }else document.getElementById('errors').innerHTML = errors.cardDisabled;
}

function pinAuthentication() {
  if (insertedPin == card.pin && card.endabled) {
    logIn();
    userOption();
    document.getElementById('box2').innerHTML = '<h2>Correct pin number.</h2>';
  } else {
    firstChoice();
    disabledCard();
    document.getElementById('errors').innerHTML = errors.blockCard;
  }
}

function userOption() {
  document.getElementById('box1').innerHTML =
  '<h2>Select option:</h2> <button class="button" onclick="userChargeMoney()"><span>Fund account</span></button>'
   + '<br/><button class="button" onclick="userWithdrawMoney()"><span>Withdraw money</span></button>'
   + '<br/><button class="button" onclick="showBalance()"><span>Show balance</span></button>'
   + '<br/><button class="button" onclick="owner()"><span>Owner information</span></button>'
   + '<br/><button class="button" onclick="logOut()"><span>Log out</span></button>';
}

function userWithdrawMoney() {
  document.getElementById('box2').innerHTML = '<h2>Withdraw money:</h2><br>'
  + 'How much money you want to withdraw?<br>'
  + '<input type="number" id="removeMoneyAccount" value=0 /><button class="button" onclick="checkWithdrawAccount()"><span>OK</span></button>';
}

// document.getElementById(valueStr).value == 0;

function checkWithdrawAccount() {
  insertedMoneyAcc2 = parseInt(document.getElementById('removeMoneyAccount').value);
  if (account.balance >= insertedMoneyAcc2) {
    makeWithdrawAccount();
  }else {
    document.getElementById('box2').innerHTML = '<h2>Withdraw account:</h2><br>'
    + 'Somethings gone wrong..';
    document.getElementById('errors').innerHTML = errors.noMoneyAccount;
  }
}

function makeWithdrawAccount() {
  if (atm.money >= insertedMoneyAcc2) {
    account.balance -= insertedMoneyAcc2;
    atm.money -= insertedMoneyAcc2;
    document.getElementById('box2').innerHTML = '<h2>Withdraw account:</h2><br>'
    + 'Amount: ' + insertedMoneyAcc2 + '$<br/> New balance: ' + account.balance + '$';
  }else {
    document.getElementById('box2').innerHTML = '<h2>Withdraw account:</h2><br>'
    + 'Somethings gone wrong..';
    document.getElementById('errors').innerHTML = errors.atmNoMoneyAccount;
  }
}

function userChargeMoney() {
  document.getElementById('box2').innerHTML = '<h2>Charged account:</h2><br>'
  + 'How much money you want to charge?<br>'
  + '<input type="number" id="addMoneyAccount" value=0 /><button class="button" onclick="chargeAccount()"><span>OK</span></button>';
}

function chargeAccount() {
  insertedMoneyAcc = parseInt(document.getElementById('addMoneyAccount').value);
  account.balance += insertedMoneyAcc;
  atm.money += insertedMoneyAcc;
  document.getElementById('box2').innerHTML = '<h2>Charged account:</h2><br>'
  + 'Amount: ' + insertedMoneyAcc + '$<br/> New balance: ' + account.balance + '$';
}

function owner() {
  document.getElementById('box2').innerHTML = '<h2>Owner information:</h2><br>'
  + 'Name: ' + account.name + '<br>Surname: ' + account.surname  + '<br>Active card: ' + card.endabled;
}

function showBalance() {
  document.getElementById('box2').innerHTML = '<h2>Current balance:</h2><br><h3>' + account.balance + '$</h3>';
}

// selectors :)
function logIn() {
  card.authentication = true;
}

function logOut() {
  card.authentication = false;
  firstChoice();
}

function endabledCard() {
  card.endabled = true;
  document.getElementById('box2').innerHTML = '<h2>Status card:</2>'
  + '<h3>Card has been activated.</h3>';
}

function disabledCard() {
  card.endabled = false;
}

function operatorLogIn() {
  atm.access = true;
}

function operatorLogOut() {
  atm.access = false;
  firstChoice();
}

function timer() {
  var today = new Date();

  var day = today.getDate();
  var month = today.getMonth() + 1;
  var year = today.getFullYear();

  var hour = today.getHours();
  if (hour < 10) hour = '0' + hour;
  var minute = today.getMinutes();
  if (minute < 10) minute = '0' + minute;
  var second = today.getSeconds();
  if (second < 10) second = '0' + second;

  document.getElementById('clock').innerHTML = day + '.' + month + '.' + year +
      ' | ' + hour + ':' + minute + ':' + second;

  document.getElementById('status').innerHTML = 'Logged in: ' + card.authentication
  + '<br/>Active card: ' + card.endabled + '<br/>Operator access: ' + atm.access + atm.money;
  setTimeout('timer()', 1000);
};
