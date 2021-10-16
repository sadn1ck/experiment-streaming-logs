let i = 1;

function spam() {
  console.log(
    `[${i}] logging this random line at time ${new Date().toLocaleTimeString()}`
  );
  i++;
}

setInterval(spam, 1000);
