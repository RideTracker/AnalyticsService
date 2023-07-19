export default async function addDiscordThreadMember(token: string, channelId: string, userId: string) {
    await fetch(`https://discord.com/api/v9/channels/${channelId}/thread-members/${userId}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bot ${token}`
        }
    });
};
