// ==UserScript==
// @name         Bot for Yandex
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @grant        none
// ==/UserScript==
let keywords = ["Как звучит флейта","Валторна","Тромбон","Кларнет","Фагот","Гобой","Саксофон"];
let randomIndex = Math.floor(Math.random()*keywords.length);
let keyword = keywords[randomIndex];
let yandexInput = document.getElementsByClassName('input__control input__input mini-suggest__input')[0]; // поисковая строка
let btnK = document.getElementsByClassName('mini-suggest__button')[0]; // кнопка Найти
let links = document.links;

// Проработка проекта без усложнений
/*
document.getElementsByClassName('input__control input__input mini-suggest__input')[0].value = `габон`; //набор поискового слова  !!! через 3 секунды после набора слова в консоле возникает ошибка!!!
document.getElementsByClassName('mini-suggest__button')[0].click(); // нажатие на кнопку Найти
document.getElementsByClassName('pager__item_kind_next')[0].click(); // нажатие на кнопку Далее, чтобы перейти на страницу 2 !!! перехода не происходит!!!
*/

if(btnK!=undefined){
    let i = 0;
    let timerId = setInterval(()=>{
        yandexInput.value += keyword[i++];
        if(i==keyword.length){
            clearInterval(timerId);
            btnK.click();
        }
    },250);
}else{
    let nextYandexPage = true;
    for(let i=0; i<links.length; i++){
        let link = links[i];
        if(link.href.indexOf("xn----7sbab5aqcbiddtdj1e1g.xn--p1ai")!=-1){
            nextYandexPage = false;
            link.click(); // Кликаем по ссылке
            break; // Прерываем цикл
        }
    }
    if(nextYandexPage) document.getElementsByClassName('pager__item_kind_next')[0].click();
}
