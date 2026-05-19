const { cmd } = require("./command"); // කෙලින්ම root එකේ තියෙන command.js ලෝඩ් කිරීම
const axios = require("axios");

cmd({
    pattern: "weather",
    alias: ["wth", "climate"],
    desc: "Get real-time weather information for any city.",
    category: "info",
    react: "🌦️",
    filename: __filename
}, async (conn, mek, m, { from, quoted, args, q, reply }) => {
    try {
        if (!q) return reply("ℹ️ කරුණාකර නගරයක නම ලබා දෙන්න.\n\n*Example:* .weather Colombo");

        await reply("⏳ *Fetching latest weather insights... Please wait!*");

        // Geocoding API මඟින් නගරය සෙවීම
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(q)}&count=1&language=en&format=json`;
        const geoResponse = await axios.get(geoUrl);

        if (!geoResponse.data.results || geoResponse.data.results.length === 0) {
            return reply("❌ කනගාටුයි, ඔබ ලබා දුන් නගරය සොයා ගැනීමට නොහැකි වුණා. කරුණාකර අක්ෂර වින්‍යාසය (Spelling) පරීක්ෂා කරන්න.");
        }

        const location = geoResponse.data.results[0];
        const cityName = location.name;
        const country = location.country || "Unknown Country";
        const lat = location.latitude;
        const lon = location.longitude;

        // Open-Meteo API මඟින් කාලගුණ දත්ත ලබා ගැනීම
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m&timezone=auto`;
        const weatherResponse = await axios.get(weatherUrl);
        const current = weatherResponse.data.current;

        // Weather Code එක අනුව ලස්සන ඉමෝජි සහ තත්ත්වය වෙන් කර ගැනීම
        const weatherMap = {
            0: { status: "Clear sky", emoji: "☀️" },
            1: { status: "Mainly clear", emoji: "🌤️" },
            2: { status: "Partly cloudy", emoji: "⛅" },
            3: { status: "Overcast", emoji: "☁️" },
            45: { status: "Foggy", emoji: "🌫️" },
            48: { status: "Depositing rime fog", emoji: "🌫️" },
            51: { status: "Light drizzle", emoji: "🌧️" },
            53: { status: "Moderate drizzle", emoji: "🌧️" },
            55: { status: "Dense drizzle", emoji: "🌧️" },
            61: { status: "Slight rain", emoji: "🌦️" },
            63: { status: "Moderate rain", emoji: "🌧️" },
            65: { status: "Heavy rain", emoji: "⛈️" },
            71: { status: "Slight snow fall", emoji: "🌨️" },
            73: { status: "Moderate snow fall", emoji: "🌨️" },
            75: { status: "Heavy snow fall", emoji: "❄️" },
            80: { status: "Slight rain showers", emoji: "🌦️" },
            81: { status: "Moderate rain showers", emoji: "🌧️" },
            82: { status: "Violent rain showers", emoji: "⛈️" },
            95: { status: "Thunderstorm", emoji: "🌩️" },
            96: { status: "Thunderstorm with slight hail", emoji: "⛈️" },
            99: { status: "Thunderstorm with heavy hail", emoji: "⛈️" }
        };

        const condition = weatherMap[current.weather_code] || { status: "Local Weather Condition", emoji: "🌍" };
        const dayStatus = current.is_day ? "Day Time ☀️" : "Night Time 🌙";

        // Professional කාලගුණ වාර්තා පණිවිඩය (Weather Card)
        const weatherCard = `
📊 *𝐐𝐔𝐄𝐄𝐍-𝐍𝐄𝐋𝐔𝐌I-𝐌𝐃 𝐖𝐄𝐀𝐓𝐇𝐄𝐑 𝐒𝐓𝐀𝐓𝐔𝐒* 📊

📍 *Location:* ${cityName}, ${country}
🌍 *Coordinates:* ${lat.toFixed(2)}°, ${lon.toFixed(2)}°
🧭 *Environment:* ${dayStatus}

🌡️ *Temperature:* ${current.temperature_2m}°C
🔥 *Feels Like:* ${current.apparent_temperature}°C
💧 *Humidity:* ${current.relative_humidity_2m}%
💨 *Wind Speed:* ${current.wind_speed_10m} km/h
✨ *Condition:* ${condition.emoji} ${condition.status}

*Powered by QUEEN-NELUMI-MD* 💗
        `.trim();

        const defaultThumb = "https://i.ibb.co/6RPYc2rF/4681.jpg";

        await conn.sendMessage(from, {
            image: { url: defaultThumb },
            caption: weatherCard,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                externalAdReply: {
                    title: `WEATHER REPORT: ${cityName.toUpperCase()}`,
                    body: `Temp: ${current.temperature_2m}°C | Status: ${condition.status}`,
                    mediaType: 1,
                    thumbnailUrl: defaultThumb,
                    sourceUrl: "https://open-meteo.com"
                }
            }
        }, { quoted: mek });

    } catch (error) {
        console.error("Error in weather command: ", error);
        return reply(`❌ කාලගුණ දත්ත ලබා ගැනීමේදී දෝෂයක් සිදුවුණා:\n${error.message}`);
    }
});
