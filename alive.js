const { cmd } = require("./command");
const moment = require("moment");

let botStartTime = Date.now(); 
const ALIVE_IMG = "https://i.ibb.co/6RPYc2rF/4681.jpg"; 

cmd({
    pattern: "alive",
    desc: "Check if the bot is active.",
    category: "info",
    react: "🪄",
    filename: __filename
}, async (conn, mek, m, { reply, from }) => {
    try {
        const pushname = m.pushName || "User"; 
        const currentTime = moment().format("HH:mm:ss");
        const currentDate = moment().format("dddd, MMMM Do YYYY");

        const runtimeMilliseconds = Date.now() - botStartTime;
        const runtimeSeconds = Math.floor((runtimeMilliseconds / 1000) % 60);
        const runtimeMinutes = Math.floor((runtimeMilliseconds / (1000 * 60)) % 60);
        const runtimeHours = Math.floor(runtimeMilliseconds / (1000 * 60 * 60));

        // ලස්සන ෆොන්ට් සහ ඉමෝජි සහිත ALIVE MESSAGE එක
        const formattedInfo = `
✨ *𝐐𝐔𝐄𝐄𝐍 𝐑𝐎𝐒𝐈 𝐁𝐎𝐓 𝐒𝐓𝐀𝐓𝐔𝐒* 👑

👋 *Hi:* ${pushname}
🕒 *Time:* ${currentTime}
📅 *Date:* ${currentDate}
⏳ *Uptime:* ${runtimeHours} hours, ${runtimeMinutes} minutes, ${runtimeSeconds} seconds

*I am Alive Now!! 𝐐𝐔𝐄𝐄𝐍 𝐑𝐎𝐒𝐈 𝐁𝐎𝐓 🤭💗 ආහ් පැටියෝ කොහොමද ?🌝*

> ᴘᴀᴡᴇʀᴇᴅ ʙʏ ꜱᴜᴘᴜɴ ᴍᴅ 👨‍💻
        `.trim();

        await conn.sendMessage(from, {
            image: { url: ALIVE_IMG }, 
            caption: formattedInfo,
            contextInfo: { 
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363421132465520@newsletter',
                    newsletterName: '𝐐𝐔𝐄𝐄𝐍 𝐑𝐎𝐒𝐈 𝐁𝐎𝐓 👑✨',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (error) {
        console.error("Error in alive command: ", error);
        return reply(`❌ Error Details:\n${error.message}`);
    }
});
