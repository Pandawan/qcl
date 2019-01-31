const express = require('express');
const app = express();
const port = 8000;

app.get('/pkg/*', (req, res) => {
	let p = req.path.slice(1);
	console.log(p);

	download(p);
	compile(p);

	/* TODO:
	>Check for userKey and userOS in req.params (maybe IP too)
		>If userKey is in db, then continue
		>If not, then send error code for invalid user
		>If userOS is win, mac, or linux then continue
		>If not, then send error code for unsupported OS
	>Check if have the requested file already
		>If yes, then sendFile for right userOS
		>If not, npm install package, run pkg, then sendFile
	*/

	res.sendFile(`/Users/rohan/Documents/Webwork/quicli/server/bin/${p}-userOS`); // userOS
});

download = () => {
	// npm programmaticaly (fs?)
}

compile = () => {
	// pkg
}

app.get('/createKey', (req, res) => {
	// TODO: creates key for paying user, pushes into db, and returns it to res
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}!`);
});

// pkg -t node10-macos ../index.js
