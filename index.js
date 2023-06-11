const app = require("express")();

let visits = 0;

app.get("/", (req, res) => {
	visits++;
	console.log(`Sending: This page has been visited ${visits} times`);
	res.send(`This page has been visited ${visits} times`);
});

app.listen(3000, () => {
	console.log("Example app listening on port 3000!");
});
