function calc() {
    const calculatingResult = document.querySelector('.calculating__result', 'span'),
        calculatingItem = document.querySelectorAll('.calculating__choose-item');

    document.addEventListener('input', event => {
        if (event.target.parentElement.classList.contains('calculating__choose_medium')) {
            getInputValueCalc(event.target);
        }
    })

    document.addEventListener('click', item => {
        if (item.target.classList.contains('calculating__choose-item')) {
            chooseActiveItemCalc(item.target)
        }
    })

    let sex, ratio, height, weight, age;
    loadDataCalc();

    function chooseActiveItemCalc(element) {
        calculatingItem.forEach(item => {
            if (item.parentElement === element.parentElement) {
                item.classList.remove('calculating__choose-item_active')
            }
            if (!element.parentElement.classList.contains('calculating__choose_medium')) {
                element.classList.add('calculating__choose-item_active')
            }
        })
        getActiveValueCalc();
    }

    function getInputValueCalc(element) {
        if (!(+element.value) || element.value.length > 3) {
            element.classList.add('calculating__choose-item_error')
        } else {
            element.classList.remove('calculating__choose-item_error');
            switch (element.id) {
                case 'height':
                    height = +element.value;
                    calcResult();
                    break;
                case 'weight':
                    weight = +element.value;
                    calcResult();
                    break;
                case 'age':
                    age = +element.value;
                    calcResult();
                    break;
            }
        }
    }

    function getActiveValueCalc() {
        const activeElement = document.querySelectorAll('.calculating__choose-item_active');
        activeElement.forEach(item => {
            if (item.dataset.sex) {
                sex = item.dataset.sex;
                calcResult();
            }
            if (item.dataset.ratio) {
                ratio = +item.dataset.ratio;
                calcResult();
            }
        })
    }

    function calcResult() {
        if (sex && ratio && height && weight && age) {
            if (sex === 'male') {
                calculatingResult.innerHTML = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
            }
            if (sex === 'female') {
                calculatingResult.innerHTML = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
            }
        } else calculatingResult.innerHTML = '____'
        saveDataCalc();
    }

    function saveDataCalc() {
        const localStorage = window.localStorage;
        const dataCalc = [sex, ratio, height, weight, age],
            itemCalc = document.querySelectorAll('.calculating__choose-item');
        dataCalc.forEach(data => {
            if (data) {
                itemCalc.forEach(item => {
                    if (data == item.value) {
                        localStorage.setItem(item.id, data)
                    }
                    if (item.classList.contains('calculating__choose-item_active')) {
                        localStorage.setItem(item.parentElement.id, item.id)
                    }
                })
            }
        })
    }

    function loadDataCalc() {
        const localStorage = window.localStorage,
            itemCalc = document.querySelectorAll('.calculating__choose-item'),
            arrInputValue = [];

        itemCalc.forEach(item => {
            if (item.parentElement.id !== '') {
                const element = localStorage.getItem(item.parentElement.id);
                if (element != null && item.id == element) {
                    item.classList.add('calculating__choose-item_active');
                } else if (element != null) {
                    item.classList.remove('calculating__choose-item_active');
                }
            } else {
                const element = localStorage.getItem(item.id);
                if (element != null) {
                    item.value = element
                    arrInputValue.push(item)
                } else {
                    item.value = '';
                }
            }
        })
        getActiveValueCalc();
        arrInputValue.forEach(item => getInputValueCalc(item));
    }

    calcResult();
}

module.exports = calc;