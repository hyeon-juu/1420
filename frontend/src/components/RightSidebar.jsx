import { useNavigate } from "react-router-dom";
import styles from "./RightSidebar.module.css";

function InfoRow({ icon, label, value }) {
  return (
    <div className={styles.infoRow}>
      <div className={styles.iconBox}>{icon}</div>

      <div className={styles.infoText}>
        <span>{label}</span>
        <strong>{value || "-"}</strong>
      </div>
    </div>
  );
}

function RightSidebar({ selectedPlanet }) {
  const navigate = useNavigate();

  if (!selectedPlanet) {
    return (
      <aside className={styles.rightSidebar}>
        <div className={styles.emptyBox}>
          <span className={styles.emptyIcon}>✦</span>
          <p className={styles.empty}>행성을 선택해주세요.</p>
        </div>
      </aside>
    );
  }

  const status = selectedPlanet.status || "ONLINE";
  const isOnline = status === "ONLINE";

  function handleMovePlanet() {
    navigate("/my-planet", {
      state: {
        planet: selectedPlanet,
      },
    });
  }

  return (
    <aside className={styles.rightSidebar}>
      <section className={styles.panel}>
        <div className={styles.header}>
          <div className={styles.titleBox}>
            <span className={styles.star}>✧</span>
            <h2>내 행성 정보</h2>
          </div>

          <button type="button" className={styles.moreButton}>
            ⋮
          </button>
        </div>

        <div className={styles.planetCard}>
          <div className={styles.planetImageBox}>
            <img
              className={styles.planetImage}
              src={selectedPlanet.image}
              alt={selectedPlanet.name}
              draggable="false"
            />
          </div>

          <div className={styles.planetMainInfo}>
            <strong className={styles.planetName}>{selectedPlanet.name}</strong>
            <span className={styles.planetCode}>
              {selectedPlanet.subName || selectedPlanet.id}
            </span>

            <span
              className={`${styles.statusBadge} ${
                isOnline ? styles.online : styles.offline
              }`}
            >
              <span />
              {status}
            </span>
          </div>
        </div>

        <div className={styles.infoList}>
          <InfoRow icon="♙" label="OWNER" value={selectedPlanet.owner} />
          <InfoRow icon="◎" label="TYPE" value={selectedPlanet.type} />
          <InfoRow icon="▣" label="JOINED" value={selectedPlanet.joined} />
          <InfoRow icon="◉" label="VISITS" value={selectedPlanet.visits} />
          <InfoRow
            icon="☆"
            label="STAR FRAGMENT"
            value={selectedPlanet.starFragment}
          />
          <InfoRow
            icon="◷"
            label="LAST ACTIVE"
            value={selectedPlanet.lastActive || selectedPlanet.lastAccess}
          />
        </div>

        <button
          type="button"
          className={styles.movePlanetButton}
          onClick={handleMovePlanet}
        >
          {selectedPlanet.name} 행성으로 이동하기
        </button>

        <div className={styles.memoCard}>
          <div className={styles.memoHeader}>
            <strong>행성 메모</strong>
            <button type="button" className={styles.editButton}>
              ✎
            </button>
          </div>

          <p>{selectedPlanet.memo || '"아직 작성된 메모가 없습니다."'}</p>
        </div>
      </section>
    </aside>
  );
}

export default RightSidebar;
