import { errors } from "../..";
import createAlarm from "../../controllers/alarms/createAlarm";
import getAlarm from "../../controllers/alarms/getAlarm";
import getAlarms from "../../controllers/alarms/getAlarms";
import setAlarmEnded from "../../controllers/alarms/setAlarmEnded";
import setAlarmThreadId from "../../controllers/alarms/setAlarmThreadId";
import createDiscordMessage from "../../controllers/discord/messages/createDiscordMessage";
import addDiscordThreadMember from "../../controllers/discord/threads/addDiscordThreadMember";
import createDiscordThread from "../../controllers/discord/threads/createDiscordThread";
import getDiscordToken from "../../controllers/discord/tokens/getDiscordToken";
import createError from "../../controllers/errors/createError";
import getErrors from "../../controllers/errors/getErrors";
import getFormattedEnvironment from "../../controllers/getFormattedEnvironment";
import getFormattedError from "../../controllers/getFormattedError";
import getFormattedPayload from "../../controllers/getFormattedPayload";

export const createErrorSchema = {
    content: {
        error: {
            type: "string",
            required: true
        },

        data: {
            type: "string",
            required: true
        },

        service: {
            type: "string",
            required: true
        },

        environment: {
            type: "string",
            required: true
        },

        payload: {
            type: "string",
            required: true
        }
    }
};

export default async function handleCreateErrorRequest(request: RequestWithKey, env: Env, context: ExecutionContext): Promise<Response> {
    const { error, data, service, environment, payload } = request.content;

    const errorId = await createError(env.DATABASE, error, data, service, environment, payload);

    context.waitUntil(Promise.all(errors.filter((item) => item.name === error).map(async (item) => {
        const timestamp = Date.now() - item.duration;

        const alarms = await getErrors(env.DATABASE, error, data, service, environment, timestamp);

        if(alarms.length < item.count)
            return;

        const existingAlarm = await getAlarm(env.DATABASE, error, data, service, environment, timestamp);

        //const token = await getDiscordToken(env);

        if(!existingAlarm) {
            const alarm = await createAlarm(env.DATABASE, error, data, service, environment);

            const message = await createDiscordMessage(env.DISCORD_BOT_CLIENT_TOKEN, env.DISCORD_CHANNEL_ID, {
                embeds: [
                    {
                        title: `Alarm ${alarm.id}`,
                        url: `https://${(env.ENVIRONMENT === "staging")?("staging."):("")}analytics.ridetracker.app/alarms/${alarm.id}`,
                        description: `## ${getFormattedError(item.name)} Alarm\n` + alarm.data,
                        type: "rich",
                        color: 15105570,
                        footer: {
                            text: `${service} • ${getFormattedEnvironment(environment)} Environment`,
                            icon_url: "https://ridetracker.app/logo192.png"
                        },
                        timestamp: new Date(alarm.started).toISOString()
                    }
                ]
            });

            console.log({ message });

            const thread = await createDiscordThread(env.DISCORD_BOT_CLIENT_TOKEN, message.channel_id, message.id, `Alarm ${alarm.id}`, 60);
            
            console.log({ thread });

            await setAlarmThreadId(env.DATABASE, alarm.id, thread.id);

            await addDiscordThreadMember(env.DISCORD_BOT_CLIENT_TOKEN, thread.id, env.DISCORD_USER_ID);

            await createDiscordMessage(env.DISCORD_BOT_CLIENT_TOKEN, thread.id, {
                embeds: [
                    {
                        title: `Error ${errorId}`,
                        url: `https://${(env.ENVIRONMENT === "staging")?("staging."):("")}analytics.ridetracker.app/alarms/${alarm.id}/errors/${errorId}`,
                        description: `## ${getFormattedError(item.name)} Payload\n` + "```json\n" + getFormattedPayload(payload) + "\n```",
                        type: "rich",
                        color: 10038562,
                        footer: {
                            text: `${service} • ${getFormattedEnvironment(environment)} Environment`,
                            icon_url: "https://ridetracker.app/logo192.png"
                        },
                        timestamp: new Date().toISOString()
                    }
                ]
            });
        }
        else {
            await setAlarmEnded(env.DATABASE, existingAlarm.id, Date.now());

            await createDiscordMessage(env.DISCORD_BOT_CLIENT_TOKEN, existingAlarm.threadId, {
                embeds: [
                    {
                        title: `Error ${errorId}`,
                        url: `https://${(env.ENVIRONMENT === "staging")?("staging."):("")}analytics.ridetracker.app/alarms/${existingAlarm.id}/errors/${errorId}`,
                        description: `## ${getFormattedError(item.name)} Payload\n` + "```json\n" + getFormattedPayload(payload) + "\n```",
                        type: "rich",
                        color: 10038562,
                        footer: {
                            text: `${service} • ${getFormattedEnvironment(environment)} Environment`,
                            icon_url: "https://ridetracker.app/logo192.png"
                        },
                        timestamp: new Date().toISOString()
                    }
                ]
            });
        }
        
    })));

    return Response.json({ success: true });
};
