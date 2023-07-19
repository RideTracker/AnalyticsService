import { DiscordEmbed } from "./DiscordEmbed";
import { DiscordMessageReference } from "./DiscordMessageReference";

export type DiscordMessage = {
    content?: string;
    nonce?: number | string;
    tts?: boolean;
    embeds?: DiscordEmbed[];
    allowed_mentions?: "roles" | "users" | "everyone";
    message_reference?: DiscordMessageReference;
};
