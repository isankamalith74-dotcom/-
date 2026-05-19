const { cmd } = require("./command");
const { downloadMediaMessage } = require("./lib/msg");
const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");
const { tmpdir } = require("os");

cmd({
    pattern: "sticker",
    alias: ["s", "stiker"],
    desc: "Convert any image to a beautiful WhatsApp Sticker.",
    category: "convert",
    react: "🎭",
    filename: __filename
}, async (conn, mek, m, { from, quoted, type, reply }) => {
    try {
        // මැසේජ් එක image එකක්ද නැත්නම් image එකකට reply කරපු එකක්ද කියලා බැලීම
        const isImage = type === "imageMessage" || (type === "extendedTextMessage" && quoted && quoted.imageMessage);

        if (!isImage) {
            return reply("ℹ️ කරුණාකර ස්ටිකර් එකක් කිරීමට අවශ්‍ය ඡායාරූපයක් (Image) ලබා දී හෝ ඡායාරූපයකට Reply කර `.sticker` ලෙස ටයිප් කරන්න.");
        }

        await reply("⏳ *Converting your image into a professional sticker... Please wait!*");

        // මීඩියා ෆයිල් එක ඩවුන්ලෝඩ් කරගැනීම
        const targetMessage = type === "extendedTextMessage" ? { message: quoted } : mek;
        const buffer = await downloadMediaMessage(targetMessage);

        if (!buffer) return reply("❌ පින්තූරය බාගත කර ගැනීමට නොහැකි වුණා. නැවත උත්සාහ කරන්න.");

        // තාවකාලික ෆයිල් පාත් සකස් කිරීම
        const tempInput = path.join(tmpdir(), `${Date.now()}.jpg`);
        const tempOutput = path.join(tmpdir(), `${Date.now()}.webp`);

        fs.writeFileSync(tempInput, buffer);

        // FFMPEG මඟින් Image එක WebP (Sticker) format එකට Convert කිරීම
        exec(`ffmpeg -i ${tempInput} -vcodec libwebp -filter_complex "scale='if(gt(a,1),512,-1)':'if(gt(a,1),-1,512)',pad=512:512:(512-iw)/2:(512-ih)/2:color=white@0,format=rgba" -lossless 1 ${tempOutput}`, async (err) => {
            // පරණ ජේපෙග් ෆයිල් එක අයින් කිරීම
            if (fs.existsSync(tempInput)) fs.unlinkSync(tempInput);

            if (err) {
                console.error(err);
                return reply("❌ ස්ටිකර් එක සෑදීමේදී දෝෂයක් සිදුවුණා. (Replit එකේ ffmpeg ඇඩ් කර ඇත්දැයි බලන්න)");
            }

            // සාර්ථකව සෑදූ ස්ටිකර් එක WhatsApp එකට යැවීම
            await conn.sendMessage(from, { 
                sticker: fs.readFileSync(tempOutput),
                contextInfo: {
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363421132465520@newsletter',
                        newsletterName: '𝐐𝐔𝐄𝐄𝐍 𝐍𝐄𝐋𝐔𝐌𝐈 𝐌𝐃 𝐒𝐓𝐈𝐂𝐊𝐄𝐑𝐒 💗',
                        serverMessageId: 101
                    }
                }
            }, { quoted: mek });

            // සාදා නිම වූ පසු තාවකාලික වෙබ්පී ෆයිල් එක මැකීම
            if (fs.existsSync(tempOutput)) fs.unlinkSync(tempOutput);
        });

    } catch (error) {
        console.error("Error in sticker command: ", error);
        return reply(`❌ ප්ලගින් එකේ දෝෂයක් සිදුවුණා:\n${error.message}`);
    }
});
