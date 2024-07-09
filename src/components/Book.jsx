import Styles from "./App.module.css";

const Book = ({ children }) => {
  return (
    <main className={Styles.section}>
      <div className={Styles.book}>{children}</div>
    </main>
  );
};

export default Book;
