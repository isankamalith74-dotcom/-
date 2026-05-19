const { cmd } = require("./command");
const axios = require("axios");

// ලෝකයේ තියෙන පුදුම හිතෙන කරුණු (Facts) ලිස්ට් එකක්
const facts = [
    "තාරකා විද්‍යාඥයින්ට අනුව, අභ්‍යවකාශයේ ඇති තරු ගණන පෘථිවියේ ඇති සියලුම වැලි කැට ගණනට වඩා වැඩිය. ✨",
    "ඩොල්ෆින් සතුන් නිදාගන්නා විට ඔවුන්ගේ එක ඇසක් සම්පූර්ණයෙන්ම විවෘතව තබාගෙන නිදාගනියි. 🐬",
    "මී පැණි (Honey) කියන්නේ කවදාවත් නරක් නොවන එකම ස්වාභාවික ආහාරයයි. අවුරුදු 3000ක් පැරණි පිරමිඩ වල තිබූ මී පැණි පවා තවමත් ආහාරයට ගත හැක. 🍯",
    "අයිෆල් කුළුණ (Eiffel Tower) ගිම්හාන කාලයේදී රත් වීම නිසා එහි උස සෙන්ටිමීටර 15කින් පමණ වැඩිවේ. 🗼",
    "බූවල්ලෙකුට (Octopus) හෘද වස්තු (Hearts) 3ක් සහ නිල් පාට ලේ පවතියි. 🐙",
    "ලොව ප්‍රථම පරිගණක මවුසය (Mouse) නිපදවා ඇත්තේ ලී වලින් (Wood). 🪵",
    "කෙසෙල් ගෙඩි කියන්නේ ස්වාභාවිකවම මිනිසාගේ සිත සතුටු කරන රසායනික ද්‍රව්‍ය අඩංගු පලතුරකි. 🍌"
];

// වටිනා කියමන් (Quotes) ලිස්ට් එකක්
const quotes = [
    "\"ඔබට ලැබෙන ජයග්‍රහණ වලට වඩා, ඔබ වැටුණු හැම වෙලාවකම නැගිටපු වාර ගණන ගැන ආඩම්බර වන්න.\" - නෙල්සන් මැන්ඩෙලා 🌟",
    "\"අනාගතය අයිති වෙන්නේ තමන්ගේ හීන ගැන විශ්වාසයක් තියෙන අයට විතරයි.\" - එලිනෝර් රූස්වෙල්ට් ✨",
    "\"කළ නොහැකි දෙයක් කියා කිසිවක් නැත. 'Impossible' යන වචනයේම 'I'm possible' කියා ඇත.\" - ඕඩ්රි හෙප්බර්න් 🎯",
    "\"සාර්ථකත්වය කරා යන රහස නම්, කතා කිරීම නවත්වා ක්‍රියාවෙන් පටන් ගැනීමයි.\" - වෝල්ට් ඩිස්නි 🚀"
];

// 1. FACT COMMAND
cmd({
    pattern: "fact",
    alias: ["truth", "info-fact"],
    desc: "Get a mind-blowing random fact.",
    category: "fun",
    react: "🧠",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const randomFact = facts[Math.floor(Math.random() * facts.length)];
        const factMessage = `
💡 *𝐐𝐔𝐄𝐄𝐍 𝐑𝐎𝐒𝐈 𝐁𝐎𝐓 𝐅𝐀𝐂𝐓* 💡

${randomFact}

> ᴘᴀᴡᴇʀᴇᴅ ʙʏ ᴍᴀʟɪʏᴀ 👨‍💻
        `.trim();

        await conn.sendMessage(from, { text: factMessage }, { quoted: mek });
    } catch (e) {
        reply("❌ කරුණක් ලබාගැනීමේදී දෝෂයක් සිදුවුණා.");
    }
});

// 2. QUOTE COMMAND
cmd({
    pattern: "quote",
    alias: ["qotd", "motivation"],
    desc: "Get an inspiring life quote.",
    category: "fun",
    react: "🎯",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        const quoteMessage = `
✨ *𝐐𝐔𝐄𝐄𝐍 𝐑𝐎𝐒𝐈 𝐁𝐎𝐓 𝐐𝐔𝐎𝐓𝐄* ✨

${randomQuote}

> ᴘᴀᴡᴇʀᴇᴅ ʙʏ ᴍᴀʟɪʏᴀ 👨‍💻
        `.trim();

        await conn.sendMessage(from, { text: quoteMessage }, { quoted: mek });
    } catch (e) {
        reply("❌ කියමනක් ලබාගැනීමේදී දෝෂයක් සිදුවුණා.");
    }
});
