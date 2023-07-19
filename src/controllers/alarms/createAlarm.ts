import { Alarm } from "../../models/Alarm";

export default async function createAlarm(database: D1Database, error: string, data: string, service: string, environment: string) {
    const id = crypto.randomUUID();
    const timestamp = Date.now();

    return await database.prepare("INSERT INTO alarms (id, error, data, service, environment, started, ended) VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING *").bind(id, error, data, service, environment, timestamp, timestamp).first<Alarm>();
};
