import { DiscordEmbedAuthor } from "./DiscordEmbedAuthor";
import { DiscordEmbedField } from "./DiscordEmbedField";
import { DiscordEmbedFooter } from "./DiscordEmbedFooter";
import { DiscordEmbedImage } from "./DiscordEmbedImage";
import { DiscordEmbedProvider } from "./DiscordEmbedProvider";
import { DiscordEmbedThumbnail } from "./DiscordEmbedThumbnail";
import { DiscordEmbedVideo } from "./DiscordEmbedVideo";

export type DiscordEmbed = {
    title?: string;
    type?: "rich" | "image" | "video" | "gifv" | "article" | "link";
    description?: string;
    url?: string;
    timestamp?: string;
    color?: number;
    footer?: DiscordEmbedFooter;
    image?: DiscordEmbedImage;
    thumbnail?: DiscordEmbedThumbnail;
    video?: DiscordEmbedVideo;
    provider?: DiscordEmbedProvider;
    author?: DiscordEmbedAuthor;
    fields?: DiscordEmbedField[];
};
