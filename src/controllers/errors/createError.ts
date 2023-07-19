export default async function createError(database: D1Database, error: string, data: string, service: string, environment: string, payload: string) {
    const id = crypto.randomUUID();
    const timestamp = Date.now();

    await database.prepare("INSERT INTO errors (id, error, data, service, environment, payload, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(id, error, data, service, environment, payload, timestamp).run();
};
