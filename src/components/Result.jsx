export default function Result({ impact, tech, constraint }) {
  return (
    <div className="result">
      <h2>✅ Final Idea</h2>

      <p>{impact}</p>
      <p>{tech}</p>
      <p>{constraint}</p>
    </div>
  );
}
