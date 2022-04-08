import fs from "fs";
import path from "path";
export default class FileManager {
    private readonly dirRelativeToPublicFolder: string;
    private readonly filePath: string;
    constructor(dirRelativeToPublicFolder: string, filePath: string) {
        this.dirRelativeToPublicFolder = dirRelativeToPublicFolder;
        this.filePath = filePath;
    }
    writeFile(file: string) {
        fs.writeFileSync(path.resolve("./public", this.dirRelativeToPublicFolder, "input.txt"), file, {
            encoding: "utf-8",
        });
    }

    readFile() {
        const readFile = fs.readFileSync(this.filePath, "utf-8");
        return readFile;
    }
}
