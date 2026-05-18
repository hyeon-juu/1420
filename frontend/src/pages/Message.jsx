import { useMemo, useState } from "react";
import styles from "./Message.module.css";

const mockSignals = [
  {
    id: 1,
    senderName: "현경",
    profileImage: "/images/profile-jisu.png",
    type: "signal",
    typeLabel: "신호",
    preview: "샤코를 좋아하게 되어버렸어.",
    time: "10분 전",
    isRead: false,
  },
  {
    id: 2,
    senderName: "현주",
    profileImage: "/images/profile-harin.png",
    type: "starlight",
    typeLabel: "별빛",
    preview: "현주님이 별빛을 보냈습니다.",
    time: "1시간 전",
    isRead: true,
  },
  {
    id: 3,
    senderName: "마마",
    profileImage: "/images/profile-minu.png",
    type: "signal",
    typeLabel: "신호",
    preview: "오늘 하루도 네 행성이 평온하길 바라.",
    time: "3시간 전",
    isRead: true,
  },
];

const tabs = [
  { id: "all", label: "전체 신호" },
  { id: "unread", label: "미확인 신호" },
  { id: "starlight", label: "별빛" },
];

function Message() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedSignalId, setSelectedSignalId] = useState(null);

  const unreadCount = mockSignals.filter((signal) => !signal.isRead).length;

  const filteredSignals = useMemo(() => {
    if (activeTab === "unread") {
      return mockSignals.filter((signal) => !signal.isRead);
    }

    if (activeTab === "starlight") {
      return mockSignals.filter((signal) => signal.type === "starlight");
    }

    return mockSignals;
  }, [activeTab]);

  const selectedSignal = mockSignals.find((signal) => signal.id === selectedSignalId);

  return (
    <section className={styles.container}>
      <div className={styles.panel}>
        <div className={styles.header}>
          <div>
            <p className={styles.systemLabel}>SIGNAL INBOX</p>
            <h1>신호 수신함</h1>
            <p className={styles.description}>
              다른 행성에서 도착한 신호들을 확인하세요.
            </p>
          </div>

          <div className={styles.signalCount}>
            <span>미확인 신호</span>
            <strong>{unreadCount}</strong>
          </div>
        </div>

        <div className={styles.tabs}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`${styles.tab} ${
                activeTab === tab.id ? styles.activeTab : ""
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className={styles.signalList}>
          {filteredSignals.length > 0 ? (
            filteredSignals.map((signal) => (
              <article
                key={signal.id}
                className={`${styles.signalCard} ${
                  !signal.isRead ? styles.unread : ""
                } ${
                  selectedSignalId === signal.id ? styles.selected : ""
                }`}
                onClick={() => setSelectedSignalId(signal.id)}
              >
                <div className={styles.profileWrap}>
                  <img
                    src={signal.profileImage}
                    alt={`${signal.senderName} 프로필`}
                    className={styles.profileImage}
                  />
                </div>

                <div className={styles.signalContent}>
                  <div className={styles.signalTop}>
                    <div>
                      <strong className={styles.senderName}>
                        {signal.senderName}
                      </strong>
                      <span className={`${styles.badge} ${styles[signal.type]}`}>
                        {signal.typeLabel}
                      </span>
                    </div>

                    <div className={styles.timeWrap}>
                      <span className={styles.time}>{signal.time}</span>
                      {!signal.isRead && <span className={styles.unreadDot}></span>}
                    </div>
                  </div>

                  <p className={styles.preview}>{signal.preview}</p>
                </div>
              </article>
            ))
          ) : (
            <div className={styles.emptyState}>
              <p>도착한 신호가 없습니다.</p>
            </div>
          )}
        </div>

        {/* 나중에 오른쪽 상세창 만들 때 이 selectedSignal 값을 넘기면 됨 */}
        {/* 예: <SignalDetail signal={selectedSignal} /> */}
      </div>
    </section>
  );
}

export default Message;