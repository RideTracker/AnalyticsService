export default function getFormattedPayload(payload: string) {
    try {
        return JSON.stringify(JSON.parse(payload), undefined, 4);
    }
    catch {
        return payload;
    }
};
