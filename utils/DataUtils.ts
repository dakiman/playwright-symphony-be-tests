export function generateRandomIdentifier() {
    return (Math.random() + 1).toString(36).substring(7);
}

export function getDateWithOffsetYears(offset: number) {
    let date = new Date();
    date.setFullYear(date.getFullYear() - offset);
    return date.toLocaleDateString('en-GB');
}

export function addRandomIdentifierToString(str: string) {
    return str + generateRandomIdentifier();
}