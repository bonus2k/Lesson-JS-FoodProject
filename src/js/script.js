window.addEventListener('DOMContentLoaded', item => {
//     const tabsContent = document.querySelectorAll(".tabcontent"),
//         tabItem = document.querySelectorAll(".tabheader__item"),
//         tabsParent = document.querySelector(".tabheader__items"),
//         timer = document.querySelector(".timer"),
//         deadLine = '2021-12-31',
//         btnCallMe = document.querySelectorAll("[data-callMe]"),
//         formCallMe = document.querySelectorAll("form"),
//         modal = document.querySelector(".modal"),
//         timerInterval = setInterval(openModal, 15000);
//
//     const offerSlider = document.querySelector('.offer__slider'),
//         offerSlide = offerSlider.querySelectorAll('.offer__slide'),
//         slidesWrapper = document.querySelector('.offer__slider-wrapper'),
//         slidesInner = document.querySelector('.offer__slider-inner'),
//         prev = document.querySelector('.offer__slider-prev'),
//         next = document.querySelector('.offer__slider-next'),
//         // total = document.querySelector('#total'),
//         current = document.querySelector('#current'),
//         widthSlidesWrapper = window.getComputedStyle(slidesWrapper).width,
//         indicators = document.createElement('ol');
//
//     const calculatingItem = document.querySelectorAll('.calculating__choose-item');
//
//     function hideTabContent() {
//         tabsContent.forEach(item => {
//             item.classList.remove("show", "fade")
//             item.classList.add("hide")
//         });
//         tabItem.forEach(item => {
//             item.classList.remove("tabheader__item_active");
//         });
//     };
//
//     function showTabContent(i = 0) {
//         tabsContent[i].classList.remove("hide");
//         tabsContent[i].classList.add("show", "fade");
//         tabItem[i].classList.add("tabheader__item_active");
//     };
//
//     function sendFormData(formSelector, URL) {
//         const message = {
//                 loading: "img/form/spinner.svg",
//                 success: "Спасибо! Скоро мы с Вами свяжемся",
//                 failure: "Что-то пошло не так..."
//             },
//             messageStatus = document.createElement('img');
//
//         messageStatus.src = message.loading
//         messageStatus.style.cssText = ' display:block; margin:0 auto;'
//
//         formSelector.forEach(form => {
//             form.addEventListener("submit", (e) => {
//                 e.preventDefault();
//                 e.target.insertAdjacentElement('afterend', messageStatus);
//                 const formData = new FormData(e.target),
//                     obj = Object.fromEntries(formData);
//                 axios.post('http://localhost:3000/requests', {
//                     obj
//                 })
//                     .then((data) => {
//                         console.log(data.status),
//                             messageStatus.remove(),
//                             thanksModal(message.success)
//                     })
//                     .catch(() => {
//                         thanksModal(message.failure)
//                     })
//                     .finally(
//                         form.reset()
//                     )
//             })
//         })
//     }
//
//     function thanksModal(message) {
//         const modalDialog = document.querySelector('.modal__dialog'),
//             modalMessage = document.createElement('div');
//
//         modalDialog.classList.add("hide");
//         openModal();
//         modalMessage.classList.add('modal__dialog')
//         modalMessage.innerHTML =
//             `
//                 <div class="modal__content">
//                     <div data-close class="modal__close">&times;</div>
//                     <div class="modal__title">${message}</div>
//                 <div>
// `
//         document.querySelector('.modal').append(modalMessage);
//         setTimeout(() => {
//             modalMessage.remove()
//             modalDialog.classList.add("show");
//             modalDialog.classList.remove("hide");
//             closeModal();
//         }, 4000)
//     }
//
//     tabsParent.addEventListener("click", event => {
//         const target = event.target;
//         tabItem.forEach((item, i) => {
//             if (target && target == tabItem[i]) {
//                 hideTabContent();
//                 showTabContent(i);
//             }
//         })
//     });
//
//     hideTabContent();
//     showTabContent();
//     setTimer(timer, deadLine);
//     sendFormData(formCallMe, "server.php");
//
//     function getZero(num) {
//         return (num >= 0 && num < 10) ? `0${num}` : `${num}`
//     }
//
//
//     function getDeadline(deadLine) {
//         const startDate = new Date(),
//             endDate = Date.parse(deadLine),
//             total = endDate - startDate,
//             day = Math.floor(total / (1000 * 60 * 60 * 24)),
//             hour = Math.floor(total / (1000 * 60 * 60) % 24),
//             minute = Math.floor(total / (1000 * 60) % 60),
//             second = Math.floor(total / 1000 % 60);
//         return (total > 0) ?
//             {total, day, hour, minute, second} :
//             {total: 0, day: 0, hour: 0, minute: 0, second: 0}
//     }
//
//     function setTimer(elementTimer, deadLine) {
//         const timerInterval = setInterval(startTimer, 1000);
//         startTimer();
//
//         function startTimer() {
//             const timer = getDeadline(deadLine);
//             if (timer.total <= 0) {
//                 clearInterval(timerInterval);
//             }
//             elementTimer.querySelector("#days").innerHTML = timer.day
//             elementTimer.querySelector("#hours").innerHTML = getZero(timer.hour);
//             elementTimer.querySelector("#minutes").innerHTML = getZero(timer.minute);
//             elementTimer.querySelector("#seconds").innerHTML = getZero(timer.second);
//         }
//     }
//
//     function closeModal() {
//         modal.classList.add("hide");
//         modal.classList.remove("show", "fade");
//         document.body.style.overflow = "";
//     }
//
//     function openModal() {
//         modal.classList.add("show", "fade");
//         modal.classList.remove("hide");
//         document.body.style.overflow = "hidden";
//         clearInterval(timerInterval);
//     }
//
//     document.addEventListener('click', item => {
//         if (item.target == btnCallMe[0] || item.target == btnCallMe[1]) {
//             openModal();
//         }
//         if (item.target === modal || item.target.getAttribute('data-close') == "") {
//             closeModal();
//         }
//         if (item.composedPath().includes(prev)) {
//             getPrevSlide(+current.innerHTML);
//         }
//         if (item.composedPath().includes(next)) {
//             getNextSlide(+current.innerHTML);
//         }
//         if (item.composedPath().includes(indicators) && item.target.classList.contains('dot')) {
//             showOfferSlide(+item.target.getAttribute('data-id'));
//         }
//         if (item.target.classList.contains('calculating__choose-item')) {
//             chooseActiveItemCalc(item.target)
//         }
//     })
//
//     document.addEventListener('keydown', item => {
//         if (item.code === 'Escape' &&
//             modal.classList.contains("show")) {
//             closeModal();
//         }
//     })
//
//     function showScrollModal() {
//         if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 10) {
//             openModal();
//             window.removeEventListener('scroll', showScrollModal);
//         }
//     }
//
//     window.addEventListener('scroll', showScrollModal);
//
//     class MenuCard {
//
//         constructor(src, alt, title, descr, price, parentSelector, transfer = 74, ...classes) {
//             this.scr = src;
//             this.alt = alt;
//             this.title = title;
//             this.descr = descr;
//             this.price = price;
//             this.parentSelector = document.querySelector(parentSelector);
//             this.transfer = transfer;
//             this.classes = (classes.length > 0) ? classes : ['menu__item'];
//             this.changeToRUB();
//         }
//
//         changeToRUB() {
//             this.price = (+this.price * (1 / this.transfer)).toFixed(2);
//         }
//
//         render() {
//             const menu = document.createElement('div');
//             this.classes.forEach(className => menu.classList.add(className));
//             menu.innerHTML = `
//                     <img src=${this.scr} alt=${this.alt}>
//                     <h3 class="menu__item-subtitle">${this.title}</h3>
//                     <div class="menu__item-descr">${this.descr}</div>
//                     <div class="menu__item-divider"></div>
//                     <div class="menu__item-price">
//                         <div class="menu__item-cost">Цена:</div>
//                         <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
//                     </div>
//                 `
//             this.parentSelector.append(menu);
//         }
//     }
//
//     async function getData(URL) {
//         const data = await fetch(URL);
//         if (!data.ok) {
//             throw new Error(`Could not fetch ${URL}. Status ${data.status}, code ${data.code}`);
//         }
//         return await data.json();
//     }
//
//     getData('https://www.cbr-xml-daily.ru/latest.js')
//         .then(current => getData('http://localhost:3000/menu')
//             .then(data => data.forEach(({img, altimg, title, descr, price}) => {
//                 new MenuCard(img, altimg, title, descr, price, '.menu .container', current.rates.USD)
//                     .render();
//             }))
//         )
//
//     // 1 variant
//     // function showOfferSlide(numberSlide) {
//     //     offerSlide.forEach((item, i) => {
//     //         total.innerHTML = getZero(offerSlide.length);
//     //         item.classList.remove('show');
//     //         item.classList.add('hide');
//     //         if (i + 1 == numberSlide) {
//     //             item.classList.remove('hide');
//     //             item.classList.add('show');
//     //             current.innerHTML = getZero(i + 1);
//     //         }
//     //     })
//     // }
//
//     function initOfferSlide() {
//         slidesInner.style.width = 100 * offerSlide.length + '%';
//         slidesInner.style.display = 'flex';
//         slidesInner.style.transition = '0.5s all';
//         slidesWrapper.style.overflow = 'hidden';
//         indicators.classList.add('carousel-indicators');
//         offerSlider.style.position = 'relative';
//         offerSlider.append(indicators);
//         offerSlide.forEach((slide, i) => {
//             slide.style.width = widthSlidesWrapper;
//             const dot = document.createElement('li');
//             dot.classList.add('dot');
//             dot.style.innerHTML = '.';
//             dot.setAttribute('data-id', i + 1);
//             indicators.append(dot);
//         })
//     }
//
//     initOfferSlide();
//
// //2 variant (carousel)
//     function showOfferSlide(numberSlide) {
//         let slide = Number.parseFloat(widthSlidesWrapper) * (numberSlide - 1);
//         slidesInner.style.transform = `translateX(-${slide}px)`;
//         current.innerHTML = getZero(numberSlide);
//         document.querySelectorAll('.dot').forEach(item => {
//             if (item.getAttribute('data-id') == numberSlide) {
//                 item.style.opacity = '1';
//             } else {
//                 item.style.opacity = '0.5';
//             }
//         })
//     }
//
//     showOfferSlide(1)
//
//     function getNextSlide(currentSlide) {
//         const nextSlide = (currentSlide === offerSlide.length) ? 1 : currentSlide + 1;
//         showOfferSlide(nextSlide)
//     }
//
//     function getPrevSlide(currentSlide) {
//         const prevSlide = (currentSlide === 1) ? offerSlide.length : currentSlide - 1;
//         showOfferSlide(prevSlide)
//     }
//
//     //Calc
//
//     const calculatingResult = document.querySelector('.calculating__result', 'span');
//
//     document.addEventListener('input', event => {
//         if (event.target.parentElement.classList.contains('calculating__choose_medium')) {
//             getInputValueCalc(event.target);
//         }
//     })
//
//     let sex, ratio, height, weight, age;
//     loadDataCalc();
//
//     function chooseActiveItemCalc(element) {
//         calculatingItem.forEach(item => {
//             if (item.parentElement === element.parentElement) {
//                 item.classList.remove('calculating__choose-item_active')
//             }
//             if (!element.parentElement.classList.contains('calculating__choose_medium')) {
//                 element.classList.add('calculating__choose-item_active')
//             }
//         })
//         getActiveValueCalc();
//     }
//
//     function getInputValueCalc(element) {
//         if (!(+element.value) || element.value.length > 3) {
//             element.classList.add('calculating__choose-item_error')
//         } else {
//             element.classList.remove('calculating__choose-item_error');
//             switch (element.id) {
//                 case 'height':
//                     height = +element.value;
//                     calcResult();
//                     break;
//                 case 'weight':
//                     weight = +element.value;
//                     calcResult();
//                     break;
//                 case 'age':
//                     age = +element.value;
//                     calcResult();
//                     break;
//             }
//         }
//     }
//
//     function getActiveValueCalc() {
//         const activeElement = document.querySelectorAll('.calculating__choose-item_active');
//         activeElement.forEach(item => {
//             if (item.dataset.sex) {
//                 sex = item.dataset.sex;
//                 calcResult();
//             }
//             if (item.dataset.ratio) {
//                 ratio = +item.dataset.ratio;
//                 calcResult();
//             }
//         })
//     }
//
//     function calcResult() {
//         if (sex && ratio && height && weight && age) {
//             if (sex === 'male') {
//                 calculatingResult.innerHTML = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
//             }
//             if (sex === 'female') {
//                 calculatingResult.innerHTML = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
//             }
//         } else calculatingResult.innerHTML = '____'
//         saveDataCalc();
//     }
//
//     function saveDataCalc() {
//         const localStorage = window.localStorage;
//         const dataCalc = [sex, ratio, height, weight, age],
//             itemCalc = document.querySelectorAll('.calculating__choose-item');
//         dataCalc.forEach(data => {
//             if (data) {
//                 itemCalc.forEach(item => {
//                     if (data == item.value) {
//                         localStorage.setItem(item.id, data)
//                     }
//                     if (item.classList.contains('calculating__choose-item_active')) {
//                         localStorage.setItem(item.parentElement.id, item.id)
//                     }
//                 })
//             }
//         })
//     }
//
//     function loadDataCalc() {
//         const localStorage = window.localStorage,
//             itemCalc = document.querySelectorAll('.calculating__choose-item'),
//             arrInputValue = [];
//
//         itemCalc.forEach(item => {
//                 if (item.parentElement.id !== '') {
//                     const element = localStorage.getItem(item.parentElement.id);
//
//                     if (element != null && item.id == element) {
//                         item.classList.add('calculating__choose-item_active');
//
//                     } else if (element != null) {
//                         item.classList.remove('calculating__choose-item_active');
//                     }
//                 } else {
//                     const element = localStorage.getItem(item.id);
//                     if (element != null) {
//                         item.value = element
//                         arrInputValue.push(item)
//                     } else {
//                         item.value = '';
//                     }
//                 }
//             })
//         getActiveValueCalc();
//         arrInputValue.forEach(item => getInputValueCalc(item));
//     }
//     calcResult();
    const calc = require('./modules/calc'),
        cards = require('./modules/cards'),
        forms = require('./modules/forms'),
        modal = require('./modules/modal'),
        slider = require('./modules/slider'),
        tabs = require('./modules/tabs'),
        timer = require('./modules/timer');

    calc();
    cards();
    forms();
    modal();
    slider();
    tabs();
    timer();
})
