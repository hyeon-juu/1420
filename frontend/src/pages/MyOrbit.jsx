import styles from "./MyOrbit.module.css";
import OrbitMap from "../components/OrbitMap/OrbitMap";

function MyOrbit() {
  return (
    <section className={styles.container}>
      <OrbitMap />
    </section>
  );
}

export default MyOrbit;
