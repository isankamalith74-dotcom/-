const { cmd } = require("./command"); // කෙලින්ම පිටත ඇති command.js ලෝඩ් කිරීම
const axios = require("axios");

cmd({
    pattern: "song",
    alias: ["ytmp3", "play"],
    desc: "Download YouTube Audio/Songs.",
    category: "download",
    react: "🎵",
    filename: __filename
}, async (conn, mek, m, { from, quoted, args, q, reply }) => {
    try {
        if (!q) return reply("ℹ️ කරුණාකර සින්දුවේ නම හෝ YouTube ලින්ක් එකක් ලබා දෙන්න.\n\n*Example:* .song alone");

        await reply("⏳ *Searching and processing your request... Please wait!*");

        const apiUrl = `https://api.dreaded.site/api/ytdl/video?url=${encodeURIComponent(q)}`;
        const response = await axios.get(apiUrl);
        
        if (!response.data || response.data.status !== 200 || !response.data.result) {
            return reply("❌ කනගාටුයි, සින්දුව සොයා ගැනීමට නොහැකි වුණා. නැවත උත්සාහ කරන්න.");
        }

        const videoData = response.data.result;
        const title = videoData.title || "YouTube Audio";
        const author = videoData.author || "Unknown Artist";
        const duration = videoData.duration || "Unknown";
        const views = videoData.views || "Unknown";
        const audioUrl = videoData.download?.audio;
        const thumbnailUrl = videoData.thumbnail;

        if (!audioUrl) {
            return reply("❌ බාගත කිරීමේ ලින්ක් එක ලබා ගැනීමට නොහැකි වුණා.");
        }

        const responseDetails = `
🎵 *QUEEN-NELUMI-MD SONG PLAYER* 🎵

📝 *Title:* ${title}
🎤 *Artist:* ${author}
⏳ *Duration:* ${duration}
👁️ *Views:* ${views}

*Powered by QUEEN-NELUMI-MD* 💗
        `.trim();

        if (thumbnailUrl) {
            await conn.sendMessage(from, { 
                image: { url: thumbnailUrl }, 
                caption: responseDetails 
            }, { quoted: mek });
        } else {
            await reply(responseDetails);
        }

        await conn.sendMessage(from, {
            audio: { url: audioUrl },
            mimetype: "audio/mpeg",
            ptt: false,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                externalAdReply: {
                    title: title,
                    body: `Artist: ${author} | Duration: ${duration}`,
                    mediaType: 1,
                    thumbnailUrl: thumbnailUrl || "https://i.ibb.co/6RPYc2rF/4681.jpg",
                    sourceUrl: q.startsWith("http") ? q : "https://youtube.com",
                    showAdAttribution: true
                }
            }
        }, { quoted: mek });

    } catch (error) {
        console.error("Error in song command: ", error);
        return reply(`❌ ප්ලගින් එකේ දෝෂයක් සිදුවුණා:\n${error.message}`);
    }
});
