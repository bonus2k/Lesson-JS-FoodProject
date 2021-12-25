function forms() {
    const formCallMe = document.querySelectorAll("form");

    sendFormData(formCallMe, "server.php");

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
                axios.post('http://localhost:3000/requests', {
                    obj
                })
                    .then((data) => {
                        console.log(data.status),
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

module.exports = forms;