import { useOutletContext } from "react-router-dom";
import styles from "./MyOrbit.module.css";

import planet1Img from "../assets/planets/planet1.png";
import planet2Img from "../assets/planets/planet2.png";
import planet3Img from "../assets/planets/planet3.png";
import planet1BaseImg from "../assets/planets/planet1_base.png";
import planet2BaseImg from "../assets/planets/planet2_base.png";
import planet3BaseImg from "../assets/planets/planet3_base.png";

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
    name: "Ornn",
    subName: "1420-7B",
    isCenter: true,
    image: planet2Img,
    baseImage: planet2BaseImg,
    positionClass: "planetMe",

    owner: "PLANET WALKER",
    type: "핑크 행성",
    joined: "2024.11.20",
    visits: 128,
    starFragment: 84,
    lastActive: "오늘",
    memo: '"배고프다"',
    status: "ONLINE",
  },
  {
    id: "planet-2",
    name: "Shaco",
    subName: "0172-XA",
    lastAccess: "마지막 접속 7일 전",
    image: planet1Img,
    baseImage: planet1BaseImg,
    positionClass: "planetShaco",

    owner: "SHACO",
    type: "외곽 행성",
    joined: "2025.01.07",
    visits: 42,
    starFragment: 13,
    lastActive: "7일 전",
    memo: '"정글 차이"',
    status: "AWAY",
  },
  {
    id: "planet-3",
    name: "Teemo",
    subName: "0301-ER",
    lastAccess: "마지막 접속 47일 전",
    image: planet3Img,
    baseImage: planet3BaseImg,
    positionClass: "planetEarth",

    owner: "EARTH WALKER",
    type: "블루 행성",
    joined: "2025.03.01",
    visits: 19,
    starFragment: 5,
    lastActive: "47일 전",
    memo: '"헛둘셋"',
    status: "OFFLINE",
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
