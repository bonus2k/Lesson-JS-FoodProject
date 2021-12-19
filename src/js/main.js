
window.addEventListener('DOMContentLoaded', item => {
    const tabsContent = document.querySelectorAll(".tabcontent"),
        tabItem = document.querySelectorAll(".tabheader__item"),
        tabsParent = document.querySelector(".tabheader__items"),
        timer = document.querySelector(".timer"),
        deadLine = '2021-12-31',
        btnCallMe = document.querySelectorAll("[data-callMe]"),
        formCallMe = document.querySelectorAll("form"),
        modal = document.querySelector(".modal"),
        timerInterval = setInterval(openModal, 15000);

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.remove("show", "fade")
            item.classList.add("hide")
        });
        tabItem.forEach(item => {
            item.classList.remove("tabheader__item_active");
        });
    };

    function showTabContent(i = 0) {
        tabsContent[i].classList.remove("hide");
        tabsContent[i].classList.add("show", "fade");
        tabItem[i].classList.add("tabheader__item_active");
    };

    function sendFormData(formSelector, URL) {
        const message = {
            loading: "img/form/spinner.svg",
            success:"Спасибо! Скоро мы с Вами свяжемся",
            failure: "Что-то пошло не так..."
        },
            messageStatus = document.createElement('img');
        messageStatus.src = message.loading
        messageStatus.style.cssText = ' display:block; margin:0 auto;'

        formSelector.forEach(form => {
            form.addEventListener("submit", (e) => {
                e.preventDefault();
                e.target.insertAdjacentElement('afterend', messageStatus);
                const formData = new FormData(e.target),
                      obj = {};
                formData.forEach((value, key) => {
                        obj[key]=value;
                    }
                )
                const request = new XMLHttpRequest();
                request.open("POST", URL)
                request.setRequestHeader('Content-Type', 'application/json');
                request.send(JSON.stringify(obj));
                request.addEventListener("load", ()=>{
                    if (request.status===200){
                        console.log(request.response);
                        form.reset();
                        messageStatus.remove();
                        thanksModal(message.success);
                    } else {
                        thanksModal(message.failure);
                    }
                })
            })
        })
    }

    function thanksModal(message){
        const modalDialog = document.querySelector('.modal__dialog'),
              modalMessage = document.createElement('div');

        modalDialog.classList.add("hide");
        openModal();
        modalMessage.classList.add('modal__dialog')
        modalMessage.innerHTML =
            `
            <div class="modal__content">
                    <div data-close class="modal__close">&times;</div>
                    <div class="modal__title">${message}</div>
            <div>        
`
        document.querySelector('.modal').append(modalMessage);
        setTimeout(()=>{
            modalMessage.remove()
            modalDialog.classList.add("show");
            modalDialog.classList.remove("hide");
            closeModal();
        }, 4000)
    }

    tabsParent.addEventListener("click", event => {
        const target = event.target;
        tabItem.forEach((item, i) => {
            if (target && target == tabItem[i]) {
                hideTabContent();
                showTabContent(i);
            }
        })
    });

    hideTabContent();
    showTabContent();
    setTimer(timer, deadLine);
    sendFormData(formCallMe, "server.php");

    function getZero(num) {
        return (num >= 0 && num < 10) ? `0${num}` : `${num}`
    }


    function getDeadline(deadLine) {
        const startDate = new Date(),
            endDate = Date.parse(deadLine),
            total = endDate - startDate,
            day = Math.floor(total / (1000 * 60 * 60 * 24)),
            hour = Math.floor(total / (1000 * 60 * 60) % 24),
            minute = Math.floor(total / (1000 * 60) % 60),
            second = Math.floor(total / 1000 % 60);
        return (total > 0) ?
            {total, day, hour, minute, second} :
            {total: 0, day: 0, hour: 0, minute: 0, second: 0}
    }

    function setTimer(elementTimer, deadLine) {
        const timerInterval = setInterval(startTimer, 1000);
        startTimer();

        function startTimer() {
            const timer = getDeadline(deadLine);
            if (timer.total <= 0) {
                clearInterval(timerInterval);
            }
            elementTimer.querySelector("#days").innerHTML = timer.day
            elementTimer.querySelector("#hours").innerHTML = getZero(timer.hour);
            elementTimer.querySelector("#minutes").innerHTML = getZero(timer.minute);
            elementTimer.querySelector("#seconds").innerHTML = getZero(timer.second);
        }
    }

    function closeModal() {
        modal.classList.add("hide");
        modal.classList.remove("show", "fade");
        document.body.style.overflow = "";
    }

    function openModal() {
        modal.classList.add("show", "fade");
        modal.classList.remove("hide");
        document.body.style.overflow = "hidden";
        clearInterval(timerInterval);
    }

    document.addEventListener('click', item => {
        if (item.target == btnCallMe[0] || item.target == btnCallMe[1]) {
            openModal();
        }
        if (item.target === modal || item.target.getAttribute('data-close') == "") {
            closeModal();
        }
    })

    document.addEventListener('keydown', item => {
        if (item.code === 'Escape' &&
            modal.classList.contains("show")) {
            closeModal();
        }
    })

    function showScrollModal() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 10) {
            openModal();
            window.removeEventListener('scroll', showScrollModal);
        }
    }

    window.addEventListener('scroll', showScrollModal);

    class MenuCard {

        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.scr = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parentSelector = document.querySelector(parentSelector);
            this.classes = (classes.length > 0) ? classes : ['menu__item'];
            this.transfer = 75;
            this.changeToRUB();
        }

        changeToRUB() {
            this.price = +this.price * this.transfer;
        }

        //Изучить await/async, const transfer = getCurrentRate().then(current => current.rates.USD) получаю нужные данные
        getCurrentRate() {
            return new Promise((resolve) =>{
                const reques = new XMLHttpRequest();
                reques.open("GET", "https://www.cbr-xml-daily.ru/latest.js");
                reques.send()
                reques.addEventListener("load", ()=> {
                    if (reques.status === 200) {
                        const current = JSON.parse(reques.response);
                        resolve(current);
                    }
                })
            })
        }

        render() {
            const menu = document.createElement('div');
            this.classes.forEach(className => menu.classList.add(className));
            menu.innerHTML = `
                    <img src=${this.scr} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                    </div>
                `
            this.parentSelector.append(menu);
        }
    }

    new MenuCard(
        'img/tabs/vegy.jpg',
        'vegy',
        'Меню "Фитнес"',
        'Меню \"Фитнес\" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. ' +
        'Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container'
    ).render();

    new MenuCard(
        'img/tabs/elite.jpg',
        'elite',
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. ' +
        'Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        14,
        '.menu .container'
    ).render();

    new MenuCard(
        'img/tabs/post.jpg',
        'post',
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, ' +
        'молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        21,
        '.menu .container'
    ).render();
})
