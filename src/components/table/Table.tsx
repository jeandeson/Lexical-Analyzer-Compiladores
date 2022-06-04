import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { LexicalData } from "../../pages/api/scanner";
import styles from "./Table.module.css";

interface TextAreaProps {
    data: LexicalData[];
}

const Table: NextPage<TextAreaProps> = ({ data }) => {
    const limit = 8;
    const [actualIndex, setActualIndex] = useState(0);
    const [lexicalData, setLexicalData] = useState(data.slice(actualIndex * limit, actualIndex * limit + limit));
    const [total, setTotal] = useState(Math.floor(data.length / limit));
    const [totalItemsPagination, setTotalItemsPagination] = useState(Array.from(Array(total).keys()));

    useEffect(() => {
        function handleWithDataIndex() {
            const dataCopy = data;
            const slicedData = dataCopy.slice(actualIndex * limit, actualIndex * limit + limit);
            setTotal(Math.floor(data.length / limit));
            setTotalItemsPagination(Array.from(Array(total).keys()));
            setLexicalData(slicedData);
        }
        handleWithDataIndex();
    }, [data]);
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
                    <th>Column</th>
                </tr>
                {data.length > 0 ? (
                    lexicalData.map((element: LexicalData, index) => (
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
            {data.length > 0 && (
                <ul className={styles.pagination}>
                    {totalItemsPagination.map((item, index) =>
                        renderPaginationItems(index, actualIndex, setActualIndex, totalItemsPagination)
                    )}
                </ul>
            )}
        </div>
    );
};
function renderPaginationItems(index: number, actualIndex: number, setActualIndex: Function, totalItemsPagination: number[]) {
    const itemPaginationLimit = 4;
    if (actualIndex - itemPaginationLimit < index && actualIndex + itemPaginationLimit > index) {
        return (
            <li className={actualIndex === index ? styles.actualIndex : ""} onClick={() => setActualIndex(index)}>
                {index + 1}
            </li>
        );
    } else if (index === 0) {
        return (
            <>
                <li className={actualIndex === index ? styles.actualIndex : ""} onClick={() => setActualIndex(index)}>
                    {index + 1}
                </li>
                <li>{"..."}</li>
            </>
        );
    } else if (index === totalItemsPagination[totalItemsPagination.length - 1]) {
        return (
            <>
                <li>{"..."}</li>
                <li className={actualIndex === index ? styles.actualIndex : ""} onClick={() => setActualIndex(index)}>
                    {index + 1}
                </li>
            </>
        );
    }
}
export default Table;
