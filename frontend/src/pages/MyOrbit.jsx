import { useOutletContext } from "react-router-dom";
import styles from "./MyOrbit.module.css";

import { PLANETS } from "../data/planets";

const VIEWBOX = {
  width: 900,
  height: 700,
  cx: 450,
  cy: 350,
};

const ORBITS = [
  {
    id: 1,
    name: "1번 궤도",
    radius: 130,
  },
  {
    id: 2,
    name: "2번 궤도",
    radius: 220,
  },
  {
    id: 3,
    name: "3번 궤도",
    radius: 310,
  },
];

function PlanetNode({ planet, onSelectPlanet }) {
  return (
    <button
      type="button"
      className={`${styles.planetNode} ${styles[planet.positionClass]} ${
        planet.isCenter ? styles.centerPlanet : ""
      }`}
      onClick={() => {
        onSelectPlanet(planet);
      }}
    >
      <img
        className={styles.planetImage}
        src={planet.image}
        alt={planet.name}
        draggable="false"
      />

      <div className={styles.nameCard}>
        <strong>{planet.name}</strong>
        {planet.subName && <span>{planet.subName}</span>}
        {planet.lastAccess && <span>{planet.lastAccess}</span>}
      </div>
    </button>
  );
}

function MyOrbit() {
  const { setSelectedPlanet } = useOutletContext();

  return (
    <section className={styles.container}>
      <div className={styles.orbitMap}>
        <svg
          className={styles.orbitSvg}
          viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
          aria-hidden="true"
        >
          {ORBITS.map((orbit) => (
            <circle
              key={orbit.id}
              className={styles.orbitCircle}
              cx={VIEWBOX.cx}
              cy={VIEWBOX.cy}
              r={orbit.radius}
            />
          ))}
        </svg>

        <div className={styles.planetLayer}>
          {PLANETS.map((planet) => (
            <PlanetNode
              key={planet.id}
              planet={planet}
              onSelectPlanet={setSelectedPlanet}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default MyOrbit;
