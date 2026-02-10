import { useEffect, useRef } from "react";

export default function SpinWheel({ items, spinning, targetIndex }) {
  const canvasRef = useRef(null);
  const angleRef = useRef(0);

  const SIZE = 360;
  const RADIUS = SIZE / 2 - 22;

  /* Setup Canvas */
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const dpr = window.devicePixelRatio || 1;

    canvas.width = SIZE * dpr;
    canvas.height = SIZE * dpr;

    canvas.style.width = SIZE + "px";
    canvas.style.height = SIZE + "px";

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    drawWheel(angleRef.current);
  }, [items]);

  /* Draw Wheel */
  function drawWheel(angle) {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const center = SIZE / 2;
    const slice = (2 * Math.PI) / items.length;

    ctx.clearRect(0, 0, SIZE, SIZE);

    items.forEach((item, i) => {
      const start = angle + i * slice;
      const mid = start + slice / 2;

      /* Slice */
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, RADIUS, start, start + slice);
      ctx.closePath();

      ctx.fillStyle = i % 2 ? "#0b1220" : "#111827";
      ctx.fill();

      ctx.strokeStyle = "#334155";
      ctx.stroke();

      /* TEXT */
      ctx.save();

      ctx.translate(center, center);
      ctx.rotate(mid);

      /* Flip upside-down text */
      if (mid > Math.PI / 2 && mid < (3 * Math.PI) / 2) {
        ctx.rotate(Math.PI);
      }

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.fillStyle = "#f8fafc";
      ctx.font = "600 15px Inter, system-ui";

      /* Position text OUTWARD (no center overlap) */
      const textRadius = RADIUS * 0.72;

      ctx.fillText(item, textRadius, 0);

      ctx.restore();
    });

    /* Border */
    ctx.beginPath();
    ctx.arc(center, center, RADIUS, 0, Math.PI * 2);
    ctx.strokeStyle = "#64748b";
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  /* Spin Animation */
  useEffect(() => {
    if (!spinning || targetIndex == null) return;

    const slice = (2 * Math.PI) / items.length;
    const pointerOffset = -Math.PI / 2;

    const target =
      pointerOffset - (targetIndex * slice + slice / 2) + 6 * Math.PI; // more spins = smoother

    let start = angleRef.current;
    let startTime = null;

    const duration = 2300;

    function animate(t) {
      if (!startTime) startTime = t;

      const p = Math.min((t - startTime) / duration, 1);

      const ease = 1 - Math.pow(1 - p, 3);

      const angle = start + (target - start) * ease;

      angleRef.current = angle;

      drawWheel(angle);

      if (p < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [spinning, targetIndex]);

  return (
    <div className="wheel-box">
      <canvas ref={canvasRef} />
      <div className="pointer">▼</div>
    </div>
  );
}
