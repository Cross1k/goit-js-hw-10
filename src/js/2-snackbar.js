import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();
  const delay = Number(event.target.elements.delay.value);
  const state = event.target.elements.state.value;

  new Promise((resolve, reject) => {
    setTimeout(() => {
      switch (state) {
        case 'fulfilled':
          iziToast.success({
            message: `✅ Fulfilled promise in ${delay}ms`,
            position: 'topRight',
          });
          break;
        default:
          iziToast.error({
            message: `❌ Rejected promise in ${delay}ms`,
            position: 'topRight',
          });
          break;
      }
    }, delay);
    form.reset();
  });
});
