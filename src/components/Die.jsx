export default function Die({ value, hold, id, isHeld }) {
  return (
    <button className={`die ${isHeld ? "hold" : ""}`} id={id} onClick={() => hold(id)}>
      {value}
    </button>
  );
}
