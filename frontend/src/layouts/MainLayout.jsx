import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import styles from "./MainLayout.module.css";

function MainLayout() {
  return (
    <div className={styles.page}>
      <Nav />

      <div className={styles.layout}>
        <LeftSidebar />

        <main className={styles.content}>
          <Outlet />
        </main>

        <RightSidebar />
      </div>
    </div>
  );
}

export default MainLayout;
