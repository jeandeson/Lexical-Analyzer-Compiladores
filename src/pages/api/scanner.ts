import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import TokenDataService from "./services/TokenDataService";
import delimiters from "../../language/delimiters";
import operators from "../../language/operators";
import reserveds from "../../language/reserveds";
import FileManagerHelper from "./helpers/FileManagerHelper";

export interface LexicalData {
    token: string;
    pattern: string[];
    lexeme: string;
    description: string;
    position: number;
    line: string;
    collumn: string;
}

const dirRelativeToPublicFolder = "files";
const filePath = path.resolve("./public", dirRelativeToPublicFolder, "input.txt");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const tokenDataService = new TokenDataService(reserveds, operators, delimiters);
    const fileManagerHelper = new FileManagerHelper(dirRelativeToPublicFolder, filePath);
    try {
        fileManagerHelper.writeFile(req.body);
        const readFile = fileManagerHelper.readFile();
        const splitedWords = tokenDataService.splitText(readFile);
        const definiedTokens = tokenDataService.generateTokenData(splitedWords);
        const toWrite = definiedTokens;
        fileManagerHelper.writeFile(JSON.stringify(toWrite, null, 2));
        res.status(200).json({ data: definiedTokens });
    } catch (error) {
        res.status(500).json({ error: error });
    }
}
