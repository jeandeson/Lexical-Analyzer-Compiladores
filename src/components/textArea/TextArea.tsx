import type { NextPage } from "next";
import styles from "./TextArea.module.css";

interface TextAreaProps {
  text: string;
  setText: Function;
}

const TextArea: NextPage<TextAreaProps> = ({
  text,
  setText,
}: TextAreaProps) => {
  return (
    <div className={styles.textAreaContainer}>
      <label htmlFor="textarea" className={styles.label}>
        Input Text
      </label>
      <textarea
        placeholder={`const a = 1;const b = 2;${"\n"}const b = 2;${"\n"}if(a+b){${"\n"}return true;${"\n"}}`}
        id="textarea"
        spellCheck={false}
        className={styles.textArea}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
};

export default TextArea;
