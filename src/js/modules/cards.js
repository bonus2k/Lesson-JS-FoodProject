import {getData} from "../services/services";

function cards() {

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, transfer = 74, ...classes) {
            this.scr = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parentSelector = document.querySelector(parentSelector);
            this.transfer = transfer;
            this.classes = (classes.length > 0) ? classes : ['menu__item'];
            this.changeToRUB();
        }

        changeToRUB() {
            this.price = (+this.price * (1 / this.transfer)).toFixed(2);
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

    getData('https://www.cbr-xml-daily.ru/latest.js')
        .then(current => getData('http://localhost:3000/menu')
            .then(data => data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container', current.rates.USD)
                    .render();
            }))
        )
}

export default cards;