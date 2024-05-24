import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputDate = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysShown = document.querySelector('[data-days]');
const hoursShown = document.querySelector('[data-hours]');
const minutesShown = document.querySelector('[data-minutes]');
const secondsShown = document.querySelector('[data-seconds]');
let userSelectedDate;
let timeNow;

function errorMessage() {
  iziToast.error({
    title: 'Please choose a date in the future',
    progressBar: true,
    timeout: 2500,
    titleColor: '#fff',
    backgroundColor: '#f00',
    close: false,
    closeOnEscape: true,
    closeOnClick: true,
    position: 'topRight',
  });
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    timeNow = Date.now();
    console.log(userSelectedDate.getTime());
    console.log(Date.now());
    if (timeNow >= userSelectedDate.getTime()) {
      errorMessage();
    } else {
      startBtn.removeAttribute('disabled', '');
    }
  },
};

// function compareDate(currentTime, choosenTime) {}

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

let leastTime;
let intervalId;

function minus() {
  leastTime = leastTime - 1000;
  daysShown.innerHTML = `${convertMs(leastTime).days}`.padStart(2, '0');
  hoursShown.innerHTML = `${convertMs(leastTime).hours}`.padStart(2, '0');
  minutesShown.innerHTML = `${convertMs(leastTime).minutes}`.padStart(2, '0');
  secondsShown.innerHTML = `${convertMs(leastTime).seconds}`.padStart(2, '0');
  console.log(leastTime);
  if (leastTime < 1000) {
    clearInterval(intervalId);
    inputDate.removeAttribute('disabled', '');
  }
}

startBtn.addEventListener('click', () => {
  leastTime = userSelectedDate.getTime() - timeNow;
  startBtn.setAttribute('disabled', '');
  inputDate.setAttribute('disabled', '');
  minus();
  intervalId = setInterval(minus, 1000);
});
