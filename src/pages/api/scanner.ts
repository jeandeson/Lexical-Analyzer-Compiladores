import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import TextScanner from "./TextScanner";
import delimiters from "../../language/delimiters";
import operators from "../../language/operators";
import reserveds from "../../language/reserved";

export interface LexicalData {
    token: string;
    pattern: string[];
    lexeme: string;
    description: string;
    position: number;
    line: string;
    collumn: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const dirRelativeToPublicFolder = "files";
    const file = path.resolve("./public", dirRelativeToPublicFolder, "input.txt");
    const textScanner = new TextScanner(reserveds, operators, delimiters);
    try {
        fs.writeFileSync(path.resolve("./public", dirRelativeToPublicFolder, "input.txt"), req.body, {
            encoding: "utf-8",
        });
        const readFile = fs.readFileSync(file, "utf-8");

        const splitedWords = textScanner.handleSplitText(readFile);
        const definiedTokens = textScanner.handleCompareTokens(splitedWords);
        const toWrite = definiedTokens;
        fs.writeFileSync(
            path.resolve("./public", dirRelativeToPublicFolder, "output.txt"),
            JSON.stringify(toWrite, null, 2),
            {
                encoding: "utf-8",
            }
        );
        res.status(200).json({ data: definiedTokens });
    } catch (error) {
        res.status(500).json({ error: error });
    }
}
