window.addEventListener('DOMContentLoaded', function(){
    'use strict';
    //Timer
    function countTimer (deadline){
        let timerHours = document.getElementById('timer-hours'),
            timerMinutes = document.getElementById('timer-minutes'),
            timerSeconds = document.getElementById('timer-seconds');

        function getTimeRemaining(){   
            let dateStop = new Date (deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),          
                minutes = Math.floor((timeRemaining / 60) % 60),           
                hours = Math.floor(timeRemaining / 60 / 60);
            return {timeRemaining, hours, minutes, seconds};    
        }

        function updateClock() {
            let timer = getTimeRemaining();

            if(Math.floor(timer.timeRemaining) >= 0) {
                if(Math.floor(timer.hours/10) === 0) {
                    timerHours.textContent = '0' + timer.hours;
                }
                else {
                    timerHours.textContent = timer.hours;
                }

                if(Math.floor(timer.minutes/10) === 0) {
                    timerMinutes.textContent = '0' + timer.minutes;
                }
                else {
                    timerMinutes.textContent = timer.minutes;
                }

                if((Math.floor(timer.seconds/10)) === 0) {
                    timerSeconds.textContent = '0' + timer.seconds;
                }
                else {
                    timerSeconds.textContent = timer.seconds;
                }
            }

            if(Math.floor(timer.timeRemaining) <= 0) {
                //console.log('if ' + idInterval);
                clearInterval(idInterval);
            }
        }

        let idInterval = setInterval(function(){
            updateClock();
        }, 1000)
        
    }

    countTimer('09 may 2020 15:57:30');

    //меню

    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };
        btnMenu.addEventListener('click', handlerMenu);
        closeBtn.addEventListener('click', handlerMenu);
        menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));

    };
    toggleMenu();

    //popup

    const tooglePopUp = () => {
        const popup = document.querySelector('.popup'),
        popupBtn = document.querySelectorAll('.popup-btn'),
        popupClose = document.querySelector('.popup-close'),
        popupContent = document.querySelector('.popup-content');

        let beginPoint = -500;
        let setAnimation;

        const popupBegin = () => {
            
            let width = document.documentElement.clientWidth;
            setAnimation = requestAnimationFrame(popupBegin);
            beginPoint += 25; //скорость анимации
            popupContent.style.top = beginPoint + 'px';
            if(beginPoint > (width / 10)) {
                cancelAnimationFrame(setAnimation);
            }
        };

        
        popupBtn.forEach((elem) => {
            elem.addEventListener('click', () => {
                let width = document.documentElement.clientWidth;
                
                if(width > 768)
                {
                    popup.style.display = 'block';
                    popupBegin();
                }
                else {
                    popup.style.display = 'block';
                }
            });
         });

         popupClose.addEventListener('click', () => {

            beginPoint = 500;
            popup.style.display = 'none';
         });
    };
    tooglePopUp();
});