import { useOutletContext } from "react-router-dom";
import styles from "./OrbitMap.module.css";
import planet1Img from "../../assets/planets/planet1.png";
import planet2Img from "../../assets/planets/planet2.png";
import planet3Img from "../../assets/planets/planet3.png";

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

const PLANETS = [
  {
    id: "me",
    name: "오른이 살고 있어요",
    subName: "1420-7B",
    isCenter: true,
    image: planet2Img,
    size: 210,
  },
  {
    id: "planet-2",
    name: "샤코 ;;",
    lastAccess: "마지막 접속 7일 전",
    orbitId: 2,
    angle: 210,
    image: planet1Img,
    size: 90,
  },
  {
    id: "planet-3",
    name: "earth",
    lastAccess: "마지막 접속 47일 전",
    orbitId: 3,
    angle: 310,
    image: planet3Img,
    size: 100,
  },
];

function getOrbit(orbitId) {
  return ORBITS.find((orbit) => orbit.id === orbitId);
}

function getPlanetPosition(planet) {
  if (planet.isCenter) {
    return {
      x: VIEWBOX.cx,
      y: VIEWBOX.cy,
    };
  }

  const orbit = getOrbit(planet.orbitId);

  if (!orbit) {
    return {
      x: VIEWBOX.cx,
      y: VIEWBOX.cy,
    };
  }

  const radian = (planet.angle * Math.PI) / 180;

  return {
    x: VIEWBOX.cx + orbit.radius * Math.cos(radian),
    y: VIEWBOX.cy + orbit.radius * Math.sin(radian),
  };
}

function PlanetNode({ planet, onSelectPlanet }) {
  const position = getPlanetPosition(planet);

  const nodeStyle = {
    left: `${(position.x / VIEWBOX.width) * 100}%`,
    top: `${(position.y / VIEWBOX.height) * 100}%`,
    zIndex: Math.round(position.y),
    "--planet-size": `${planet.size}px`,
  };

  return (
    <button
      type="button"
      className={`${styles.planetNode} ${
        planet.isCenter ? styles.centerPlanet : ""
      }`}
      style={nodeStyle}
      onClick={() => {
        console.log("선택한 행성:", planet);
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

function OrbitMap() {
  const { setSelectedPlanet } = useOutletContext();
  return (
    <section className={styles.orbitMap}>
      <svg
        className={styles.orbitSvg}
        viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
        aria-hidden="true"
      >
        {ORBITS.map((orbit) => (
          <circle
            key={orbit.id}
            cx={VIEWBOX.cx}
            cy={VIEWBOX.cy}
            r={orbit.radius}
            fill="none"
            stroke="rgba(88, 157, 255, 0.35)"
            strokeWidth="2"
            strokeDasharray="5 10"
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
    </section>
  );
}

export default OrbitMap;
