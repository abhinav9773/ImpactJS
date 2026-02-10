import { useState } from "react";

export default function TeamForm({ onDone }) {
  const [team, setTeam] = useState("");
  const [leader, setLeader] = useState("");
  const [email, setEmail] = useState("");

  function submit(e) {
    e.preventDefault();

    localStorage.setItem("teamData", JSON.stringify({ team, leader, email }));

    onDone();
  }

  return (
    <div className="container">
      <div className="glass">
        <h1>⚡ IMPACT.JS</h1>

        <p className="subtitle">Where Ideas Become Impact • 4-Hour Sprint</p>

        <form onSubmit={submit}>
          <input
            placeholder="🏷 Team Name"
            required
            onChange={(e) => setTeam(e.target.value)}
          />

          <input
            placeholder="👤 Team Leader"
            required
            onChange={(e) => setLeader(e.target.value)}
          />

          <input
            type="email"
            placeholder="📧 Leader Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <button type="submit">Enter Arena →</button>
        </form>
      </div>
    </div>
  );
}
