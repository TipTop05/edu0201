let money = document.getElementById("money");
let display = document.getElementById("display");
let bill_acc = document.getElementById("bill_acc");
let displayInfo = document.getElementById("displayInfo");
let displayBalance = document.getElementById("displayBalance");
let progressBar = document.getElementsByClassName("progress-bar")[0];
let change_box = document.getElementById("change_box");
let lock = document.getElementById("lock");
let progress = 0;
let cup_coffee = document.getElementById("cup_coffee");

function getCoffee(coffeName,price){
  cup_coffee.hidden = true;     // чашка исчезает с экрана (при приготовлении нового кофе)
  let audio = new Audio("audio/pressButton.mp3");   // звук нажатия кнопки при выборе кофе
  audio.play();
  if(+money.value>=price){
    money.value = +money.value - price;
    displayBalance.innerText = money.value;
    let audio = new Audio("audio/getCoffee.mp3");   // звук приготовления кофе = 6 сек
    audio.play();
    let timerId = setInterval(()=>{
      lock.hidden = false;
      if(progress>110){
        clearInterval(timerId);
        progressBar.hidden = true;
        progressBar.style.width = 0+'%';
        displayInfo.innerHTML = `Кофе ${coffeName} готов`;
        cup_coffee.hidden = false;     // чашка кофе показывается на экране
        progress = 0;
        lock.hidden = true;
        return;
      }
      else if(progress<40) displayInfo.innerHTML = `<i class="fas fa-hourglass-start"></i> Приготовление...`;
      else if(progress<80) displayInfo.innerHTML = `<i class="fas fa-hourglass-half"></i> Приготовление...`;
      else displayInfo.innerHTML = `<i class="fas fa-hourglass-end"></i> Приготовление...`;
      progressBar.hidden = false;
      progressBar.style.width = ++progress+'%';
    },55);
  }else{
    displayInfo.innerHTML = `<i class="far fa-frown"></i> Недостаточно средств`;
  }
}

/* Код перетаскивания купюр по экрану */
let banknotes = document.querySelectorAll("[src$='rub.jpg']"); // Коллекция (Как бы массив)
let zIndex = 1;
for(let i=0; i<banknotes.length; i++){ // Перебираем коллекцию
  let banknote = banknotes[i]; // Записываем очередной элемент коллекции в переменную
  banknote.onmousedown = function(e){
    this.ondragstart = function(){return false;}
    this.style.position = 'absolute';
    this.style.zIndex = ++zIndex;
    this.style.transform = 'rotate(90deg)';
    moveAt(e);
    function moveAt(event){
      banknote.style.top = (event.clientY-banknote.offsetHeight/2)+'px';
      banknote.style.left = (event.clientX-banknote.offsetWidth/2)+'px';
    }
    document.addEventListener('mousemove',moveAt);
    this.onmouseup = function(){
      document.removeEventListener('mousemove',moveAt);
      let bill_acc_top = bill_acc.getBoundingClientRect().top; // Верх купюроприёмника
      let bill_acc_bottom = bill_acc.getBoundingClientRect().bottom - (bill_acc.getBoundingClientRect().height*2/3);
      let bill_acc_left = bill_acc.getBoundingClientRect().left;
      let bill_acc_right = bill_acc.getBoundingClientRect().right;
      let banknote_top = this.getBoundingClientRect().top; // Верх купюры
      let banknote_left = this.getBoundingClientRect().left;
      let banknote_right = this.getBoundingClientRect().right;
      if(bill_acc_top<banknote_top && bill_acc_bottom>banknote_top && bill_acc_left<banknote_left && bill_acc_right>banknote_right){
        money.value = (+money.value)+(+this.dataset.value);
        displayBalance.innerText = money.value;
        let audio = new Audio("audio/getBanknote.mp3"); // звук приема банкноты = 3сек
        audio.play();
        banknote.hidden = true; // исчезновение банкноты
      }
    }
  }
}
/* Конец кода перетаскивания купюр по экрану" */


/* Выдаем на экран информацию о статусе кофе и считаем сдачу */       
/* Решение через рекурсию (ниже закоментирован пример решения через цикл) */
function getChange(num){      
  let change_box_h = change_box.getBoundingClientRect().height-60-4*2;
  let change_box_w = change_box.getBoundingClientRect().width-60-4*2;
  let top = Math.random()*change_box_h;
  let left = Math.random()*change_box_w;
  let change = 0;
  if (money.value>0) {
    let audio = new Audio("audio/getChange.mp3"); // звук падающих монет
    audio.play();
  } 
  if(num>=10) change = 10;
  else if(num>=5) change = 5;
  else if(num>=2) change = 2;
  else if(num>=1) change = 1;
  if(change>0){
    let img = document.createElement('img');
    img.src = `img/${change}rub.png`;
    img.style.top = top+'px';
    img.style.left= left+'px';
    img.onclick = function(){this.hidden=true;}
    change_box.append(img); //добавляет картинку монетки
    displayBalance.innerText = money.value = 0;  // на экран дисплея выводим 0
    getChange(num-change);
  }

}

/* Решение через цикл */
/*
function getChange2(num){
  let change = 0;
  for(let i=0; i<num; i=i+change){
    if ((num-i)>=10) change = 10;
    else if((num-i)>=5) change =5;
    else if((num-i)>=2) change =2;
    else if((num-i)>=1) change = 1;
  
  // console.log(`i= ${i}`);
  // console.log(`сдача = ${change}`);
  console.log(change);
  }
}
*/
/* Конец кода Выдаем на экран информацию о статусе кофе и считаем сдачу */ 


/* При нажатии на чашку она исчезает */ 
function CupHidden() {
  cup_coffee.hidden = true;  
}
/* Конец кода При нажатии на чашку она исчезает */
