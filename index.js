const app = require("express")();
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

let visits = 0;

app.get("/", (req, res) => {
	visits++;
	console.log(`Sending: This page has been visited ${visits} times`);
	res.send(`This page has been visited ${visits} times`);
});

app.get("/cpu/:duration", (req, res) => {
	const durationInSeconds = parseInt(req.params.duration, 10);
	performCpuIntensiveTask(durationInSeconds);

	console.log("CPU-intensive process completed.");
	res.send("CPU-intensive process completed.");
});

app.get("/test", (req, res) => {
	const testValue = process.env.TEST;
	res.send(`The value of TEST environment variable is: ${testValue}`);
});

// New route to list files/folders in a directory
app.get("/list", (req, res) => {
	const directory = process.env.DIRECTORY; // Replace 'DIRECTORY' with the name of your environment variable
	if (!directory) {
		return res
			.status(400)
			.send("The DIRECTORY environment variable is not set.");
	}

	fs.access(directory, fs.constants.F_OK, (err) => {
		if (err) {
			console.error(`Directory does not exist: ${directory}`);
			return res
				.status(400)
				.send("The specified directory does not exist.");
		}

		fs.readdir(directory, (err, files) => {
			if (err) {
				console.error(`Error reading directory: ${err.message}`);
				return res.status(500).send("Error reading directory.");
			}

			res.send(`Files/Folders in ${directory}: ${files.join(", ")}`);
		});
	});
});

function performCpuIntensiveTask(durationInSeconds) {
	const endTime = Date.now() + durationInSeconds * 1000;

	while (Date.now() < endTime) {
		const randomString = crypto.randomBytes(1024).toString("hex");
		crypto.pbkdf2Sync(randomString, "salt", 100000, 512, "sha512");
	}
}

app.listen(3000, () => {
	console.log("(fixed) Example app listening on port 3000! Hello World!");
});
