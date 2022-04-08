import { LexicalData } from "../scanner";

export default class Token implements LexicalData {
    description: string;
    lexeme: string;
    token: string;
    pattern: string[];
    position: number;
    line: string;
    collumn: string;
    constructor(description: string, word: string, index: number, line: string, collumn: string) {
        this.description = description;
        this.lexeme = word;
        this.token = `<${word}, >`;
        this.pattern = word.split("");
        this.position = index;
        this.collumn = collumn;
        this.line = line;
    }
}
