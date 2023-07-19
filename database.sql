DROP TABLE IF EXISTS "alarms";
CREATE TABLE IF NOT EXISTS "alarms" (
    "id" VARCHAR(255) NOT NULL,
    "error" VARCHAR(255) NOT NULL,
    "data" TEXT NOT NULL,
    "service" VARCHAR(255) NOT NULL,
    "environment" VARCHAR(255) NOT NULL,
    "started" BIGINT NOT NULL,
    "ended" BIGINT NOT NULL,
    "thread_id" VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY("id")
);

DROP TABLE IF EXISTS "errors";
CREATE TABLE IF NOT EXISTS "errors" (
    "id" VARCHAR(255) NOT NULL,
    "error" VARCHAR(255) NOT NULL,
    "data" TEXT NOT NULL,
    "service" VARCHAR(255) NOT NULL,
    "environment" VARCHAR(255) NOT NULL,
    "payload" TEXT NOT NULL,
    "timestamp" BIGINT NOT NULL,
    PRIMARY KEY("id")
);
