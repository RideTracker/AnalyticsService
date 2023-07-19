import { Alarm } from "../../models/Alarm";

export default async function getAlarm(database: D1Database, error: string, data: string, service: string, environment: string, timestamp: number) {
    return await database.prepare("SELECT thread_id AS threadId, alarms.* FROM alarms WHERE error = ? AND data = ? AND service = ? AND environment = ? AND ended > ?").bind(error, data, service, environment, timestamp).first<Alarm | null>();
};
