// ==UserScript==
// @name         Bot for Yandex
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @match        https://crushdrummers.ru/*
// @match        https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @grant        none
// ==/UserScript==
let keywords = ["Как звучит флейта","Валторна","Тромбон","Кларнет","Фагот","Гобой","Саксофон"];
let randomIndex = Math.floor(Math.random()*keywords.length);
let keyword = keywords[randomIndex];
let yandexInput = document.getElementById('text'); // поисковая строка
let btnK = document.getElementsByClassName('button mini-suggest__button')[0] // кнопка Найти
let links = document.links;

if(btnK!=undefined){
    let i = 0;
    // далее набираем по одной букве в поисковую строку:
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
    if(nextYandexPage) document.getElementsByClassName('pager__item pager__item_kind_next i-bem link_js_inited')[0].click(); //нажатие на кнопку Далее
}

// Почему-то кнопка далее на нажимается! Не могу выделить её класс:
// класс кнопки Далее
// link link_theme_none link_target_serp pager__item pager__item_kind_next i-bem link_js_inited
// класс кнопок 1,2,3,..
// link link_theme_none link_target_serp pager__item pager__item_kind_next i-bem link_js_inited
//  на мобильной версии:
// link link_theme_normal more__button i-bem
