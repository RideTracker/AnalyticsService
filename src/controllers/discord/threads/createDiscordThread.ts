import { DiscordThreadResponse } from "../../../models/DiscordThreadResponse";

export default async function createDiscordThread(token: string, channelId: string, messageId: string, name: string, inactivity: 60 | 1440 | 4320 | 10080) {
    const response = await fetch(`https://discord.com/api/v9/channels/${channelId}/messages/${messageId}/threads`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bot ${token}`
        },
        body: JSON.stringify({
            name,
            auto_archive_duration: inactivity
        })
    });

    return await response.json<DiscordThreadResponse>();
};
