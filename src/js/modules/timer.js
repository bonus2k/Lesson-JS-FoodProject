import {getZero} from "../services/services";

function timer(selector, deadLine){

    const timer = document.querySelector(selector);

    setTimer(timer, deadLine);

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
}

export default timer;