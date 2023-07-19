export default async function setAlarmThreadId(database: D1Database, alarmId: string, threadId: string) {
    await database.prepare("UPDATE alarms SET thread_id = ? WHERE id = ?").bind(threadId, alarmId).run();
};
