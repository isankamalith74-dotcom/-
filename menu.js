const { cmd } = require("./command"); // කමාන්ඩ් ලියාපදිංචි කරන ෆයිල් එක ලෝඩ් කිරීම
const moment = require("moment");

cmd({
    pattern: "menu",
    alias: ["help", "list", "panel"],
    desc: "Get the main professional command menu.",
    category: "main",
    react: "📜",
    filename: __filename
}, async (client, mek, m, { from, pushname, reply, prefix }) => {
    try {
        // වර්තමාන දිනය සහ වේලාව ලබා ගැනීම
        const currentTime = moment().format("HH:mm:ss");
        const currentDate = moment().format("YYYY-MM-DD");

        // ඉතාමත් ආකර්ෂණීය සහ පිරිසිදු මෙනු පැනලය
        const menuTemplate = `
╭─── 〔 *𝐐𝐔𝐄𝐄𝐍 𝐑𝐎𝐒𝐈 𝐁𝐎𝐓* 〕 ───⤳
│
│ 👑 *Owner:* MALITYA
│ 👤 *User:* ${pushname || "User"}
│ 🕒 *Time:* ${currentTime}
│ 📅 *Date:* ${currentDate}
│ 🕹️ *Prefix:* [ ${prefix || "."} ]
│
╰───────────────────────────⤳

╭─── 〔 *📥 DOWNLOAD CMD* 〕 ───⤳
│
│ 🎵 *${prefix}song* <name/link>
│    _Download high-quality MP3 audio_
│
╰───────────────────────────⤳

╭─── 〔 *🎭 CONVERT CMD* 〕 ───⤳
│
│ 🖼️ *${prefix}sticker* <reply image>
│    _Convert images/videos to sticker_
│
╰───────────────────────────⤳

╭─── 〔 *🔍 UTILITY & INFO* 〕 ───⤳
│
│ 🪄 *${prefix}alive*
│    _Check bot status and uptime_
│ 🌦️ *${prefix}weather* <city>
│    _Get real-time weather reports_
│ 🆔 *${prefix}jid*
│    _Get current chat or group JID_
│
╰───────────────────────────⤳

╭─── 〔 *🧠 FUN & AI CMD* 〕 ───⤳
│
│ 💡 *${prefix}fact*
│    _Get mind-blowing random facts_
│ ✨ *${prefix}quote*
│    _Get inspiring life quotes_
│
╰───────────────────────────⤳

*ᴘᴀᴡᴇʀᴇᴅ ʙʏ ᴍᴀʟɪʏᴀ 👨‍💻*
        `.trim();

        const defaultThumb = "https://i.ibb.co/6RPYc2rF/4681.jpg"; // ඔයාගේ බොට්ගේ ප්‍රධාන Image Link එක

        // කිසිදු චැනල් මැසේජ් එකක් (Newsletter label) නැතිව සාමාන්‍ය Image Caption එකක් ලෙස යැවීම
        await client.sendMessage(from, {
            image: { url: defaultThumb },
            caption: menuTemplate
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in menu command: ", e);
        reply("❌ මෙනු පැනලය ලබාදීමේදී දෝෂයක් සිදුවුණා.");
    }
});
