import { Link } from "react-router-dom";
import styles from "./LeftSidebar.module.css";
import { useState } from "react";
import profileImage from "../assets/사람2.jpg";

function LeftSidebar() {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [profile, setProfile] = useState({
    name: "PLANET WALKER",
    id: "1420",
    statusmessage: "배고프다",
  });

  const [editProfile, setEditProfile] = useState(profile);

  const openEditModal = () => {
    setEditProfile(profile);
    setIsEditOpen(true);
  };

  const closeEditModal = () => {
    setIsEditOpen(false);
  };

  const saveProfile = () => {
    setProfile(editProfile);
    setIsEditOpen(false);
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.profileTitle}>
        <span>MY PROFILE</span>
      </div>

      <div className={styles.profileCard}>
        <div className={styles.profileImageBox}>
          <img
            src={profileImage}
            alt="프로필 이미지"
            className={styles.profileImage}
          />
        </div>

        <div className={styles.profileTextArea}>
          <button className={styles.editButton} onClick={openEditModal}>
            편집
          </button>

          <h2 className={styles.name}>{profile.name}</h2>
          <p className={styles.id}>#{profile.id}</p>

          <p className={styles.statusmessage}>"{profile.statusmessage}"</p>
        </div>
      </div>

      <nav className={styles.menu}>
        <Link to="/my-orbit">My Orbit</Link>
        <Link to="/my-planet">My Planet</Link>
        <Link to="/message">Message</Link>
        <Link to="/diary">Diary</Link>
        <Link to="/terraforming">Terraforming</Link>
      </nav>

      {isEditOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>EDIT PROFILE</h3>

            <label>
              NAME
              <input
                value={editProfile.name}
                onChange={(e) => {
                  setEditProfile({
                    ...editProfile,
                    name: e.target.value,
                  });
                }}
              />
            </label>

            <label>
              ID
              <input
                value={editProfile.id}
                onChange={(e) => {
                  const value = e.target.value;

                  if (isNaN(value)) {
                    alert("숫자만 입력 가능합니다.");
                    return;
                  }

                  setEditProfile({
                    ...editProfile,
                    id: value,
                  });
                }}
              />
            </label>

            <label>
              STATUS MESSAGE
              <textarea
                maxLength={30}
                value={editProfile.statusmessage}
                onChange={(e) => {
                  setEditProfile({
                    ...editProfile,
                    statusmessage: e.target.value,
                  });
                }}
              />
              <p>{editProfile.statusmessage.length}/30</p>
            </label>

            <div className={styles.modalButtons}>
              <button onClick={closeEditModal}>CANCEL</button>
              <button onClick={saveProfile}>SAVE</button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}

export default LeftSidebar;
