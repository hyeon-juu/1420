import styles from "./Diary.module.css";
import { useEffect, useState } from "react";

function Diary(){
  const MAX_LENGTH = 1000;

  const [text, setText] = useState("");
  // 날짜
  const [now, setNow] = useState(new Date());
  // 일기 목록 (배열로 저장)
  const [logs, setLogs] = useState([]);
  // 아카이브
  const [isArchiveView, setIsArchiveView] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);

  // 시간..?
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    return date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Save 
  const handleSave = () => {
    if (!text.trim()) return;

    // 새로운 일기 객체
    const newLog = {
      id: Date.now(),
      number: String(logs.length + 1),
      date: formatDate(new Date()),
      content: text,
    };

    setLogs([newLog, ...logs]);
    setText("");
  };


  const handleNewEntry = () => {
    if (text.trim()) {
      const result = window.confirm(
        "현재 글은 저장되지 않습니다. 새 Entry로 바꿀까요?"
      );

      if (!result) return;
    }

    setText("");
  };

  const handleDelete = () => {
    setText("");
  };

  const handleArchive = () => {
    setSelectedLog(null);
    setIsArchiveView(true);
  };

  const handleCloseArchive = () => {
    setSelectedLog(null);
    setIsArchiveView(false);
  };

  return (
    <section className={styles.container}>
      <div className={styles.diaryTerminal}>
        <div className={styles.terminalTitle}>
          <div>
            <h4>DIARY TERMINAL</h4>
            <p>일지 기록 시스템</p>
          </div>

          <span>TOTAL ENTRIES {logs.length}</span>
        </div>

        <div className={styles.logEditor}>
          <div className={styles.editorHeader}>
            <span>&gt; LOG_{String(logs.length + 1).padStart(4, "0")}</span>
            <span>DATE {formatDate(now)}</span>
            <span>PLANET 1420-7B</span>
          </div>

          <div className={styles.editorBody}>
            <textarea
              className={styles.editorTextarea}
              value={text}
              maxLength={MAX_LENGTH}
              onChange={(e) => setText(e.target.value)}
              placeholder="오늘의 신호를 기록하세요..."
            />
          </div>

          <div className={styles.editorFooter}>
            <span>AUTO-SAVE ACTIVE</span>
            <span>
              CHARACTER COUNT : {text.length} / {MAX_LENGTH}
            </span>
          </div>
        </div>

        <div className={styles.actionButtons}>
          <button onClick={handleNewEntry}>NEW ENTRY</button>
          <button onClick={handleSave}>SAVE LOG</button>
          <button onClick={handleDelete}>DELETE</button>
          <button onClick={handleArchive}>ARCHIVE</button>
        </div>

        <div className={styles.logHistory}>
          <h5>RECENT ENTRIES</h5>

          {logs.length === 0 ? (
            <p className={styles.emptyText}>저장된 기록이 없습니다.</p>
          ) : (
            logs.slice(0, 4).map((log) => (
              <button
                key={log.id}
                className={styles.historyItem}
                onClick={() => {
                  setSelectedLog(log);
                  setIsArchiveView(true);
                }}
              >
                <span>{log.number}</span>
                <span>{log.date}</span>
                <span>{log.content.slice(0, 25)}</span>
              </button>
            ))
          )}
        </div>
      </div>

      {isArchiveView && (
        <div className={styles.archiveModal}>
          <div className={styles.archiveWindow}>
            <button
              className={styles.archiveClose}
              onClick={handleCloseArchive}
            >
              ×
            </button>

            <div className={styles.archiveTitle}>
              <h4>ARCHIVE TERMINAL</h4>
              <p>전체 기록 보관소</p>
            </div>

            {selectedLog ? (
              <div className={styles.logDetail}>
                <button
                  className={styles.backButton}
                  onClick={() => setSelectedLog(null)}
                >
                  &lt; BACK TO LIST
                </button>

                <div className={styles.detailHeader}>
                  <span>LOG_{selectedLog.number}</span>
                  <span>{selectedLog.date}</span>
                </div>

                <p>{selectedLog.content}</p>
              </div>
            ) : (
              <div className={styles.archiveList}>
                {logs.length === 0 ? (
                  <p className={styles.emptyText}>저장된 기록이 없습니다.</p>
                ) : (
                  logs.map((log) => (
                    <button
                      key={log.id}
                      className={styles.archiveItem}
                      onClick={() => setSelectedLog(log)}
                    >
                      <span>{log.number}</span>
                      <span>{log.date}</span>
                      <span>{log.content.slice(0, 40)}</span>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default Diary;
