import { DiscordThreadResponse } from "../../../models/DiscordThreadResponse";

export default async function createDiscordThread(token: string, channelId: string, messageId: string, name: string) {
    const response = await fetch(`https://discord.com/api/v9/channels/${channelId}/messages/${messageId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bot ${token}`
        },
        body: JSON.stringify({
            name
        })
    });

    return await response.json<DiscordThreadResponse>();
};
