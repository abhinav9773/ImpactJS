import { useEffect, useState } from "react";
import TeamForm from "./components/TeamForm";
import SpinWheel from "./components/SpinWheel";
import confetti from "canvas-confetti";
import "./styles.css";

const API_URL =
  "https://script.google.com/macros/s/AKfycby8sVkRYLY-4HX-lwhuVV_pMUqi_QsyOKqozA4J249z0EZsadnExM1D-RZu7LiYAZoRWQ/exec";

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

export default function App() {
  /* Core */
  const [teamSaved, setTeamSaved] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);

  /* Result */
  const [savedIdea, setSavedIdea] = useState(null);

  /* Spin control (IMPORTANT FIX) */
  const [spin1, setSpin1] = useState(false);
  const [spin2, setSpin2] = useState(false);
  const [spin3, setSpin3] = useState(false);

  const [impactIndex, setImpactIndex] = useState(null);
  const [techIndex, setTechIndex] = useState(null);
  const [constraintIndex, setConstraintIndex] = useState(null);

  const [showModal, setShowModal] = useState(false);

  /* Backend matched */
  const impactList = [
    "📚 Study Material Sharing",
    "📝 Attendance & Academic Records",
    "🎓 Placement & Internship Support",
    "👨‍🏫 Faculty / Course Feedback",
    "🏫 Campus Issue Reporting",
    "🤝 Peer Learning & Doubt Solving",
    "🗓️ Event & Club Management",
    "💼 Resume & Skill Tracking",
    "🏠 Hostel / Mess Complaints",
    "🧑‍🤝‍🧑 Team Formation Platform",
  ];

  const techList = [
    "📜 Basic Smart Contract",
    "🔑 Wallet Login",
    "🗳️ Online Voting System",
    "🖼️ Digital Certificate (NFT)",
    "🏛️ Student DAO",
    "📦 IPFS File Storage",
    "🆔 Digital ID",
    "🔗 Blockchain Records",
    "📱 Web2 + Web3 Hybrid App",
    "🧩 Token-less Web3",
  ];

  const constraintList = [
    "📱 Mobile-Friendly UI",
    "🎨 Clean & Simple Design",
    "🧭 Maximum 3 Screens",
    "🧑‍🤝‍🧑 Single User Role",
    "📝 Basic Login (Email/OTP)",
    "📊 Simple Dashboard",
    "🌐 English Only",
    "☁️ Free Cloud / Free Tools",
  ];

  /* Short labels */
  const impactDisplay = [
    "Study",
    "Attendance",
    "Placement",
    "Feedback",
    "Campus",
    "Peer Help",
    "Events",
    "Resume",
    "Hostel",
    "Teams",
  ];

  const techDisplay = [
    "Contract",
    "Wallet",
    "Voting",
    "NFT",
    "DAO",
    "IPFS",
    "Digital ID",
    "Blockchain",
    "Hybrid",
    "No Token",
  ];

  const constraintDisplay = [
    "Mobile",
    "Simple UI",
    "3 Screens",
    "Single User",
    "Login",
    "Dashboard",
    "English",
    "Free Tools",
  ];

  /* Init */
  useEffect(() => {
    if (localStorage.getItem("teamData")) setTeamSaved(true);
    if (localStorage.getItem("hasSpun")) setHasSpun(true);

    const saved = localStorage.getItem("finalIdea");
    if (saved) setSavedIdea(JSON.parse(saved));
  }, []);

  /* FIXED SPIN HANDLER */
  async function handleSpin() {
    if (hasSpun) return;

    try {
      const team = JSON.parse(localStorage.getItem("teamData"));

      const res = await fetch(
        `${API_URL}?team=${encodeURIComponent(team.team)}&leader=${encodeURIComponent(
          team.leader,
        )}&email=${encodeURIComponent(team.email)}`,
      );

      if (!res.ok) throw new Error("API error");

      const data = await res.json();

      setSavedIdea(data);
      localStorage.setItem("finalIdea", JSON.stringify(data));

      const i1 = impactList.indexOf(data.impact);
      const i2 = techList.indexOf(data.tech);
      const i3 = constraintList.indexOf(data.constraint);

      if (i1 < 0 || i2 < 0 || i3 < 0) {
        alert("Backend mismatch");
        return;
      }

      setImpactIndex(i1);
      setTechIndex(i2);
      setConstraintIndex(i3);

      // ✅ SEQUENTIAL SPIN (NO setSpin here)
      setSpin1(true);
      await delay(2400);
      setSpin1(false);

      setSpin2(true);
      await delay(2400);
      setSpin2(false);

      setSpin3(true);
      await delay(2400);
      setSpin3(false);

      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
      });

      setShowModal(true);
      setHasSpun(true);
      localStorage.setItem("hasSpun", "true");
    } catch (err) {
      console.error(err);
      alert("Spin failed ❌");
    }
  }

  if (!teamSaved) {
    return <TeamForm onDone={() => setTeamSaved(true)} />;
  }

  const team = JSON.parse(localStorage.getItem("teamData"));

  return (
    <div className="container">
      <div className="main-layout">
        {savedIdea && (
          <button className="theme-btn" onClick={() => setShowModal(true)}>
            Theme
          </button>
        )}

        <h1>🎡 Idea Roulette</h1>

        <p>
          Team: <b>{team?.team}</b>
        </p>

        <div className="wheels">
          <SpinWheel
            items={impactDisplay}
            spinning={spin1}
            targetIndex={impactIndex}
          />

          <SpinWheel
            items={techDisplay}
            spinning={spin2}
            targetIndex={techIndex}
          />

          <SpinWheel
            items={constraintDisplay}
            spinning={spin3}
            targetIndex={constraintIndex}
          />
        </div>

        <button className="spin-btn" disabled={hasSpun} onClick={handleSpin}>
          {hasSpun ? "Locked 🔒" : "⚡ SPIN"}
        </button>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>🎉 Your Idea</h2>

            <p>
              <b>Impact:</b> {savedIdea?.impact}
            </p>
            <p>
              <b>Tech:</b> {savedIdea?.tech}
            </p>
            <p>
              <b>Constraint:</b> {savedIdea?.constraint}
            </p>

            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
