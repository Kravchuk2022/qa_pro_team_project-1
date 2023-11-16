"use strict";
/**
 Перед вами список полів. Це можна сказати пряме посилання на кожне із полів форми.
 Якщо ви додасте до змінної .value (fineNumber.value) то отримаєте значення
 яке зберігається в цьому полі.
 */
let fineNumber = document.getElementById("fineNumber");
let passport = document.getElementById("passport");
let creditCardNumber = document.getElementById("creditCardNumber");
let cvv = document.getElementById("cvv");
let amount = document.getElementById("amount");
let buttonSubmit = document.getElementById("payFine");

//Ця зміна містить всі дані які в нас зберігаються у файлі data
let DB = data.finesData;


/**
 Вам необхідно реалізувати наступний функціонал.
 Зробити валідацію до всіх полів
 1. Номер та сума повинні бути однакові як в існуючого штрафу - якщо ні видавати
 alert "Номер не співпадає" або "Сума не співпадає"

 2. Паспортні дані у форматі - перші дві літери укр алфавіту, та 6 цифр.
 Якщо не співпадає то видавати alert "Не вірний паспортний номер"

 3. Номер кредитної карки 16 цифр -
 якщо не співпадає то видавати alert "Не вірна кредитна картка"

 4. cvv 3 цифри - якщо не співпадає то видавати alert "Не вірний cvv".

 Якщо валідація проходить успішно, то виконати оплату,
 тобто вам потрібно видалити обєкт з DB
 */



buttonSubmit.addEventListener('click', payFine);

function payFine() {

    if (!checkNumberAndSum(fineNumber.value, amount.value)){
        alert("Невірний номер або сума");
    }
    else if(!checkPassportData(passport.value))
        alert("Невірні паспортні дані");
    else if (!checkCreditCard(creditCardNumber.value))
        alert("Невірна кредитна карта");
    else if (!checkCVV(cvv.value))
        alert("Невірний cvv");
    else {
        deleteFine(fineNumber.value)
        alert("Оплата пройшла успішно");
    }

}

function checkNumberAndSum(number, amount) {
   return  data.finesData.some(element => {
        return element.номер === number
            && element.сума === Number.parseInt(amount);
    })
}


function deleteFine(number){
    data.finesData = data.finesData.filter(element =>
         element.номер !== number);
}

function checkPassportData(passportNumber){
    return /^[А-Яа-яЄєІіЇїҐґ]{2}[0-9]{6}$/.test(passportNumber);
}

function checkCreditCard(cardNumber){
    return /^[0-9]{16}$/.test(cardNumber);
}

function checkCVV(cvvNumber){
    return /^[0-9]{3}$/.test(cvvNumber);
}


