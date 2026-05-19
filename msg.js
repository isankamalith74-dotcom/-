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
const SETTING = require('../connection/setting')
const keywords = require('../lib/validator/allKeywords')

let modul = SETTING['modul'];
let getreq = SETTING['file'];
const chalk = modul['chalk'];
const fs = modul['fs'];
const util = modul['util'];
const https = modul['https'];
const axios = modul['axios'];
const ytsr = modul['ytsr'];
const { spawn, exec, execSync } = modul['child'];
const { downloadContentFromMessage, WA_DEFAULT_EPHEMERAL, getLastMessageInChat, MessageType, generateWAMessageFromContent, prepareWAMessageMedia, proto } = modul['baileys'];
const moment = modul['time'];
const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
const speed = modul['speed'];
const request = modul['request'];
const path = modul['path'];
const ms = modul['premium'];
const cheerio = require('cheerio');
const _prem = require('.' + getreq['prem']);
const { isLimit, limitAdd, getLimit, giveLimit, addBalance, kurangBalance, getBalance, isGame, gameAdd, givegame, cekGLimit } = require('.' + getreq['limit']);
const { color, bgcolor, ConsoleLog, biocolor } = require('.' + getreq['color']);
const { formatSize, sleep, readTime, reSize, runtime, getBuffer, getRandom, pickRandom, fetchJson, isUrl, genMath, formatp } = require('.' + getreq['funct']);
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid, writeExif, writeExifStc } = require('.' + getreq['exif']);

//SCRAPE
const { upload } = require('../lib/scrape/uploader.js');

//DATABASE 
var balance = JSON.parse(fs.readFileSync('./database/balance.json'));
var limit = JSON.parse(fs.readFileSync('./database/limit.json'));
var glimit = JSON.parse(fs.readFileSync('./database/glimit.json'));
var premium = JSON.parse(fs.readFileSync('./database/premium.json'));
var pendaftar = JSON.parse(fs.readFileSync('./database/user.json'));
const db_api = JSON.parse(fs.readFileSync('./database/api.json'));
const afk = require("../lib/afk");
let _afk = JSON.parse(fs.readFileSync("./database/afk.json"));

//SETUP
module.exports = async(m, conn, from, store) => { 
   const isGrouP = from.endsWith('@g.us')
   const sender = isGrouP ? (m.key.participant ? m.key.participant : m.participant) : m.key.remoteJid
   const pushname = m.pushName || "No Name"
   const CMD = (m.xtype === 'conversation' && m.message.conversation) ? m.message.conversation : (m.xtype == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption : (m.xtype == 'videoMessage') && m.message.videoMessage.caption ? m.message.videoMessage.caption : (m.xtype == 'extendedTextMessage') && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text : (m.xtype == 'buttonsResponseMessage') && m.message.buttonsResponseMessage.selectedButtonId ? m.message.buttonsResponseMessage.selectedButtonId : (m.xtype == 'listResponseMessage') && m.message.listResponseMessage.singleSelectReply.selectedRowId? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.xtype == 'templateButtonReplyMessage') && m.message.templateButtonReplyMessage.selectedId ? m.message.templateButtonReplyMessage.selectedId : ''.slice(1).trim().split(/ +/).shift().toLowerCase()
   const prefix = /^[#!.,®©¥€¢£/\∆✓]/.test(CMD) ? CMD.match(/^[#!.,®©¥€¢£/\∆✓]/gi) : '#'   
	 global.prefix = prefix
   const chatmessage = (m.xtype === 'conversation' && m.message.conversation) ? m.message.conversation : (m.xtype == 'imageMessage') ? m.message.imageMessage.caption : (m.xtype == 'videoMessage') ? m.message.videoMessage.caption : (m.xtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.xtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.xtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.xtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.xtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
   const ordermessage = (m.xtype === 'conversation' && m.message.conversation) ? m.message.conversation : (m.xtype == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption : (m.xtype == 'videoMessage') && m.message.videoMessage.caption ? m.message.videoMessage.caption : (m.xtype == 'extendedTextMessage') && m.message.extendedTextMessage.text.startsWith(prefix) ? m.message.extendedTextMessage.text : (m.xtype == 'buttonsResponseMessage') && m.message.buttonsResponseMessage.selectedButtonId.startsWith(prefix) ? m.message.buttonsResponseMessage.selectedButtonId : (m.xtype == 'listResponseMessage') && m.message.listResponseMessage.singleSelectReply.selectedRowId.startsWith(prefix) ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.xtype == 'templateButtonReplyMessage') && m.message.templateButtonReplyMessage.selectedId.startsWith(prefix) ? m.message.templateButtonReplyMessage.selectedId : ''   
   const chats = (m.xtype === 'conversation' && m.message.conversation) ? m.message.conversation : (m.xtype == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption : (m.xtype == 'documentMessage') && m.message.documentMessage.caption ? m.message.documentMessage.caption : (m.xtype == 'videoMessage') && m.message.videoMessage.caption ? m.message.videoMessage.caption : (m.xtype == 'extendedTextMessage') && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text : (m.xtype == 'buttonsResponseMessage' && m.message.buttonsResponseMessage.selectedButtonId) ? m.message.buttonsResponseMessage.selectedButtonId : (m.xtype == 'templateButtonReplyMessage') && m.message.templateButtonReplyMessage.selectedId ? m.message.templateButtonReplyMessage.selectedId : ''   	
   const args = ordermessage.trim().split(/ +/).slice(1)         
   const order = ordermessage.slice(0).trim().split(/ +/).shift().toLowerCase()	   
   const isCmd = ordermessage.startsWith(prefix)   
   const command = isCmd ? ordermessage.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ''
   const text = q = args.join(' ')   
   const fatkuns = (m.quoted || m)
   const quoted = (fatkuns.xtyp == 'buttonsMessage') ? fatkuns[Object.keys(fatkuns)[1]] : (fatkuns.xtyp == 'templateMessage') ? fatkuns.hydratedTemplate[Object.keys(fatkuns.hydratedTemplate)[1]] : (fatkuns.xtyp == 'product') ? fatkuns[Object.keys(fatkuns)[0]] : m.quoted ? m.quoted : m   
   const content = JSON.stringify(m.message)
   const orderPlugins = isCmd ? ordermessage.slice(1).trim().split(/ +/).shift().toLowerCase() : null
   const isGroup = from.endsWith(keywords[0]['chats'][1])
   const isChanel = from.endsWith('@newsletter')
   const botNumber = conn.user.id.split(':')[0] + keywords[0]['chats'][0]
   const mime = (quoted.m || quoted).mimetype || '' 
   const isMedia = /image|video|sticker|audio/.test(mime)
   const itulho = isGroup ? (m.key.participant ? m.key.participant : m.participant) : m.key.remoteJid  
   const isOwner = [botNumber, ...global.ownerNumber].map(jid => jid.replace(/[^0-9]/g, '') + keywords[0]['chats'][0]).includes(itulho)
   const groupMetdata = isGroup ? await conn.groupMetadata(from) : ''
         conn.groupMembers = isGroup ? groupMetdata.participants : ''
         conn.groupName = isGroup ? await groupMetdata.subject : ''   
         conn.groupAdmins = isGroup ? m.getGroupAdmins(conn.groupMembers) : ''
   const isBotGroupAdmins = conn.groupAdmins.includes(botNumber) || false
   const isGroupAdmins = conn.groupAdmins.includes(m.sender)
   const isPremium = isOwner ? true : _prem.checkPremiumUser(sender, premium)
   const gcounti = SETTING.gcount
   const gcount = isPremium ? gcounti.prem : gcounti.user
   const limitCount = SETTING.limitCount
   const isUser = pendaftar.includes(sender)
   const isAfkOn = afk.checkAfkUser(m.sender, _afk)
   _prem.expiredCheck(conn, premium)
   const mentionByTag = m.xtype == "extendedTextMessage" && m.message.extendedTextMessage.contextInfo != null ? m.message.extendedTextMessage.contextInfo.mentionedJid : []
   const mentionByreply = m.xtype == "extendedTextMessage" && m.message.extendedTextMessage.contextInfo != null ? m.message.extendedTextMessage.contextInfo.participant || "" : ""
  const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
mention != undefined ? mention.push(mentionByreply) : []
  const mentionUser = mention != undefined ? mention.filter(n => n) : false
  const today = moment().tz("Asia/Jakarta")
  const day = today.format('dddd');
  const datee = today.format('D');
  const month = today.format('MMMM');
  const year = today.format('YYYY');

//FUNCTION
  const qkontak = { 
    key: {
        fromMe: false, 
        participant: "0@s.whatsapp.net", 
        ...(from ? { remoteJid: "status@broadcast" } : {})
    }, 
    message: { 
        contactMessage: { 
            displayName: `${m.sayingtime + m.timoji}\n☏User: ${pushname}`, 
            vcard: 'BEGIN:VCARD\n' + 'VERSION:3.0\n' + `item1.TEL;waid=${sender.split("@")[0]}:+${sender.split("@")[0]}\n` + 'item1.X-ABLabel:Ponsel\n' + 'END:VCARD' 
        } 
    } 
  }

//CONFIG AFK
if (m.isGroup) {
let mentionUser = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
for (let ment of mentionUser) {
if (afk.checkAfkUser(ment, _afk)) {
let getId2 = afk.getAfkId(ment, _afk)
let getReason2 = afk.getAfkReason(getId2, _afk)
let getTime = Date.now() - afk.getAfkTime(getId2, _afk)
let heheh2 = await readTime(getTime)
m.reply(` *[ ⛔ PERINGATAN ⛔ ]*
 
 📝 *Note :* Jangan tag dia kak, Dia sedang afk
 💡 *Alasan* : ${getReason2}
 🕛 *Selama* : ${heheh2.hours} jam, ${heheh2.minutes} menit, ${heheh2.seconds} detik yg lalu`)
}
}
if (afk.checkAfkUser(m.sender, _afk)) {
let getId = afk.getAfkId(m.sender, _afk)
let getReason = afk.getAfkReason(getId, _afk)
let getTime = Date.now() - afk.getAfkTime(getId, _afk)
let heheh = await readTime(getTime)
_afk.splice(afk.getAfkPosition(m.sender, _afk), 1)
fs.writeFileSync('./database/afk.json', JSON.stringify(_afk))
conn.sendTextWithMentions(m.chat,`*[ 👑 KEMBALI DARI AFK 👑 ]*
 
 👤 *User* : @${m.sender.split('@')[0]}
 💡 *Alasan* : ${getReason}
 🕛 *Selama* : ${heheh.hours} jam, ${heheh.minutes} menit, ${heheh.seconds} detik yg lalu`, m)
}
}

//EVALED & EXEC
if (chatmessage.startsWith('<')) {
    if (!isOwner) return
    if (!q) return m.reply('Masukan Parameter Code!')
    let kode = chatmessage.trim().split(/ +/)[0]
    let teks
    try {
        teks = await eval(`(async () => { ${kode == ">>" ? "return" : ""} ${q}})()`)
    } catch (e) {
        teks = e
    } finally {
        await m.reply(require('util').format(teks))
    }
}
if (chatmessage.startsWith('=>')) {
    if (!isOwner) return
    function Return(sul) {
        sat = JSON.stringify(sul, null, 2)
        bang = util.format(sat)
        if (sat == undefined) {
            bang = util.format(sul)
        }
        return m.reply(bang)
    }
    try {
        m.reply(util.format(eval(`(async () => { ${chatmessage.slice(3)} })()`)))
    } catch (e) {
        m.reply(String(e))
    }
}
if (chatmessage.startsWith('>')) {
    if (!isOwner) return
    try {
        let evaled = await eval(chatmessage.slice(2))
        if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
        await m.reply(evaled)
    } catch (err) {
        m.reply(String(err))
    }
}
if (chatmessage.startsWith('$')) {
    if (!isOwner) return
    exec(chatmessage.slice(2), (err, stdout) => {
        if(err) return conn.sendMessage(from, {text :String(err)}, {quoted:m})
        if (stdout) return m.reply(stdout)
    })
}

//AUTO REGISTER
if (m.message && m.text && !isUser && !isGroup) {
    pendaftar.push(sender)
    fs.writeFileSync('./database/user.json', JSON.stringify(pendaftar, null, 2))
}

//ONLYGC
const onlygc = () => {
  conn.sendMessage(m.chat, {
    text: `_ʜᴀʟᴏ ${pushname}, *xʙᴏᴛ-ɴᴇxᴛ ᴠᴇʀꜱɪᴏɴ* ʜᴀɴʏᴀ ʙɪꜱᴀ ᴅɪɢᴜɴᴀᴋᴀɴ ᴅɪ ᴅᴀʟᴀᴍ ɢʀᴏᴜᴘ ꜱᴀᴊᴀ, ᴊɪᴋᴀ ɪɴɢɪɴ ᴍᴇɴɢɢᴜɴᴀᴋᴀɴɴʏᴀ ᴅɪ ᴘʀɪᴠᴀᴛ ᴄʜᴀᴛ ᴘᴇʀᴛɪᴍʙᴀɴɢᴋᴀɴ ᴜɴᴛᴜᴋ ᴍᴇᴍʙᴇʟɪ ʜᴀᴋ ᴀᴋꜱᴇꜱ ᴘʀᴇᴍɪᴜᴍ ᴀᴛᴀᴜ ᴍᴇᴍʙᴇʟɪ ꜱᴄʀɪᴘᴛ ɴʏᴀ_`,
    contextInfo: {
      externalAdReply: {
        showAdAttribution: true, 
        title: `AKSES DILARANG 🚫`,
        body: "Only In Group Chat",
        thumbnailUrl: "https://endpoint.web.id/server/file/Zy853r7VXWBRHTnM.jpg",
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  })
}

//NYALAKAN INI JIKA INGIN ONLYGC
/*if (order) {
  if (!isOwner && !m.isGroup && !m.isChanel) return onlygc();
}*/

//CMD
if (m.message) {
  if (isCmd && !m.isGroup) {
    console.log(chalk.white(`===================================================
    📆 DATE: ${new Date().toLocaleString()}
    💭 PESAN : ${m.body || m.mtype}
    👤️ DARI : ${pushname}
    🔖 USER JID : ${m.sender}`));
  } else if (isCmd && m.isGroup) {
    console.log(chalk.white(`===================================================
    📆 DATE: ${new Date().toLocaleString()}
    💭 PESAN : ${m.body || m.mtype}
    👤 DARI : ${pushname}
    🔖 USER JID : ${m.sender}
    💡 LOKASI : ${conn.groupName}`));
  }
}

//CONFIG ANTILINK
let antilinkStatus = false;
const saveAntilinkStatus = () => {
    fs.writeFileSync('./database/antilink.json', JSON.stringify({ status: antilinkStatus }));
};
const loadAntilinkStatus = () => {
    if (fs.existsSync('./database/antilink.json')) {
        const data = JSON.parse(fs.readFileSync('./database/antilink.json'));
        antilinkStatus = data.status;
    }
};
loadAntilinkStatus();

//COMMAND 
    switch(order) {    
  case prefix + 'menu': case prefix + 'menuall': case prefix + 'allmenu': {    
      conn.sendMessage(m.chat, {
        document: fs.readFileSync('./img.jpg'), 
        fileName: 'ʏᴜʀɪɪ - ᴍᴅ 🌸',
        mimetype: 'image/jpeg',
        caption: 'ʜᴀʟᴏᴏ sᴀʏᴀ ᴀᴅᴀʟᴀʜ ʏᴜʀɪɪ-ᴍᴅ, ꜱᴇʙᴜᴀʜ ʙᴏᴛ ᴡʜᴀᴛꜱᴀᴘᴘ ᴍᴜʟᴛɪᴅᴇᴠɪᴄᴇ ʏᴀɴɢ ᴄᴀɴɢɢɪʜ ᴅᴀɴ ᴍᴏᴅᴇʀɴ, ꜱɪʟᴀʜᴋᴀɴ ᴍᴇʟᴀɴᴊᴜᴛᴋᴀɴ ᴅᴇɴɢᴀɴ ᴍᴇᴍɪʟɪʜ ᴏᴘꜱɪ ᴅɪ ʙᴀᴡᴀʜ ɪɴɪ',
        contextInfo: {
            externalAdReply: {
                title: '𝑩𝒂𝒔𝒆𝒅 𝑶𝒏 𝑬𝒔𝒎 𝑴𝒐𝒅𝒖𝒍𝒆',
                body: time,
                thumbnailUrl: 'https://img1.pixhost.to/images/9296/649396846_lily.jpg',
                mediaType: 1,
                renderLargerThumbnail: false
            }
        },
        footer: '@ ʙᴀsᴇᴅ ʙʏ ғᴀʟʟᴢx',
        buttons: [
            {
                buttonId: ".listmenu",    
                buttonText: { 
                    displayText: 'List Feature' 
                }
            },
            {
                buttonId: ".owner",    
                buttonText: { 
                    displayText: 'Creator' 
                }
            }
        ],
        viewOnce: true,
        headerType: 6,
      }, { quoted: m, ephemeralExpiration: 86400 });
  }
  break
  
  case prefix + 'listmenu': {
    let { menu } = require('../lib/menu.js')
    let menunya = menu(isPremium, time, sender, prefix, pushname);
    conn.sendMessage(m.chat, {
      image: { url: 'https://img1.pixhost.to/images/9296/649396846_lily.jpg' },
      caption: menunya,
      gifPlayback: false,
      footer: '@ ʙᴀsᴇᴅ ʙʏ ғᴀʟʟᴢx'
    }, { quoted: m });
  }
  break
case prefix + 'addcase': {
    if (!isOwner) return m.reply(mess.owner)
    if (!text) return m.reply(`*PERMINTAAN ERROR!! CONTOH :*\n> .addcase case 'test': {\n> m.reply('hello world')\n> }\n> break`)

    const fileName = 'message/msg.js';
    const newCase = `${text}`;

    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) {
            console.error('*ERROR SAAT MEMBACA FILE*', err);
            return;
        }

        const posisiAwal = data.indexOf("case prefix + ['addcase']:");
        if (posisiAwal !== -1) {
            const kodeBaru = data.slice(0, posisiAwal) + '\n' + newCase + '\n' + data.slice(posisiAwal);

            fs.writeFile(fileName, kodeBaru, 'utf8', (err) => {
                if (err) {
                    m.reply('*TERJADI KESALAHAN SAAT MENULIS CASE* :', err);
                } else {
                    m.reply('*CASE SUKSES DITAMBAHKAN*');
                }
            });

        } else {
            m.reply('*CASE ADDCASE TIDAK DITEMUKAN');
        }
    });
}
break;
case prefix + 'sticker': {
    if (!quoted) return m.reply(`Send/Reply Images/Videos/Gifs With Captions ${prefix + command}\nVideo Duration 1-9 Seconds`)

    if (/image/.test(mime)) {
        let media = await quoted.download()
        let encmedia = await conn.sendImageAsSticker(m.chat, media, m, {
            packname: global.packname,
            author: global.author
        })
    } else if (/video/.test(mime)) {
        if ((quoted.msg || quoted).seconds > 11)
            return m.reply(`Send/Reply Images/Videos/Gifs With Captions ${prefix + command}\nVideo Duration 1-9 Seconds`)

        let media = await quoted.download()
        let encmedia = await conn.sendVideoAsSticker(m.chat, media, m, {
            packname: global.packname,
            author: global.author
        })
    } else {
        m.reply(`Send/Reply Images/Videos/Gifs With Captions ${prefix + command}\nVideo Duration 1-9 Seconds`)
    }
}
break
case prefix + 'tiktok': {
    let momok = "`𝗧 𝗜 𝗞 𝗧 𝗢 𝗞 - 𝗗 𝗢 𝗪 𝗡 𝗟 𝗢 𝗔 𝗗`"
    if (!text.startsWith("https://")) return m.reply("url")

    const { tiktokDl } = require('../lib/scrape/scraper1');
    await tiktokDl(q).then(async (result) => {
        await conn.sendMessage(m.chat, { react: { text: '🕖', key: m.key } })

        if (!result.status) return m.reply("Error!")

        if (result.durations == 0 && result.duration == "0 Seconds") {
            let araara = new Array()
            let urutan = 0

            for (let a of result.data) {
                let imgsc = await prepareWAMessageMedia({ image: { url: `${a.url}` } }, { upload: conn.waUploadToServer })
                await araara.push({
                    header: proto.Message.InteractiveMessage.Header.fromObject({
                        title: `Foto Slide Ke *${urutan += 1}*`,
                        hasMediaAttachment: true,
                        ...imgsc
                    }),
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                        buttons: [{
                            "name": "cta_url",
                            "buttonParamsJson": `{\"display_text\":\"Link Tautan Foto\",\"url\":\"${a.url}\",\"merchant_url\":\"https://www.google.com\"}`
                        }]
                    })
                })
            }

            const msgii = await generateWAMessageFromContent(m.chat, {
                viewOnceMessageV2Extension: {
                    message: {
                        messageContextInfo: {
                            deviceListMetadata: {},
                            deviceListMetadataVersion: 2
                        },
                        interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                            body: proto.Message.InteractiveMessage.Body.fromObject({
                                text: "*TIKTOK - DOWNLOADER*"
                            }),
                            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
                                cards: araara
                            })
                        })
                    }
                }
            }, { userJid: m.sender, quoted: m })

            await conn.relayMessage(m.chat, msgii.message, {
                messageId: msgii.key.id
            })

        } else {
            let urlVid = await result.data.find(e => e.type == "nowatermark_hd" || e.type == "nowatermark")

            await conn.sendMessage(m.chat, {
                video: { url: urlVid.url },
                caption: momok,
                footer: `\n${global.botname}`,
                buttons: [
                    {
                        buttonId: `.ttaudio ${text}`,
                        buttonText: {
                            displayText: "sᴏᴜɴᴅ 🔊"
                        }
                    },
                ],
                viewOnce: true,
            }, {
                quoted: m
            });
        }

    }).catch(e => console.log(e))

    await conn.sendMessage(m.chat, { react: { text: '🐬', key: m.key } })
}
break
case prefix + 'twitterdl': {
    if (!q) return m.reply('https://x.com/Indomielovers/status/1917826490068279736')
    m.reply('Tunggu sebentar, sedang memproses...')

    try {
        const axios = require('axios')
        const cheerio = require('cheerio')

        const res = await axios.post('https://twmate.com/', new URLSearchParams({
            page: q,
            ftype: 'all',
            ajax: '1'
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Accept': '*/*',
                'X-Requested-With': 'XMLHttpRequest',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Mobile Safari/537.36',
                'Referer': 'https://twmate.com/',
            }
        })

        const $ = cheerio.load(res.data)
        const videoLinks = []

        $('.btn-dl').each((index, element) => {
            const quality = $(element).parent().prev().text().trim()
            const downloadUrl = $(element).attr('href')
            if (downloadUrl.includes('.mp4')) {
                videoLinks.push({ quality, downloadUrl })
            }
        })

        if (videoLinks.length === 0) return m.reply('Gagal mengambil video. Pastikan URL benar dan video publik.')

        const best = videoLinks[0]
        let caption = `*Download Twitter/X*\n\n`
        caption += `*Quality:* ${best.quality}\n`
        caption += `*Source:* ${q}\n\n`
        caption += `*Link Alternatif:*\n`

        videoLinks.forEach((v, i) => {
            caption += `${i + 1}. ${v.quality}: ${v.downloadUrl}\n`
        })

        await conn.sendMessage(m.chat, {
            video: { url: best.downloadUrl },
            caption: caption.trim()
        }, { quoted: m })

    } catch (e) {
        console.error(e)
        m.reply('Terjadi kesalahan saat memproses video.')
    }
}
break

  default:
 }

if (antilinkStatus) {
let gc = `https://`
if (chatmessage.includes(gc)) {
    m.reply('*sebuah link terdeteksi maaf kamu harus di kick ⛔*');
    let gclink = (`https://chat.whatsapp.com/` + await conn.groupInviteCode(m.chat))
    let isLinkThisGc = new RegExp(gclink, 'i')
    let isgclink = isLinkThisGc.test(m.text)
    if (isgclink) return m.reply(`Ohh, Link Group Ini Ternyata`)
    if (!isBotGroupAdmins) return m.reply(`Duhh bot bukan admin`)
    if (isGroupAdmins) return m.reply(`Ternyata kamu admin, maaf min`)
    if (isOwner) return m.reply(`Ternyata kamu owner, maaf king`)
    conn.sendMessage(m.chat, {
               delete: {
                  remoteJid: m.chat,
                  fromMe: false,
                  id: m.key.id,
                  participant: m.key.participant
               }
            })
    conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
}
}

}

let file = require.resolve(__filename)
 fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log('===================================================');
	console.log(chalk.red(`    New ${__filename}`))
	delete require.cache[file]
	require(file)
})