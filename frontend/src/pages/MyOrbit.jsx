import Nav from "../components/Nav";
import LeftSidebar from "../components/LeftSidebar";
import MainContent from "../components/MainContent";
import RightSidebar from "../components/RightSidebar";

function MyOrbit() {
  return (
    <div>
      <Nav />

      <div className="layout">
        <LeftSidebar />
        <MainContent />
        <RightSidebar />
      </div>
    </div>
  );
}

export default MyOrbit;
