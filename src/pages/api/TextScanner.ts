import { LexicalData } from "./scanner";
import TokenData from "./TokenData";
class TextScanner {
    private readonly reserveds;
    private readonly operators;
    private readonly delimiters;
    constructor(reserveds: string[], operators: string[], delimiters: string[]) {
        this.reserveds = reserveds;
        this.operators = operators;
        this.delimiters = delimiters;
    }
    handleSplitText(readFile: string) {
        const splitedLines: string[][] = [];
        const lines = readFile.split(new RegExp("\n", "g"));
        lines.forEach((line, index) => {
            const words: string[] = [];
            let word = "";
            let linePosition = index;
            for (let lineCollumn = 0; lineCollumn < line.length; lineCollumn++) {
                const character = line.charAt(lineCollumn);
                const nextCharacter = line.charAt(lineCollumn + 1);
                word += character;
                if (character === "") {
                    null;
                } else if (nextCharacter === " " || this.findToken(nextCharacter, this.delimiters)) {
                    word = `${word}:${linePosition}:${lineCollumn}`;
                    words.push(word.trim());
                    word = "";
                } else if (this.findToken(character, this.delimiters)) {
                    word = `${word}:${linePosition}:${lineCollumn}`;
                    words.push(word.trim());
                    splitedLines.push(words);
                }
            }
        });
        return splitedLines;
    }

    handleCompareTokens(splitedLines: string[][]) {
        const lexicalDataArray: LexicalData[] = [];
        const flatSplitedLines = splitedLines.flatMap((currentLine) => currentLine);
        const mappedSplitedLines = flatSplitedLines.map((currentLine) => currentLine.split(":"));
        mappedSplitedLines.map((currentLine) => {
            const token = currentLine[0];
            const line = currentLine[1];
            const collumn = (Number(currentLine[2]) - token.length + 1).toString();
            const reservedsResult = this.findToken(token, this.reserveds);
            if (reservedsResult) {
                const lexicalData = new TokenData("Reserved", token, lexicalDataArray.length, line, collumn);
                lexicalDataArray.push(lexicalData);
            }
            const operatorsResult = this.findToken(token, this.operators);
            if (operatorsResult) {
                const lexicalData = new TokenData("Operator", token, lexicalDataArray.length, line, collumn);
                lexicalDataArray.push(lexicalData);
            }
            const delimiterResult = this.findToken(token, this.delimiters);
            if (delimiterResult) {
                const lexicalData = new TokenData("Delimiter", token, lexicalDataArray.length, line, collumn);
                lexicalDataArray.push(lexicalData);
            }
            if (delimiterResult === false && operatorsResult === false && reservedsResult === false) {
                const lexicalData = new TokenData(
                    "Identifier",
                    token,
                    lexicalDataArray.length,
                    line,
                    collumn
                );
                lexicalDataArray.push(lexicalData);
            }
        });
        return lexicalDataArray;
    }

    // handleWithIdentifierResult(word: string, index: number, line: string, collumn: string) {
    //     const reservedResult: LexicalData = {
    //         description: "Identifier, variables, functions, parameters",
    //         lexeme: word,
    //         token: `<Identifier, ${word}>`,
    //         pattern: word.split(""),
    //         position: index,
    //         line: line,
    //         collumn: collumn,
    //     };
    //     return reservedResult;
    // }

    // handleWithReservedResult(word: string, index: number, line: string, collumn: string) {
    //     const reservedResult: LexicalData = {
    //         description: "Reserved",
    //         lexeme: word,
    //         token: `<${word}, >`,
    //         pattern: word.split(""),
    //         position: index,
    //         line: line,
    //         collumn: collumn,
    //     };
    //     return reservedResult;
    // }

    // handleWithDelimiterResult(word: string, index: number, line: string, collumn: string) {
    //     const delimiterResult: LexicalData = {
    //         description: "Delimiter",
    //         lexeme: word,
    //         token: `<${word}, >`,
    //         pattern: word.split(""),
    //         position: index,
    //         line: line,
    //         collumn: collumn,
    //     };
    //     return delimiterResult;
    // }

    // handleWithOperatorsResult(word: string, index: number, line: string, collumn: string) {
    //     const operatorResult: LexicalData = {
    //         description: "Operator",
    //         lexeme: word,
    //         token: `<${word}, >`,
    //         pattern: word.split(""),
    //         position: index,
    //         line: line,
    //         collumn: collumn,
    //     };
    //     return operatorResult;
    // }

    findToken(word: string, array: string[]) {
        const result = array.find((item) => item === word);
        if (result != undefined) {
            return true;
        }
        return false;
    }

    // findReserveds(word: string) {
    //   const result = this.reserveds.find((reserved) => reserved === word);
    //   if (result != undefined) {
    //     return true;
    //   }
    //   return false;
    // }

    // findOperators(word: string) {
    //   const result = this.operators.find((operator) => operator === word);
    //   if (result != undefined) {
    //     return true;
    //   }
    //   return false;
    // }

    // findDelimiters(word: string) {
    //   const result = this.delimiters.find((delimiter) => delimiter === word);
    //   if (result != undefined) {
    //     return true;
    //   }
    //   return false;
    // }
}

export default TextScanner;
