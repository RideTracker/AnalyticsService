import createRouter from "./domains/router";
import { ThrowableRouter } from "itty-router-extras";
import { ErrorAlarm } from "./models/ErrorAlarm";

const router: ThrowableRouter = createRouter();

export const errors: ErrorAlarm[] = [
    {
        name: "ACTIVITY_PROCESSING_ERROR",
        type: "COUNT",
        count: 1,                   // 1 error per
        duration: 10 * 60 * 1000,   // 10 minutes
        expires: 60 * 60 * 1000     // expires 60 minutes since last error
    },

    {
        name: "INVALID_USER_AGENT_ERROR",
        type: "COUNT",
        count: 10,
        duration: 15 * 60 * 1000,
        expires: 15 * 60 * 1000
    },

    {
        name: "D1_ERROR",
        type: "COUNT",
        count: 1,
        duration: 15 * 60 * 1000,
        expires: 15 * 60 * 1000
    },

    {
        name: "SERVER_ERROR",
        type: "COUNT",
        count: 1,
        duration: 15 * 60 * 1000,
        expires: 15 * 60 * 1000
    },

    {
        name: "UNKNOWN_ERROR",
        type: "COUNT",
        count: 1,
        duration: 15 * 60 * 1000,
        expires: 15 * 60 * 1000
    }
];

export default {
    async fetch(request: Request, env: Env, context: ExecutionContext) {
        let response = await router.handle(request, env, context);

        if(!response) {
            response = new Response(undefined, {
                status: 404,
                statusText: "File Not Found"
            });
        }

        response.headers.set("Access-Control-Allow-Origin", "*");
        response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
        response.headers.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

        return response;
    }
};

