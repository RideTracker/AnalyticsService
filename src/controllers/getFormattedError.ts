export default function getFormattedError(error: string) {
    return error.toLowerCase().split(' ').map((word) => word[0].toUpperCase() + word.substring(1)).join(' ');
};
