export default async function createError(database: D1Database, error: string, data: string, service: string, environment: string, payload: string) {
    const id = crypto.randomUUID();
    const timestamp = Date.now();

    return await database.prepare("INSERT INTO errors (id, error, data, service, environment, payload, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING *").bind(id, error, data, service, environment, payload, timestamp).first<string>("id");
};
