import styles from "./Message.module.css";

function Message() {
  return (
    <section className={styles.container}>
      <h1>Message</h1>
      <p>다른 행성과 주고받은 메시지를 확인하는 화면입니다.</p>
    </section>
  );
}

export default Message;
