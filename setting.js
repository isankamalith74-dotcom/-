/*
🌸 𝗦𝗖𝗥𝗜𝗣𝗧 𝗜𝗡𝗙𝗢 🌸  
┌───────────────────────────────┐
│ 💫 𝗝𝘂𝗱𝘂𝗹 : Yurii-Md  
│ 👑 𝗖𝗿𝗲𝗮𝘁𝗼𝗿 : FallZx Infinity  
│ ⚠️ 𝗡𝗼𝘁𝗲 : Jangan hapus credit ini!  
│     Hargai creator dengan tetap mencantumkan nama.  
└───────────────────────────────┘
✨ Terima kasih telah menggunakan script ini!
*/
"use strict";

const fs = require('fs')
const chalk = require('chalk')
global.ownerNumber = ["212714299094", "6285813708397"]
global.owner = "6285813708397"
global.botfullname = "ʏᴜʀɪɪ ~ ᴍᴅ 🌸"
global.botname = "ʏᴜʀɪɪ ~ ᴍᴅ 🌸"
global.ownername = "FallZx-Infinity "
module.exports = {
  sesionName: "session",
  banchats: false,
  autoreadsw: false,
  anticall: true,
  banned: {
   maroko: true,
   india: false,
  },  
  author: `FallZx-Infinity`,
  packname: `ʏᴜʀɪɪ ~ ᴍᴅ 🌸`,
  gcount: { "prem": 30, "user": 20 },
  limitCount: 20,
  modul: {
    baileys: require("@whiskeysockets/baileys"),
    boom: require('@hapi/boom'),
    chalk: require('chalk'),
    child: require('child_process'),
    fs: require('fs'),
    pino: require("pino"),
    path: require("path"),
    phonenumber: require('awesome-phonenumber'),
    time: require("moment-timezone"),
    jimp: require('jimp'),
    speed: require('performance-now'),
    util: require("util"),
    https: require('https'),
    sizeFormater: require('human-readable'),
    axios: require('axios'),
    ytsr: require('yt-search'),           
    readline: require("readline"),
    nodecache: require("node-cache"),
    premium: require('parse-ms'),
   },
  file: {
    load: './connection/starting',
    color: './lib/color',
    move: './lib/simple.js', 
    set: './lib/myfunc',
    funct: './lib/function',
    exif: './lib/exif',
    list: './lib/list',
    scrapp: './lib/scraper',
    prem: './lib/premium',
    limit: './lib/limit',
  },

}
let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.yellow(`New ${__filename}`))
	delete require.cache[file]
	require(file)
})
