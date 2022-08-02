import styles from "../styles/home.module.scss";

export default function Home() {
  return (
    <div className="container">
      <div className={styles["btn-container"]}>
        <button className="btn">Create a doc</button>
      </div>
    </div>
  );
}
