import fs from "fs";
import path from "path";
export default class FileManager {
    private filePath = path.resolve("./public", "files");

    writeFile(file: string, fileName: string) {
        fs.writeFileSync(path.resolve(this.filePath, fileName), file, {
            encoding: "utf-8",
        });
    }

    readFile(fileName: string) {
        const readFile = fs.readFileSync(path.resolve(this.filePath, fileName), "utf-8");
        return readFile;
    }
}
