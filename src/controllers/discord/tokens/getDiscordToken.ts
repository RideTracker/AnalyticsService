export default async function getDiscordToken(env: Env) {
    const authentication = `${env.DISCORD_BOT_CLIENT_ID}:${env.DISCORD_BOT_CLIENT_TOKEN}`;

    const response = await fetch("https://discord.com/api/v9/oauth2/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `Basic ${btoa(authentication)}`
        },
        body: "grant_type=client_credentials"
    });

    const result = await response.json<any>();

    return result.access_token;
};
