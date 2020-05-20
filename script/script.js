window.addEventListener('DOMContentLoaded', () => {
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

        menu.addEventListener('click', (event) => {
            if(event.target.tagName === 'A'){
                handlerMenu();
            } else {
                return
            }
        });

        btnMenu.addEventListener('click', handlerMenu);
        //closeBtn.addEventListener('click', handlerMenu);
        //menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));

    };
    toggleMenu();

    //popup

    const tooglePopUp = () => {
        const popup = document.querySelector('.popup'),
        popupBtn = document.querySelectorAll('.popup-btn'),
        //popupClose = document.querySelector('.popup-close'),
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

         /*popupClose.addEventListener('click', () => {

            beginPoint = 500;
            popup.style.display = 'none';
         });*/

         popup.addEventListener('click', (event) => {
             let target = event.target;
            if(target.classList.contains('popup-close')){
                popup.style.display = 'none'; 
            }
            else{
                target = target.closest('.popup-content');

                if(!target){
                    popup.style.display = 'none';
                }
            }


         });
    };
    tooglePopUp();

    //табы

    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
        tab = tabHeader.querySelectorAll('.service-header-tab'),
        tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = (index) => {
            for (let i = 0; i < tabContent.length; i++){
                if(index === i){
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else{
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            } 
        };

        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
            target = target.closest('.service-header-tab');
            if(target){
                tab.forEach((item, i) => {
                    if(item === target){
                        toggleTabContent(i);
                    }
                });
            }
        });
    };

    tabs();

    //слайдер

    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            //btn = document.querySelectorAll('.portfolio-btn'),
            //dot = document.querySelectorAll('.dot'),
            dots = document.querySelector('.portfolio-dots'),
            slider = document.querySelector('.portfolio-content');

        let currentSlide = 0,
            interval;

        // функция добавления точек
        
        const addDots = () => {

            // цикл создания точек по количеству слайдов
            for (let i = 0; i < slide.length; i++){

                // создаем элементы в html документе (странице) для дальнейшей работы с ними
                let newDot = document.createElement('li');
                newDot.classList.add('dot');
                dots.appendChild(newDot);
            }
        };
    
        addDots();

        const dot = document.querySelectorAll('.dot');

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);  
        };

        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if(currentSlide >= slide.length){
                currentSlide = 0;
            } 
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 2000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };
        slider.addEventListener('click', (event) => {
            event.preventDefault();

            let target = event.target;
            if(!target.matches('.portfolio-btn, .dot')){
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if(target.matches('#arrow-right')){
                currentSlide++;
            } else if(target.matches('#arrow-left')){
                currentSlide--;
            }else if(target.matches('.dot')){
                dot.forEach((elem, index) => {
                    if(elem === target) {
                        currentSlide = index;
                    }
                }); 
            }
            if(currentSlide >= slide.length){
                currentSlide = 0;
            }
            if(currentSlide < 0){
                currentSlide = slide.length - 1;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');            
        });

        slider.addEventListener('mouseover', (event) => {
            if(event.target.matches('.portfolio-btn') || event.target.matches('.dot')){
                stopSlide();
            } 
        });

        slider.addEventListener('mouseout', (event) => {
            if(event.target.matches('.portfolio-btn') || event.target.matches('.dot')){
                startSlide();
            } 
        });

        startSlide(2000);

    };

    slider();

    // замена фото по наведению мыши
    const changePhotos = () => {
        const commandPhotos = document.querySelectorAll('.command__photo');

        commandPhotos.forEach((item) => {

            const prevImg = item.getAttribute('src');

            item.addEventListener('mouseenter', (event) => {
                const target = event.target;

                target.src = target.dataset.img
            });

            item.addEventListener('mouseleave', (event) => {
                const target = event.target;
                
                target.src = prevImg;
            });
        

        });
    }

    changePhotos();

    const numberInput = () => {
        const calcItem = document.querySelectorAll('.calc-item'),
            calcBlock = document.querySelector('.calc-block');
        
        calcBlock.addEventListener('input', () => {
            calcItem.forEach((item) => {
                item.value = item.value.replace(/[^0-9]+$/g, '');
            });
        });
    
    }

    numberInput();

    //калькулятор

    const calc = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            calcCount = document.querySelector('.calc-count'),
            totalValue = document.getElementById('total');

        const countSum = () => {
            let total = 0,
                countValue = 1,
                dayValue = 1; 
            const typeValue = calcType.options[calcType.selectedIndex].value,
                 squareValue = +calcSquare.value;

                if(calcCount.value > 1){
                    countValue += +(calcCount.value - 1) / 10;
                }

                if(calcDay.value && calcDay.value < 5){
                    dayValue *= 2;
                }
                else if (calcDay.value && calcDay.value < 10){
                    dayValue *= 1.5;
                }

                 if (typeValue && squareValue){
                     total = price * typeValue * squareValue * countValue * dayValue;
                 }

            totalValue.textContent = total;


             
        };

        calcBlock.addEventListener('change', (event) => {
            const target = event.target;
            /*if (target.matches('.calc-type') || target.matches('.calc-square') ||
            target.matches('.calc-day') || target.matches('.calc-count')){
                console.log(1);
            }*/

            /*if(target === calcType || target === calcSquare || 
                target === calcDay || target === calcCount) {
                    console.log(1);
                }*/

            if(target.matches('select') || target.matches('input')){
                countSum();
            };

        });

    };

    calc(100);
 
});