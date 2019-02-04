const express = require('express');
const cmd = require('node-cmd');
const app = express();
const port = 8000;

app.get('/pkg/*', async (req, res) => {
	let p = req.path.slice(5);
	let o = clientData(req.headers["user-agent"]);

	let b;
	check(p, done => {
		b = done;
		console.log(b);
	});

	// if (b === true) {
	// 	console.log("true")
	// }
	// else if (b === false) {
	// 	console.log("false")
	// }
	// else if (b === undefined) {
	// 	console.log("undefined")
	// }
	// else {
	// 	console.log("lol")
	// }

	// await download(p);
	// await compile(p);

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

	// res.sendFile(`/Users/rohan/Documents/Webwork/quicli/server/bin/${p}-${o}`);
	res.send(p);
});

clientData = a => {
	if (a.includes("Macintosh"))
		return "macos";
	else if (a.includes("Windows"))
		return "win.exe";
	else if (a.includes("Linux"))
		return "linux";
	else
		return 404;
	// ip?
}

check = async (p, cb) => {
	await cmd.get('ls ./mods/node_modules', (err, data, stderr) => {
		cb(data.includes(p));
	});
}

download = async p => {
	cmd.get(`npm install --prefix ./mods/ ${p}`, (err, data, stderr) => {
		console.log(data);
	});
}

compile = async p => {
	cmd.get(`pkg --out-path ./bin ./mods/node_modules/${p}`, (err, data, stderr) => {
		console.log(data);
	});
}

app.get('/createKey', (req, res) => {
	// TODO: creates key for paying user, pushes into db, and returns it to res
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}!`);
});

// pkg -t node10-macos ../index.js
