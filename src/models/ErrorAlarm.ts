import { ErrorNames } from "./ErrorNames";

export type ErrorAlarm = {
    name: ErrorNames;
    duration: number;
    expires: number;
    type: "COUNT";
    count: number;
};
