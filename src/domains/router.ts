import { ThrowableRouter, withContent } from "itty-router-extras";
import handleCreateErrorRequest from "../routes/errors/create";
import { withAuth } from "@ridetracker/authservice/src/middlewares/withAuth";

export default function createRouter() {
    const router = ThrowableRouter();

    router.options("*", (request: any) => Response.json({ success: true }));

    router.get("/api/ping", withContent, async (request: Request, env: Env) => {
        return Response.json({
            success: true,
            ping: "pong"
        });
    });

    router.post("/api/error", withAuth("service", "SERVICE_DATABASE"), withContent, handleCreateErrorRequest);

    return router;
};
