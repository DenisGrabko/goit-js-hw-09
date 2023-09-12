import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

document.addEventListener("DOMContentLoaded", function () {
  const datePicker = flatpickr("#datetime-picker", {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const selectedDate = selectedDates[0];
      const currentDate = new Date();
      if (selectedDate <= currentDate) {
        notiflix.Notify.failure("Please choose a date in the future");
        document.querySelector('[data-start]').disabled = true;
      } else {
        document.querySelector('[data-start]').removeAttribute('disabled');
      }
    },
  });

  document.querySelector('[data-start]').addEventListener('click', () => {
    const selectedDate = datePicker.selectedDates[0];
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      notiflix.Notify.failure("Please choose a date in the future");
      return;
    }

    const timeDifference = selectedDate - currentDate;
    const timeRemaining = convertMs(timeDifference);

    const daysElement = document.querySelector('[data-days]');
    const hoursElement = document.querySelector('[data-hours]');
    const minutesElement = document.querySelector('[data-minutes]');
    const secondsElement = document.querySelector('[data-seconds]');

    function updateTimer() {
      if (timeRemaining.days === 0 && timeRemaining.hours === 0 &&
        timeRemaining.minutes === 0 && timeRemaining.seconds === 0) {
        clearInterval(timerInterval);
        daysElement.textContent = '00';
        hoursElement.textContent = '00';
        minutesElement.textContent = '00';
        secondsElement.textContent = '00';
        return;
      }

      daysElement.textContent = addLeadingZero(timeRemaining.days);
      hoursElement.textContent = addLeadingZero(timeRemaining.hours);
      minutesElement.textContent = addLeadingZero(timeRemaining.minutes);
      secondsElement.textContent = addLeadingZero(timeRemaining.seconds);

      timeRemaining.seconds--;

      if (timeRemaining.seconds < 0) {
        timeRemaining.seconds = 59;
        timeRemaining.minutes--;

        if (timeRemaining.minutes < 0) {
          timeRemaining.minutes = 59;
          timeRemaining.hours--;

          if (timeRemaining.hours < 0) {
            timeRemaining.hours = 23;
            timeRemaining.days--;
          }
        }
      }
    }

    const timerInterval = setInterval(updateTimer, 1000);
    updateTimer();
  });
});
