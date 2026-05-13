<<<<<<< HEAD
=======
import { Link } from "react-router-dom";
import styles from "./LeftSidebar.module.css";
import { useState } from "react";
import profileImage from "../assets/사람2.jpg";

>>>>>>> 782f2d8 (LeftSidebar 첫 수정)
function LeftSidebar() {
  // 수정창 열렸는지 닫혔는지 여부
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [profile, setProfile] = useState({
    name: "PLANET WALKER",
    id: "1420",
    statusmessage: "배고프다",
    planet: "1420-7B",
    // 가입한 날짜로 해야함
    joined: "2024.11.20",
    // 방문자 -> 구현 필요
    visits: 128,
    // 별조각 -> 다른 유저가 주면 올라가도록 구현 필요
    starfragment: 84,
  });
  
  // 임시 수정본
  const [editProfile, setEditProfile] = useState(profile);

  // edit 버튼 누르면 실행
  const openEditModal = () => {
    setEditProfile(profile); // 현재 profile 데이터를 editProfile에 복사
    setIsEditOpen(true); 
  };

  // cancle 버튼 누르면 실행
  const closeEditModal = () => {
    setIsEditOpen(false);
  };

  // save 버튼 누르면 실행
  const saveProfile = () => {
    setProfile(editProfile);
    setIsEditOpen(false);
  };


  return (
<<<<<<< HEAD
    <div className="left-sidebar">
      <div>left side bar</div>
    </div>
=======
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
          <button className={styles.editButton} onClick={openEditModal}> 편집 </button>

          <h2 className={styles.name}>{profile.name}</h2>
          <p className={styles.id}>#{profile.id}</p>

          <p className={styles.statusmessage}>"{profile.statusmessage}"</p>

          <div className={styles.divider}></div>

          <div className={styles.infoRow}>
            <span>JOINED</span>
            <strong>{profile.joined}</strong>
          </div>

          <div className={styles.infoRow}>
            <span>PLANET</span>
            <strong>{profile.planet}</strong>
          </div>

          <div className={styles.infoRow}>
            <span>VISITS</span>
            <strong>{profile.visits}</strong>
          </div>

          <div className={styles.infoRow}>
            <span>STAR FRAGMENT</span>
            <strong>{profile.starfragment}</strong>
          </div>
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
                  // 숫자가 아니면 경고 (수정해야함)
                  if (isNaN(value)) {
                    alert("숫자만 입력 가능합니다.");
                    return;
                  }

                  setEditProfile({
                    ...editProfile,
                    id: e.target.value,
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
              <p>
                {editProfile.statusmessage.length}/30
              </p>
            </label>

            <label>
              PLANET
              <input
                value={editProfile.planet}
                onChange={(e) => {
                  setEditProfile({
                    ...editProfile,
                    planet: e.target.value,
                  });
                }}
              />
            </label>

            <div className={styles.modalButtons}>
              <button onClick={closeEditModal}>CANCEL</button>
              <button onClick={saveProfile}>SAVE</button>
            </div>
          </div>
        </div>
      )}
      

    </aside>
>>>>>>> 782f2d8 (LeftSidebar 첫 수정)
  );
}

export default LeftSidebar;
