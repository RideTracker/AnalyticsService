export default async function getErrors(database: D1Database, error: string, data: string, service: string, environment: string, timestamp: number) {
    return (await database.prepare("SELECT * FROM errors WHERE error = ? AND data = ? AND service = ? AND environment = ? AND ended > ?").bind(error, data, service, environment, timestamp).all<Error>()).results ?? [];
};
