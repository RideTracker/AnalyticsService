import { ThrowableRouter, withContent } from "itty-router-extras";
import withAuth from "../middlewares/withAuth";
import handleCreateErrorRequest from "../routes/errors/create";

export default function createRouter() {
    const router = ThrowableRouter();

    router.post("/api/error", withAuth, withContent, handleCreateErrorRequest);

    return router;
};
