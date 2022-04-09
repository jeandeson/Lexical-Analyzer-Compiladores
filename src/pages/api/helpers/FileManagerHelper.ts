import fs from "fs";
import path from "path";
export default class FileManager {
    writeFile(file: string, fileName: string) {
        fs.writeFileSync(path.resolve("./public", "files", fileName), file, {
            encoding: "utf-8",
        });
    }

    readFile(fileName: string) {
        const readFile = fs.readFileSync(path.resolve("./public", "files", fileName), "utf-8");
        return readFile;
    }
}
