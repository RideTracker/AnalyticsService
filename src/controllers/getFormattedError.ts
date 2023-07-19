export default function getFormattedError(error: string) {
    return error.toLowerCase().split('_').map((word) => word[0].toUpperCase() + word.substring(1)).join(' ');
};
