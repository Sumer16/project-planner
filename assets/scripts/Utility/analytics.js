const interValid = setInterval(() => {
  console.log('Sending analytics data...');
}, 2000);

document.getElementById('anal').addEventListener('click', () => {
  clearInterval(interValid);
});