import calc from "./modules/calc";
import cards from "./modules/cards";
import forms from "./modules/forms";
import modal, {openModal} from "./modules/modal";
import slider from "./modules/slider";
import tabs from "./modules/tabs";
import timer from "./modules/timer";

window.addEventListener('DOMContentLoaded', item => {
    const timeInterval = setInterval(()=>openModal('.modal', timeInterval), 300000)
    calc();
    cards();
    forms('.modal', timeInterval);
    modal('.modal', timeInterval);
    slider();
    tabs();
    timer('.timer','2021-12-31');
})
