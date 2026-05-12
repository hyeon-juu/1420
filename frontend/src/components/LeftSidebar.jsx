import { Link } from "react-router-dom";
import styles from "./LeftSidebar.module.css";

function LeftSidebar() {
  return (
    <aside className={styles.sidebar}>
      <Link to="/my-orbit">My Orbit</Link>
      <Link to="/my-planet">My Planet</Link>
      <Link to="/message">Message</Link>
      <Link to="/diary">Diary</Link>
      <Link to="/terraforming">Terraforming</Link>
    </aside>
  );
}

export default LeftSidebar;
