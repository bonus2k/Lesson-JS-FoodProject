function modal() {

    const modal = document.querySelector(".modal"),
          btnCallMe = document.querySelectorAll("[data-callMe]");

    document.addEventListener('click', item => {
        if (item.target == btnCallMe[0] || item.target == btnCallMe[1]) {
            openModal();
        }
        if (item.target === modal || item.target.getAttribute('data-close') == "") {
            closeModal();
        }
    })

    function thanksModal(message) {
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

        setTimeout(() => {
            modalMessage.remove()
            modalDialog.classList.add("show");
            modalDialog.classList.remove("hide");
            closeModal();
        }, 4000)
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
}

module.exports = modal;