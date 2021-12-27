import {closeModal, openModal} from "./modal";

function forms(selector, timerInterval) {
    const formCallMe = document.querySelectorAll("form");

    sendFormData(formCallMe, "server.php");

    function thanksModal(message) {
        const modalDialog = document.querySelector('.modal__dialog'),
            modalMessage = document.createElement('div');

        modalDialog.classList.add("hide");
        openModal(selector, timerInterval);
        modalMessage.classList.add('modal__dialog')
        modalMessage.innerHTML =
            `
                <div class="modal__content">
                    <div data-close class="modal__close">&times;</div>
                    <div class="modal__title">${message}</div>
                <div>        
`
        document.querySelector(selector).append(modalMessage);

        setTimeout(() => {
            modalMessage.remove()
            modalDialog.classList.add("show");
            modalDialog.classList.remove("hide");
            closeModal(selector);
        }, 4000)
    }

    function sendFormData(formSelector, URL) {
        const message = {
                loading: "img/form/spinner.svg",
                success: "Спасибо! Скоро мы с Вами свяжемся",
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
                    obj = Object.fromEntries(formData);
                axios.post(URL, {obj})
                    .then((data) => {
                        console.log(data.data),
                            messageStatus.remove(),
                            thanksModal(message.success)
                    })
                    .catch(() => {
                        thanksModal(message.failure)
                    })
                    .finally(
                        form.reset()
                    )
            })
        })
    }
}

export default forms;