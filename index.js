const app = require("express")();

let visits = 0;

app.get("/", (req, res) => {
	visits++;
	res.send(`This page has been visited ${visits} times`);
});

app.listen(3000, () => {
	console.log("Example app listening on port 3000!");
});
