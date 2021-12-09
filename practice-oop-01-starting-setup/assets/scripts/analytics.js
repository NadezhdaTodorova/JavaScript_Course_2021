const intervalId = setInterval(() => {
    console.log('starting analytics...');
}, 2000)

document.getElementById('clearTimeoutBtn').addEventListener('click', ()=>{
    clearInterval(intervalId);
});