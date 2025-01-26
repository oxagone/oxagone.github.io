function sendUserInfoViaTelegram() {
    const botToken = "5024137329:AAFZJjnaWq7Om91oyMdxP1mrpafUO2tUgCM"; // Your bot's token
    const chatId = "28764872"; // Your chat ID
    const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    // Collect user information
    const userInfo = {
        screenSize: `${window.screen.width}x${window.screen.height}`,
        browserInfo: navigator.userAgent,
        referrer: document.referrer || "No referrer",
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        ip: "Fetching IP..." // Default placeholder for IP
    };

    // Fetch IP address (synchronously)
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.ipify.org?format=json", false); // false = synchronous request
    try {
        xhr.send(null);
        if (xhr.status === 200) {
            const ipData = JSON.parse(xhr.responseText);
            userInfo.ip = ipData.ip;
        }
    } catch (error) {
        console.error("Failed to fetch IP:", error);
    }

    // Format the message as human-readable text
    const message = `
📱 **User Information**
- **Screen Size**: ${userInfo.screenSize}
- **Browser Info**: ${userInfo.browserInfo}
- **Referrer**: ${userInfo.referrer}
- **Timezone**: ${userInfo.timezone}
- **IP Address**: ${userInfo.ip}
    `.trim();

    // Send user info via Telegram bot
    const telegramXhr = new XMLHttpRequest();
    telegramXhr.open("POST", telegramApiUrl, false); // false = synchronous request
    telegramXhr.setRequestHeader("Content-Type", "application/json");
    const payload = {
        chat_id: chatId,
        text: message,
        parse_mode: "Markdown" // Enables bold and formatting
    };
    try {
        telegramXhr.send(JSON.stringify(payload));
    } catch (error) {
        console.error("Failed to send data to Telegram:", error);
    }
}

// Call the function
sendUserInfoViaTelegram();
