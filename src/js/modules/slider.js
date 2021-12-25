function slider() {

    const offerSlider = document.querySelector('.offer__slider'),
        offerSlide = offerSlider.querySelectorAll('.offer__slide'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesInner = document.querySelector('.offer__slider-inner'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        current = document.querySelector('#current'),
        widthSlidesWrapper = window.getComputedStyle(slidesWrapper).width,
        indicators = document.createElement('ol');

    document.addEventListener('click', item => {
        if (item.composedPath().includes(prev)) {
            getPrevSlide(+current.innerHTML);
        }
        if (item.composedPath().includes(next)) {
            getNextSlide(+current.innerHTML);
        }
        if (item.composedPath().includes(indicators) && item.target.classList.contains('dot')) {
            showOfferSlide(+item.target.getAttribute('data-id'));
        }
    })

    function initOfferSlide() {
        slidesInner.style.width = 100 * offerSlide.length + '%';
        slidesInner.style.display = 'flex';
        slidesInner.style.transition = '0.5s all';
        slidesWrapper.style.overflow = 'hidden';
        indicators.classList.add('carousel-indicators');
        offerSlider.style.position = 'relative';
        offerSlider.append(indicators);
        offerSlide.forEach((slide, i) => {
            slide.style.width = widthSlidesWrapper;
            const dot = document.createElement('li');
            dot.classList.add('dot');
            dot.style.innerHTML = '.';
            dot.setAttribute('data-id', i + 1);
            indicators.append(dot);
        })
    }

    initOfferSlide();

    function showOfferSlide(numberSlide) {
        let slide = Number.parseFloat(widthSlidesWrapper) * (numberSlide - 1);
        slidesInner.style.transform = `translateX(-${slide}px)`;
        current.innerHTML = getZero(numberSlide);
        document.querySelectorAll('.dot').forEach(item => {
            if (item.getAttribute('data-id') == numberSlide) {
                item.style.opacity = '1';
            } else {
                item.style.opacity = '0.5';
            }
        })
    }

    showOfferSlide(1)

    function getNextSlide(currentSlide) {
        const nextSlide = (currentSlide === offerSlide.length) ? 1 : currentSlide + 1;
        showOfferSlide(nextSlide)
    }

    function getPrevSlide(currentSlide) {
        const prevSlide = (currentSlide === 1) ? offerSlide.length : currentSlide - 1;
        showOfferSlide(prevSlide)
    }

    function getZero(num) {
        return (num >= 0 && num < 10) ? `0${num}` : `${num}`
    }
}

module.exports = slider;