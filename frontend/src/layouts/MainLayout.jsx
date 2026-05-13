import { useState } from "react";
import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import styles from "./MainLayout.module.css";

function MainLayout() {
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  return (
    <div className={styles.page}>
      <Nav />

      <div className={styles.layout}>
        <LeftSidebar />

        <main className={styles.content}>
          <Outlet context={{ selectedPlanet, setSelectedPlanet }} />
        </main>

        <RightSidebar selectedPlanet={selectedPlanet} />
      </div>
    </div>
  );
}

export default MainLayout;
