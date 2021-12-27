function closeModal(selector) {
    const modal = document.querySelector(selector);

    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
}

function openModal(selector, timerInterval) {
    const modal = document.querySelector(selector);

    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
    clearInterval(timerInterval);
}

function modal(selector, timerInterval) {

    const modal = document.querySelector(selector),
          btnCallMe = document.querySelectorAll("[data-callMe]");

    document.addEventListener('click', item => {
        if (item.target == btnCallMe[0] || item.target == btnCallMe[1]) {
            openModal(selector, timerInterval);
        }
        if (item.target === modal || item.target.getAttribute('data-close') == "") {
            closeModal(selector);
        }
    })

    document.addEventListener('keydown', item => {
        if (item.code === 'Escape' &&
            modal.classList.contains("show")) {
            closeModal(selector);
        }
    })

    window.addEventListener('scroll', showScrollModal);

    function showScrollModal() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(selector, timerInterval);
            window.removeEventListener('scroll', showScrollModal);
        }
    }

}

export default modal;
export {openModal};
export {closeModal};