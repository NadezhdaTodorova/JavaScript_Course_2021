/* eslint-disable linebreak-style */
const timerLine = 2000;

const intervalId = setInterval(() => {
  console.log('Sending analytics data...');
},
timerLine);

document.getElementById('stop-analytics-btn').addEventListener('click',
() => {
  clearInterval(intervalId);
});
