import * as fs from "fs";

export function writeToFile(filePath: string, textLines: Array<string>): void {
    fs.writeFileSync(filePath, textLines.join("\n"));
}

export function readFileAsJson(filePath: string): any {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
}