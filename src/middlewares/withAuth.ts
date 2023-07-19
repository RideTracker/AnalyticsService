import { getTokenByKey } from "../controllers/tokens/getTokenByKey";

export default async function withAuth(request: RequestWithKey, env: Env, context: ExecutionContext) {
    const authorizationHeader = request.headers.get("Authorization");
    
    if(!authorizationHeader)
       return Response.json({ success: false }, { status: 401, statusText: "Unauthorized" });

    const sections = authorizationHeader.split(' ');

    if(sections.length !== 2)
       return Response.json({ success: false }, { status: 401, statusText: "Unauthorized" });

    const type = sections[0];
    const authorization = sections[1];

    switch(type) {
        case "Bearer": {
            const token = await getTokenByKey(env.SERVICE_DATABASE, authorization);

            if(token.user)
                return Response.json({ success: false }, { status: 401, statusText: "Unauthorized" });

            request.key = {
                id: token.id,
                key: token.key,
                user: "",
                email: "",
                timestamp: token.timestamp
            };

            break;
        }

        default:
            return Response.json({ success: false }, { status: 401, statusText: "Unauthorized" });
    }
};
