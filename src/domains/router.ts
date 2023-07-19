import { ThrowableRouter, withContent } from "itty-router-extras";
import withAuth from "../middlewares/withAuth";
import handleCreateErrorRequest from "../routes/errors/create";

export default function createRouter() {
    const router = ThrowableRouter();

    router.options("*", (request: any) => Response.json({ success: true }));

    router.get("/api/ping", withContent, async (request: Request, env: Env) => {
        return Response.json({
            success: true,
            ping: "pong"
        });
    });

    router.post("/api/error", withAuth, withContent, handleCreateErrorRequest);

    return router;
};
