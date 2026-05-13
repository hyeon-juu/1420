import styles from "./RightSidebar.module.css";

function RightSidebar({ selectedPlanet }) {
  return (
    <aside className={styles.rightSidebar}>
      {selectedPlanet ? (
        <div className={styles.planetInfo}>
          <strong className={styles.name}>{selectedPlanet.name}</strong>
        </div>
      ) : (
        <p className={styles.empty}>행성을 선택해주세요.</p>
      )}
    </aside>
  );
}

export default RightSidebar;
