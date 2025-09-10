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

  return (
    <div
      style={{
        width: "10rem",
        maxWidth: "50%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <button onClick={handleClick.decrementCount}>-</button>
      <span htmlFor={title}>
        {title}: {count}
      </span>
      <button onClick={handleClick.incrementCount}>+</button>
    </div>
  );
}
