import { LexicalData } from "../scanner";
import TokenData from "../models/TokenData";
class TokeDataService {
    private readonly reserveds;
    private readonly operators;
    private readonly delimiters;
    constructor(reserveds: string[], operators: string[], delimiters: string[]) {
        this.reserveds = reserveds;
        this.operators = operators;
        this.delimiters = delimiters;
    }

    private findToken(word: string, array: string[]) {
        const result = array.find((item) => item === word);
        if (result != undefined) {
            return true;
        }
        return false;
    }

    private compareTokenChar(line: string, word: string, words: string[], linePosition: number, splitedLines: string[][]) {
        for (let lineCollumn = 0; lineCollumn <= line.length; lineCollumn++) {
            const character = line.charAt(lineCollumn);
            const nextCharacter = line.charAt(lineCollumn + 1);
            word += character;
            if (nextCharacter === " ") {
                words.push(`${word}:${linePosition}:${lineCollumn}`);
                lineCollumn += 1;
                words.push(`${nextCharacter}:${linePosition}:${lineCollumn}`);
                word = "";
            } else if (this.findToken(character, this.delimiters)) {
                words.push(`${word}:${linePosition}:${lineCollumn}`);
                word = "";
            } else if (this.findToken(nextCharacter, this.operators)) {
                words.push(`${word}:${linePosition}:${lineCollumn}`);
                lineCollumn += 1;
                words.push(`${nextCharacter}:${linePosition}:${lineCollumn}`);
                word = "";
            } else if (this.findToken(nextCharacter, this.delimiters)) {
                words.push(`${word}:${linePosition}:${lineCollumn}`);
                lineCollumn += 1;
                words.push(`${nextCharacter}:${linePosition}:${lineCollumn}`);
                word = "";
            }
        }
        splitedLines.push(words);
        return splitedLines;
    }

    public splitText(readFile: string) {
        const splitedLines: string[][] = [];
        const lines = readFile.split(new RegExp("\n", "g"));
        lines.forEach((line, index) => {
            const words: string[] = [];
            let word = "";
            let linePosition = index;
            const comparedWords = this.compareTokenChar(line, word, words, linePosition, splitedLines);
            splitedLines.concat(comparedWords);
        });
        return splitedLines;
    }

    public generateTokenData(splitedLines: string[][]) {
        const lexicalDataArray: LexicalData[] = [];
        const flatSplitedLines = splitedLines.flatMap((currentLine) => currentLine);
        const mappedSplitedLines = flatSplitedLines.map((currentLine) => currentLine.split(":"));
        mappedSplitedLines.map((currentToken) => {
            const token = currentToken[0];
            const line = currentToken[1];
            const collumn = (Number(currentToken[2]) - token.length + 1).toString();
            const isReserved = this.findToken(token, this.reserveds);
            if (isReserved) {
                const tokenData = new TokenData("Reserved", token, lexicalDataArray.length, line, collumn);
                lexicalDataArray.push(tokenData);
                return;
            }
            const isOperator = this.findToken(token, this.operators);
            if (isOperator) {
                const tokenData = new TokenData("Operator", token, lexicalDataArray.length, line, collumn);
                lexicalDataArray.push(tokenData);
                return;
            }
            const isDelimiter = this.findToken(token, this.delimiters);
            if (isDelimiter) {
                const tokenData = new TokenData("Delimiter", token, lexicalDataArray.length, line, collumn);
                lexicalDataArray.push(tokenData);
                return;
            }
            if (!isDelimiter && !isOperator && !isReserved && token !== " " && token !== "") {
                const tokenData = new TokenData("Identifier", token, lexicalDataArray.length, line, collumn);
                lexicalDataArray.push(tokenData);
                return;
            }
            if (token === " ") {
                const tokenData = new TokenData("Blank", token, lexicalDataArray.length, line, collumn);
                lexicalDataArray.push(tokenData);
                return;
            }
        });
        return lexicalDataArray;
    }
}

export default TokeDataService;
