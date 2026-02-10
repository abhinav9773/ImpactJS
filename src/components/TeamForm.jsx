import { useState } from "react";

export default function TeamForm({ onDone }) {
  const [team, setTeam] = useState("");
  const [leader, setLeader] = useState("");
  const [email, setEmail] = useState("");

  // Allow only VIT student emails
  function isValidVITEmail(email) {
    return /^[a-zA-Z0-9._%+-]+@(vitstudent\.ac\.in)$/.test(email);
  }

  function submit(e) {
    e.preventDefault();

    // Validate email
    if (!isValidVITEmail(email)) {
      alert("❌ Please use your VIT email (@vitstudent.ac.in)");
      return;
    }

    // Save data
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
            value={team}
            onChange={(e) => setTeam(e.target.value)}
          />

          <input
            placeholder="👤 Team Leader"
            required
            value={leader}
            onChange={(e) => setLeader(e.target.value)}
          />

          <input
            type="email"
            placeholder="📧 Leader Email (@vitstudent.ac.in)"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button type="submit">Enter Arena →</button>
        </form>
      </div>
    </div>
  );
}
