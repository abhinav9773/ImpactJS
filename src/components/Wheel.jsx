export default function Wheel({ title, value, spinning }) {
  return (
    <div className={`wheel ${spinning ? "spin" : ""}`}>
      <h3>{title}</h3>
      <p>{value || "—"}</p>
    </div>
  );
}
