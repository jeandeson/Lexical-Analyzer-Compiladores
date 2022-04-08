import type { NextPage } from "next";
import { LexicalData } from "../../pages/api/scanner";
import styles from "./Table.module.css";

interface TextAreaProps {
    data: LexicalData[];
}

const Table: NextPage<TextAreaProps> = ({ data }) => {
    return (
        <div className={styles.tableContainer}>
            <table>
                <caption className={styles.caption}>Output Table</caption>
                <tr>
                    <th>Description</th>
                    <th>Lexeme</th>
                    <th>Token</th>
                    <th>Pattern</th>
                    <th>Position</th>
                    <th>Line</th>
                    <th>Collumn</th>
                </tr>
                {data.length > 0 ? (
                    data.map((element: LexicalData, index) => (
                        <tr key={index}>
                            <td>{element.description}</td>
                            <td>{element.lexeme}</td>
                            <td>{element.token}</td>
                            <td>{JSON.stringify(element.pattern).replaceAll('"', "")}</td>
                            <td>{element.position}</td>
                            <td>{element.line}</td>
                            <td>{element.collumn}</td>
                        </tr>
                    ))
                ) : (
                    <>
                        <tr>
                            <td>{"###"}</td>
                            <td>{"###"}</td>
                            <td>{"###"}</td>
                            <td>{"###"}</td>
                            <td>{"###"}</td>
                            <td>{"###"}</td>
                            <td>{"###"}</td>
                        </tr>
                    </>
                )}
            </table>
        </div>
    );
};

export default Table;
