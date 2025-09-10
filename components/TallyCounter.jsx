import { useState } from "react";

export default function TallyCounter({ updateValue, title }) {
  const [count, setCount] = useState(0);

  const handleClick = {
    incrementCount: () => {
      const newCount = count + 1;
      setCount(newCount);
      updateValue(count + 1);
    },
    decrementCount: () => {
      if (count == 0) return;
      const newCount = count - 1;
      setCount(newCount);
      updateValue(count - 1);
    },
  };

  const styles = {
    button: {
      padding: "1rem",
      borderRadius: "100%",
      width: "4rem",
      height: "4rem",
      backgroundColor: "#333",
      color: "white",
      border: "none",
    },
  };
  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <span htmlFor={title}>{title}</span>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button style={styles.button} onClick={handleClick.decrementCount}>
          -
        </button>
        {count}
        <button style={styles.button} onClick={handleClick.incrementCount}>
          +
        </button>
      </div>
    </div>
  );
}
