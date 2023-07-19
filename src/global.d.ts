declare global {
    interface Env {
        [key: string]: string | undefined;
        
        DATABASE: D1Database;
        SERVICE_DATABASE: D1Database;
        
        FEATURE_FLAGS: KVNamespace;
        
        ENVIRONMENT: "production" | "staging";
        
        GITHUB_SHA: string | undefined;

        DISCORD_BOT_CLIENT_ID: string;
        DISCORD_BOT_CLIENT_TOKEN: string;
        DISCORD_CHANNEL_ID: string;
        DISCORD_USER_ID: string;
    };

    interface RequestWithKey extends Request {
        [key: string]: any;
        
        key: Required<Token>;
    };
};

export {};
