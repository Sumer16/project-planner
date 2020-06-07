const timer = 2000;

/* eslint-disable newline-after-var */
const interValid = setInterval(() => {
  console.log('Sending analytics data...');
}, timer);

document.getElementById('anal').addEventListener('click', () => {
  clearInterval(interValid);
});