import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import styles from "./RightSidebar.module.css";
import { DIARIES } from "../data/diaries";

const SIGNAL_BARS = [
  4, 6, 8, 12, 18, 26, 34, 24, 16, 28, 36, 42, 30, 20, 52, 70, 44, 26, 58, 76,
  48, 30, 44, 62, 38, 28, 22, 18, 14, 12, 10, 12, 16, 22, 28, 36, 54, 32, 24,
  28, 34, 42, 30, 24, 18, 14,
];

function InfoRow({ icon, label, value }) {
  return (
    <div className={styles.infoRow}>
      <div className={styles.iconBox}>{icon}</div>

      <div className={styles.infoText}>
        <span>{label}</span>
        <strong>{value || "-"}</strong>
      </div>
    </div>
  );
}

function DiaryStatRow({ label, value }) {
  return (
    <div className={styles.diaryStatRow}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
function pad(value) {
  return String(value).padStart(2, "0");
}

function makeDateKey(year, monthIndex, day) {
  return `${year}-${pad(monthIndex + 1)}-${pad(day)}`;
}

function parseDateKey(dateKey) {
  if (!dateKey) return null;

  const [year, month, day] = dateKey.split("-").map(Number);

  if (!year || !month || !day) return null;

  return {
    year,
    monthIndex: month - 1,
    day,
  };
}

function createCalendarDays(year, monthIndex) {
  const firstDay = new Date(year, monthIndex, 1);
  const lastDay = new Date(year, monthIndex + 1, 0);

  const firstWeekDay = firstDay.getDay();
  const lastDate = lastDay.getDate();

  const prevMonthLastDate = new Date(year, monthIndex, 0).getDate();

  const days = [];

  for (let i = firstWeekDay - 1; i >= 0; i--) {
    const day = prevMonthLastDate - i;

    days.push({
      day,
      currentMonth: false,
      dateKey: makeDateKey(year, monthIndex - 1, day),
    });
  }

  for (let day = 1; day <= lastDate; day++) {
    days.push({
      day,
      currentMonth: true,
      dateKey: makeDateKey(year, monthIndex, day),
    });
  }

  const nextDaysCount = 42 - days.length;

  for (let day = 1; day <= nextDaysCount; day++) {
    days.push({
      day,
      currentMonth: false,
      dateKey: makeDateKey(year, monthIndex + 1, day),
    });
  }

  return days;
}

function DiaryRightSidebar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const selectedDateKey = searchParams.get("date") || makeDateKey(2024, 10, 20);

  const selectedDate = parseDateKey(selectedDateKey);

  const [viewDate, setViewDate] = useState(() => {
    if (selectedDate) {
      return {
        year: selectedDate.year,
        monthIndex: selectedDate.monthIndex,
      };
    }

    const today = new Date();

    return {
      year: today.getFullYear(),
      monthIndex: today.getMonth(),
    };
  });

  const calendarDays = createCalendarDays(viewDate.year, viewDate.monthIndex);

  function movePrevMonth() {
    setViewDate((prev) => {
      const date = new Date(prev.year, prev.monthIndex - 1, 1);

      return {
        year: date.getFullYear(),
        monthIndex: date.getMonth(),
      };
    });
  }

  function moveNextMonth() {
    setViewDate((prev) => {
      const date = new Date(prev.year, prev.monthIndex + 1, 1);

      return {
        year: date.getFullYear(),
        monthIndex: date.getMonth(),
      };
    });
  }

  function handleDateClick(dateKey) {
    navigate(`/diary?date=${dateKey}`);
  }

  return (
    <aside className={styles.rightSidebar}>
      <section className={styles.diaryPanel}>
        <div className={styles.diarySection}>
          <h3 className={styles.diarySectionTitle}>+ CALENDAR VIEW</h3>

          <div className={styles.calendarHeader}>
            <button type="button" onClick={movePrevMonth}>
              ‹
            </button>

            <strong>
              {viewDate.year}.{pad(viewDate.monthIndex + 1)}
            </strong>

            <button type="button" onClick={moveNextMonth}>
              ›
            </button>
          </div>

          <div className={styles.calendarWeekNames}>
            <span>S</span>
            <span>M</span>
            <span>T</span>
            <span>W</span>
            <span>T</span>
            <span>F</span>
            <span>S</span>
          </div>

          <div className={styles.calendarGrid}>
            {calendarDays.map((date) => {
              const hasDiary = Boolean(DIARIES[date.dateKey]);
              const isSelected = selectedDateKey === date.dateKey;

              return (
                <button
                  key={date.dateKey}
                  type="button"
                  className={`${styles.calendarDate} ${
                    !date.currentMonth ? styles.calendarMuted : ""
                  } ${isSelected ? styles.calendarActive : ""} ${
                    hasDiary ? styles.hasDiary : ""
                  }`}
                  onClick={() => handleDateClick(date.dateKey)}
                >
                  {date.day}
                </button>
              );
            })}
          </div>
        </div>

        <div className={styles.diarySection}>
          <h3 className={styles.diarySectionTitle}>+ DIARY STATISTICS</h3>

          <div className={styles.diaryStats}>
            <DiaryStatRow label="TOTAL ENTRIES" value="47" />
            <DiaryStatRow label="THIS MONTH" value="12" />
            <DiaryStatRow label="TOTAL WORDS" value="5,312" />
            <DiaryStatRow label="LONGEST STREAK" value="9 DAYS" />
            <DiaryStatRow label="FAVORITE TIME" value="02:00 AM" />
          </div>
        </div>

        <div className={styles.diarySection}>
          <h3 className={styles.diarySectionTitle}>MEMORY SIGNAL</h3>

          <div className={styles.signalBox}>
            <div className={styles.signalLine} />

            <div className={styles.signalBars}>
              {SIGNAL_BARS.map((height, index) => (
                <span
                  key={index}
                  style={{
                    "--signal-height": `${height}px`,
                  }}
                />
              ))}
            </div>
          </div>

          <div className={styles.stabilityRow}>
            <span>STABILITY : 87%</span>

            <div className={styles.stabilityBars}>
              {Array.from({ length: 14 }).map((_, index) => (
                <span
                  key={index}
                  className={index < 11 ? styles.stabilityActive : ""}
                />
              ))}
            </div>
          </div>
        </div>

        <div className={styles.diarySection}>
          <h3 className={styles.diarySectionTitle}>BACKUP STATUS</h3>

          <div className={styles.backupRows}>
            <div>
              <span>LAST BACKUP</span>
              <strong>2024.11.20 03:50 AM</strong>
            </div>

            <div>
              <span>STATUS</span>
              <strong className={styles.backupOk}>OK</strong>
            </div>
          </div>
        </div>
      </section>
    </aside>
  );
}

function RightSidebar({ selectedPlanet }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isDiaryPage = location.pathname.startsWith("/diary");

  if (isDiaryPage) {
    return <DiaryRightSidebar />;
  }

  if (!selectedPlanet) {
    return (
      <aside className={styles.rightSidebar}>
        <div className={styles.emptyBox}>
          <span className={styles.emptyIcon}>✦</span>
          <p className={styles.empty}>행성을 선택해주세요.</p>
        </div>
      </aside>
    );
  }

  const status = selectedPlanet.status || "ONLINE";
  const isOnline = status === "ONLINE";

  function handleMovePlanet() {
    navigate("/my-planet", {
      state: {
        planet: selectedPlanet,
      },
    });
  }

  return (
    <aside className={styles.rightSidebar}>
      <section className={styles.panel}>
        <div className={styles.header}>
          <div className={styles.titleBox}>
            <span className={styles.star}>✧</span>
            <h2>내 행성 정보</h2>
          </div>

          <button type="button" className={styles.moreButton}>
            ⋮
          </button>
        </div>

        <div className={styles.planetCard}>
          <div className={styles.planetImageBox}>
            <img
              className={styles.planetImage}
              src={selectedPlanet.image}
              alt={selectedPlanet.name}
              draggable="false"
            />
          </div>

          <div className={styles.planetMainInfo}>
            <strong className={styles.planetName}>{selectedPlanet.name}</strong>
            <span className={styles.planetCode}>
              {selectedPlanet.subName || selectedPlanet.id}
            </span>

            <span
              className={`${styles.statusBadge} ${
                isOnline ? styles.online : styles.offline
              }`}
            >
              <span />
              {status}
            </span>
          </div>
        </div>

        <div className={styles.infoList}>
          <InfoRow icon="♙" label="OWNER" value={selectedPlanet.owner} />
          <InfoRow icon="◎" label="TYPE" value={selectedPlanet.type} />
          <InfoRow icon="▣" label="JOINED" value={selectedPlanet.joined} />
          <InfoRow icon="◉" label="VISITS" value={selectedPlanet.visits} />
          <InfoRow
            icon="☆"
            label="STAR FRAGMENT"
            value={selectedPlanet.starFragment}
          />
          <InfoRow
            icon="◷"
            label="LAST ACTIVE"
            value={selectedPlanet.lastActive || selectedPlanet.lastAccess}
          />
        </div>

        <button
          type="button"
          className={styles.movePlanetButton}
          onClick={handleMovePlanet}
        >
          {selectedPlanet.name} 행성으로 이동하기
        </button>

        <div className={styles.memoCard}>
          <div className={styles.memoHeader}>
            <strong>행성 메모</strong>
            <button type="button" className={styles.editButton}>
              ✎
            </button>
          </div>

          <p>{selectedPlanet.memo || '"아직 작성된 메모가 없습니다."'}</p>
        </div>
      </section>
    </aside>
  );
}

export default RightSidebar;
