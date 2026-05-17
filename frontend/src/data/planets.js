import planet1Img from "../assets/planets/planet1.png";
import planet2Img from "../assets/planets/planet2.png";
import planet3Img from "../assets/planets/planet3.png";

import planet1BaseImg from "../assets/planets/planet1_base.png";
import planet2BaseImg from "../assets/planets/planet2_base.png";
import planet3BaseImg from "../assets/planets/planet3_base.png";

export const PLANETS = [
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

export const DEFAULT_PLANET = PLANETS[0];
