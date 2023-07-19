export default async function setAlarmEnded(database: D1Database, alarmId: string, ended: number) {
    await database.prepare("UPDATE alarms SET ended = ? WHERE id = ?").bind(ended, alarmId).run();
};
