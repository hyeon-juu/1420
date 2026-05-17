import { useLocation } from "react-router-dom";
import styles from "./MyPlanet.module.css";

const DEFAULT_BUILDING_BUTTONS = [
  {
    id: "observatory",
    label: "OBSERVATORY",
    className: "observatoryButton",
  },
  {
    id: "signal-tower",
    label: "SIGNAL TOWER",
    className: "signalTowerButton",
  },
  {
    id: "lab",
    label: "LAB",
    className: "labButton",
  },
  {
    id: "archive",
    label: "ARCHIVE",
    className: "archiveButton",
  },
  {
    id: "house",
    label: "HOUSE",
    className: "houseButton",
  },
  {
    id: "portal",
    label: "PORTAL",
    className: "portalButton",
  },
];

function MyPlanet() {
  const location = useLocation();
  const planet = location.state?.planet;

  function handleBuildingClick(building) {
    alert(`${building.label} 클릭`);
  }

  if (!planet) {
    return (
      <section className={styles.container}>
        <div className={styles.emptyPanel}>
          <span className={styles.star}>✦</span>
          <h1 className={styles.title}>선택된 행성이 없습니다</h1>
          <p className={styles.description}>
            My Orbit에서 행성을 선택한 뒤 이동해주세요.
          </p>
        </div>
      </section>
    );
  }

  const buildingButtons = planet.buildings || DEFAULT_BUILDING_BUTTONS;

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <span className={styles.star}>✦</span>

        <div>
          <h1 className={styles.title}>{planet.name}</h1>
          <p className={styles.description}>
            {planet.name} 행성 기지에 도착했습니다.
          </p>
        </div>
      </div>

      <div className={styles.stageWrap}>
        <div className={styles.planetStage}>
          <img
            className={styles.baseImage}
            src={planet.baseImage}
            alt={`${planet.name} base`}
            draggable="false"
          />

          {buildingButtons.map((building) => (
            <button
              key={building.id}
              type="button"
              className={`${styles.buildingNameButton} ${
                styles[building.className]
              }`}
              onClick={() => handleBuildingClick(building)}
            >
              {building.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MyPlanet;
