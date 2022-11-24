import styles from "styles/app.module.scss";
import Header from "./components/Header";

const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <Header path={["test", "poo"]} />
    </div>
  );
};

export default App;
