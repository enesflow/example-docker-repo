const app = require("express")();
const crypto = require('crypto');

let visits = 0;

app.get("/", (req, res) => {
  visits++;
  console.log(`Sending: This page has been visited ${visits} times`);
  res.send(`This page has been visited ${visits} times`);
});

app.get("/cpu", (req, res) => {
  const durationInSeconds = 5;
  performCpuIntensiveTask(durationInSeconds);

  console.log('CPU-intensive process completed.');
  res.send('CPU-intensive process completed.');
});

app.get("/cpu2/:duration", (req, res) => {
  const durationInSeconds = parseInt(req.params.duration, 10);
  performCpuIntensiveTask(durationInSeconds);

  console.log('CPU-intensive process completed.');
  res.send('CPU-intensive process completed.');
});

function performCpuIntensiveTask(durationInSeconds) {
  const endTime = Date.now() + durationInSeconds * 1000;

  while (Date.now() < endTime) {
    const randomString = crypto.randomBytes(1024).toString('hex');
    crypto.pbkdf2Sync(randomString, 'salt', 100000, 512, 'sha512');
  }
}

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
