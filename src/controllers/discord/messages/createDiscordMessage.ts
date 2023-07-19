import { DiscordMessage } from "../../../models/DiscordMessage";
import { DiscordMessageResponse } from "../../../models/DiscordMessageResponse";

export default async function createDiscordMessage(token: string, channelId: string, message: DiscordMessage) {
    const response = await fetch(`https://discord.com/api/v9/channels/${channelId}/messages`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bot ${token}`
        },
        body: JSON.stringify(message)
    });

    return await response.json<DiscordMessageResponse>();
};
