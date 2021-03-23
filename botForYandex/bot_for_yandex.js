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

// Функция getCookie(name) считывает куки и возвращает куки с указанным name
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

let sites = {
    "xn----7sbab5aqcbiddtdj1e1g.xn--p1ai":["Как звучит флейта","Валторна","Тромбон","Кларнет","Фагот","Гобой","Саксофон"],
    "crushdrummers.ru":["Барабанное шоу","Заказать шоу барабанщиков","Барабанное шоу в Москве"]
}
// Object.keys(sites) - узнать количество ключей объекта sites.
let site = Object.keys(sites)[Math.floor(Math.random()*Object.keys(sites).length)]; // выбираем один из сайтов объекта sites
let keywords = sites[site];
let randomIndex = Math.floor(Math.random()*keywords.length);
let keyword = keywords[randomIndex];
let yandexInput = document.getElementById('text'); // поисковая строка
let btnK = document.getElementsByClassName('button mini-suggest__button')[0] // кнопка Найти
let links = document.links; // Собираем все ссылки на странице в переменную links

if(btnK!=undefined){ // Главная страница поисковика
    let i = 0;
    document.cookie = "site="+site; // записываем название выбранного случайно сайта (из наших сайтов) в куки
    // далее набираем по одной букве в поисковую строку:
    let timerId = setInterval(()=>{
        yandexInput.value += keyword[i++];
        if(i==keyword.length){
            clearInterval(timerId);
            btnK.click();
        }
    },250);
}else if(location.hostname == "yandex.ru"){ // Страница выдачи поисковых результатов (эта часть кода запускается, если бот находимся на сайте yandex.ru)
    site = getCookie("site"); // извлекаем куки по ключу site
    let nextYandexPage = true;
    let currentYandexPage = document.getElementsByClassName('pager__item pager__item_current_yes pager__item_kind_page')[0].innerText; //записываем в currentYandexPage номер текущей страницы поиска Yandex
    for(let i=0; i<links.length; i++){
        let link = links[i];
        if(link.href.indexOf(site)!=-1){ //код для исключения ненужных ссылок (поиск ссылки, содержащей назание сайта)
            nextYandexPage = false;
            link.target="_self"; // по умолчанию в ссылке стоит target: "_blank" (в новом окне открывается), меняем его на target: "_self" (в том же окне открытие)
            link.click(); // Бот кликает по ссылке заданного сайта
            break; // Прерываем цикл
        }
    }
    if (nextYandexPage && currentYandexPage<11) setTimeout(()=>{document.getElementsByClassName('pager__item_kind_next')[0].click()},1500); //нажатие на кнопку Далее (до 10 страницы); клик с задержкой 1,5сек
    else if(currentYandexPage == 11) location.href = "https://yandex.ru/"; //если следует переход на 11 страницу поиска, то переход идет на https://yandex.ru/

// Бот гуляет по сайту выбирая случайным образом страницы, затем переходит на главную страницу поисковика
} else { // Бот находится на найденом сайте
    setInterval(()=>{
        if(Math.random()>=0.8) location.href = "https://yandex.ru/"; // с вероятностью 20% будет возврат на yandex, с вероятность 80% будет ходить по сайту
        let link = links[Math.floor(Math.random()*links.length)]; // Бот выбирает случайную ссылку на сайте
        if(link.href.indexOf(location.hostname)!=-1){ //код для исключения ненужных ссылок (чтобы бот не уходил с сайта на другие сайты)
           link.click();} // Бот кликает по выбранной ссылке
        },3000);
}

