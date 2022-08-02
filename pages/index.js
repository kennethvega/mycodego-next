import styles from "../styles/home.module.scss";

export default function Home() {
  const user = null;

  return (
    <div className="container">
      <div className={styles["btn-container"]}>
        {user && <button className="btn">Create a doc</button>}
        {!user && (
          <div className={styles.message}>
            <h1>
              Welcome to DevCodes. 👋 This app is a documentation platform for
              developers. Login to create your own coding documentation.
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}
