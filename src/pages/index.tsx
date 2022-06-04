import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Table from "../components/table/Table";
import TextArea from "../components/textArea/TextArea";
import styles from "../styles/Home.module.css";
import { LexicalData } from "./api/scanner";
import { GrReactjs } from "react-icons/gr";

interface ApiResponse {
    data: LexicalData[];
    error?: string;
}

const Home: NextPage = () => {
    const [text, setText] = useState<string>("");
    const [scannedText, setScannedText] = useState<LexicalData[]>([]);

    useEffect(() => {
        const FetchScanner = async (text: string) => {
            const fetchedResponse = await fetch("api/scanner", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(text),
            });
            const fetchedText: ApiResponse = await fetchedResponse.json();
            setScannedText(fetchedText.data);
        };
        FetchScanner(text);
    }, [text]);

    return (
        <div className={styles.container}>
            <Head>
                <title>Next App Lexical Analyzer</title>
                <meta name="description" content="Application Text Analizer" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <div className={styles.textContainer}>
                    <TextArea text={text} setText={setText} />
                    {<Table data={scannedText} />}
                    {scannedText.length <= 0 && <GrReactjs />}
                </div>
            </main>
        </div>
    );
};

export default Home;
