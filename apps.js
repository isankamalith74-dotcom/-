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
console.log('Starting...');
const SETTING = require('./connection/setting');
let getreq = SETTING['file'];
const pino = SETTING['modul']['pino'];
const chalk = SETTING['modul']['chalk'];
const fs = SETTING['modul']['fs'];
const jimp = SETTING['modul']['jimp'];
const path = SETTING['modul']['path'];
let { Boom } = SETTING['modul']['boom'];
const PhoneNumber = SETTING['modul']['phonenumber'];
const NodeCache = SETTING['modul']['nodecache'];
const readline = SETTING['modul']['readline'];
const { move } = require(SETTING['file']['move']);
const { smsg } = require(SETTING['file']['set']);
let { default: makeWASocket, useMultiFileAuthState, jidDecode, DisconnectReason, fetchLatestBaileysVersion, makeInMemoryStore, getContentType, proto, getAggregateVotesInPollMessage } = SETTING['modul']['baileys'];
const { color, bgcolor, ConsoleLog, biocolor } = require(SETTING['file']['color']);
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid, writeExif, writeExifStc } = require(SETTING['file']['exif']);
// Store
const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) });

// Pairing Code
const pairingCode = process.argv.includes("--pairing-code");
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const question = (text) => new Promise((resolve) => rl.question(text, resolve));


const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

function parseMention(text) {
    return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}

try {
    async function operate() {
        let { state, saveCreds } = await useMultiFileAuthState(SETTING.sesionName);
        //let { version } = fetchLatestBaileysVersion();
        const msgRetryCounterCache = new NodeCache();
        const Yurii = makeWASocket({
            logger: pino({ level: 'silent' }),
            printQRInTerminal: !pairingCode,
            version: [2, 3000, 1028111649],
            browser: ['Ubuntu', 'Firefox', '20.0.00'],
            auth: state,
            getMessage: async (key) => {
                if (store) {
                    const m = await store.loadMessage(key.remoteJid, key.id);
                    return m.message || undefined;
                }
                return {
                    conversation: "XBOT-NEXT VERSIONS"
                };
            },
            msgRetryCounterCache
        });
        
        

        // Event Listeners
        Yurii.decodeJid = (jid) => {
            if (!jid) return jid;
            if (/:\d+@/gi.test(jid)) {
                let decode = jidDecode(jid) || {};
                return decode.user && decode.server && decode.user + '@' + decode.server || jid;
            } else return jid;
        };
        
  Yurii.yStyle = (jid, teks, title, body, url, quoted) => { 
    Yurii.sendMessage(jid, { text: teks, 
      contextInfo: { 
        "externalAdReply": { 
            "showAdAttribution": false, 
            "title": title, 
            "body": body,
            "containsAutoReply": true, 
            "mediaType": 1, 
            "thumbnailUrl": url,
            "renderLargeThumbnail": true 
        }
      }}, {quoted: quoted})
  }  
  
  Yurii.replyNtag = (teks) => {
    Yurii.sendMessage(from, { text: teks, mentions: parseMention(teks) }, { quoted: m })
  }
  
Yurii.sendFile = async (from, url, caption, m, men) => {
    let mime = '';
    let res = await axios.head(url)
    mime = res.headers['content-type']
    if (mime.split("/")[1] === "gif") {
        return Yurii.sendMessage(from, { video: await getBuffer(url), caption: caption, gifPlayback: true, mentions: men ? men : []}, {quoted: m})
    }
    let type = mime.split("/")[0]+"Message"
    if(mime.split("/")[0] === "image"){
        return Yurii.sendMessage(from, { image: await getBuffer(url), caption: caption, mentions: men ? men : []}, {quoted: nay1})
    } else if(mime.split("/")[0] === "video"){
        return Yurii.sendMessage(from, { video: await getBuffer(url), caption: caption, mentions: men ? men : []}, {quoted: m})
    } else if(mime.split("/")[0] === "audio"){
        return Yurii.sendMessage(from, { audio: await getBuffer(url), caption: caption, mentions: men ? men : [], mimetype: 'audio/mpeg'}, {quoted: m })
    } else {
        return Yurii.sendMessage(from, { document: await getBuffer(url), mimetype: mime, caption: caption, mentions: men ? men : []}, {quoted: m })
    }
}
        
    Yurii.xStyle = (jid, teks, url, quoted) => {
        Yurii.sendMessage(jid, { text: teks, contextInfo: {
            mentionedJid: [],
            groupMentions: [],
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363300376066743@newsletter',
               newsletterName: "XBOT-PROJECT",
                serverMessageId: -1
            },
            forwardingScore: 256,
            externalAdReply: {
                showAdAttribution: true,
                title: `XBOT-PROJECT`,
                body: `1.6 Version`,
                thumbnailUrl: url,
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }}, { quoted: quoted })
    }

        Yurii.getName = (jid, withoutContact = false) => {
            id = Yurii.decodeJid(jid);
            withoutContact = Yurii.withoutContact || withoutContact;
            let v;
            if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
                v = store.contacts[id] || {};
                if (!(v.name || v.subject)) v = Yurii.groupMetadata(id) || {};
                resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'));
            });
            else v = id === '0@s.whatsapp.net' ? {
                id,
                name: 'WhatsApp'
            } : id === Yurii.decodeJid(Yurii.user.id) ?
                Yurii.user :
                (store.contacts[id] || {});
            return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international');
        };

        Yurii.sendContact = async (jid, kon, quoted = '', opts = {}) => {
            let list = [];
            for (let i of kon) {
                list.push({
                    displayName: await Yurii.getName(i),
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await Yurii.getName(i)}\nFN:${await Yurii.getName(i)}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Ponsel\nitem2.EMAIL;type=INTERNET:"fallzxcoderid@gmail.com"\nitem2.X-ABLabel:Email\nitem3.URL:"https://instagram.com/riyan_ff12"\nitem3.X-ABLabel:Instagram\nitem4.ADR:;;Indonesia;;;;\nitem4.X-ABLabel:Region\nEND:VCARD`
                });
            }

            Yurii.sendMessage(jid, { contacts: { displayName: `${list.length} Kontak`, contacts: list }, ...opts }, { quoted });
        };

        // Pairing
        if (!Yurii.authState.creds.registered) {
            const phoneNumber = await question(`Please type your WhatsApp number : `);
            let code = await Yurii.requestPairingCode(phoneNumber);
            console.log(`Your Pairing Code : ${code}`);
        }

        Yurii.ev.on('connection.update', async (update) => {
            let { Connecting } = require("./connection/systemConnext.js");
            Connecting({ update, Yurii, Boom, DisconnectReason, sleep, operate });
            await Yurii.newsletterFollow('120363186130999681@newsletter'); // Jangan Dihapus, nanti error
            await Yurii.newsletterFollow('120363314571321104@newsletter'); // Jangan Dihapus, nanti error
            
        });

        // Save Session
        Yurii.ev.on('creds.update', saveCreds);
        store.bind(Yurii.ev);

        Yurii.ev.on('messages.upsert', async ({ messages }) => {
            const m = messages[0];
            if (!m.message) return;
            if (m.key.remoteJid === 'status@broadcast' && SETTING['autoreadsw'] == true) {
                setTimeout(() => {
                    Yurii.readMessages([m.key]);
                    let typ = getContentType(m.message);
                    console.log((/protocolMessage/i.test(typ)) ? `${m.key.participant.split('@')[0]} Deleted story❗` : 'View user stories : ' + m.key.participant.split('@')[0]);
                }, 500);
            }
            const from = m.key.remoteJid;
            const type = getContentType(m.message);
            const textMessage = (type === 'conversation') ? m.message.conversation : (type === 'extendedTextMessage') ? m.message.extendedTextMessage.text : '';
            move(Yurii, m, store);
            smsg(Yurii, m, store);
            require('./message/msg.js')(m, Yurii, from, store);
        });

        // Respon Polling
        async function getMessage(key) {
            if (store) {
                const m = await store.loadMessage(key.remoteJid, key.id);
                return m?.message;
            }
            return {
                conversation: "Hai Im fallzxcoderid"
            };
        }

        Yurii.ev.on('messages.update', async chatUpdate => {
            for (const { key, update } of chatUpdate) {
                if (update.pollUpdates && key.fromMe) {
                    const pollCreation = await getMessage(key);
                    if (pollCreation) {
                        const pollUpdate = await getAggregateVotesInPollMessage({
                            message: pollCreation,
                            pollUpdates: update.pollUpdates,
                        });
                        var toCmd = pollUpdate.filter(v => v.voters.length !== 0)[0]?.name;
                        if (toCmd == undefined) return;
                        var prefCmd = prefix + toCmd;
                        Yurii.appenTextMessage(prefCmd, chatUpdate);
                    }
                }
            }
        });

        Yurii.sendPoll = (jid, name = '', values = [], selectableCount = 1) => { return Yurii.sendMessage(jid, { poll: { name, values, selectableCount } }) };

        // Send Text
        Yurii.sendText = (jid, text, quoted = "", options) =>
            Yurii.sendMessage(jid, { text: text, ...options }, { quoted });
        Yurii.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
            let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await fetch(path)).buffer() : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0);
            let buffer;
            if (options && (options.packname || options.author)) {
                buffer = await writeExifImg(buff, options);
            } else {
                buffer = await imageToWebp(buff);
            }
            await Yurii.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted });
            return buffer;
        };
    }

    operate();
} catch (e) { console.log(chalk.red(e)); }

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(chalk.yellow(`New ${__filename}`));
    delete require.cache[file];
    require(file);
});
process.on('uncaughtException', console.error);
