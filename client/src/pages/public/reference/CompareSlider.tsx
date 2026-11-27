import { useRef, useState } from 'react';

// Draggable before/after comparison (reference: image with a centre handle).
export function CompareSlider({ before, after, alt }: { before: string; after: string; alt: string }) {
  const [pos, setPos] = useState(50);
  const box = useRef<HTMLDivElement>(null);

  const move = (clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <div
      ref={box}
      className="cmp"
      role="slider"
      aria-label={`${alt} — drag to compare before and after`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pos)}
      tabIndex={0}
      onPointerDown={(e) => {
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        move(e.clientX);
      }}
      onPointerMove={(e) => e.buttons === 1 && move(e.clientX)}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - 5));
        if (e.key === 'ArrowRight') setPos((p) => Math.min(100, p + 5));
      }}
    >
      <img src={after} alt={`${alt} — after`} />
      <div className="clip" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img src={before} alt={`${alt} — before`} />
      </div>
      <span className="tag" style={{ left: 6 }}>Before</span>
      <span className="tag" style={{ right: 6 }}>After</span>
      <div className="line" style={{ left: `${pos}%` }} />
      <div className="knob" style={{ left: `${pos}%` }} />
    </div>
  );
}
