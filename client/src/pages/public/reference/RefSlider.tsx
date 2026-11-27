import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

// Slick-style carousel matching the reference: N slides visible, optional
// autoplay, round prev/next arrows, wraps around at the ends, swipeable.
export function RefSlider({
  children,
  show,
  showWide,
  autoplay = true,
  interval = 3000,
  className = '',
  arrows = true,
  dots = false,
}: {
  children: ReactNode;
  show: number;
  /** Slides visible at ≥768px (defaults to show). */
  showWide?: number;
  autoplay?: boolean;
  interval?: number;
  className?: string;
  arrows?: boolean;
  /** Pagination dots under the slider (one per position). */
  dots?: boolean;
}) {
  const slides = Children.toArray(children);
  const [wide, setWide] = useState(() => typeof window !== 'undefined' && window.innerWidth >= 768);
  const visible = wide && showWide ? showWide : show;
  const maxIndex = Math.max(0, slides.length - visible);
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);
  const paused = useRef(false);

  useEffect(() => {
    const onResize = () => setWide(window.innerWidth >= 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  useEffect(() => setIndex((i) => Math.min(i, maxIndex)), [maxIndex]);

  const next = useCallback(() => setIndex((i) => (i >= maxIndex ? 0 : i + 1)), [maxIndex]);
  const prev = useCallback(() => setIndex((i) => (i <= 0 ? maxIndex : i - 1)), [maxIndex]);

  useEffect(() => {
    if (!autoplay || maxIndex === 0) return;
    const id = window.setInterval(() => {
      if (!paused.current) next();
    }, interval);
    return () => window.clearInterval(id);
  }, [autoplay, interval, next, maxIndex]);

  return (
    <div
      className={`rs ${className}`}
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      <div
        className="rs-viewport"
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX;
          paused.current = true;
        }}
        onTouchEnd={(e) => {
          if (touchX.current !== null) {
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (dx < -40) next();
            else if (dx > 40) prev();
          }
          touchX.current = null;
          paused.current = false;
        }}
      >
        <div className="rs-track" style={{ transform: `translateX(-${(index * 100) / visible}%)` }}>
          {slides.map((s, i) => (
            <div className="rs-slide" key={i} style={{ width: `${100 / visible}%` }}>
              {s}
            </div>
          ))}
        </div>
      </div>
      {dots && maxIndex > 0 && (
        <div className="rs-dots" role="tablist" aria-label="Choose slide">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Slide ${i + 1}`}
              className={i === index ? 'on' : ''}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      )}
      {arrows && maxIndex > 0 && (
        <>
          <button type="button" className="rs-arrow rs-prev" aria-label="Previous" onClick={prev}>
            <ChevronLeftRoundedIcon />
          </button>
          <button type="button" className="rs-arrow rs-next" aria-label="Next" onClick={next}>
            <ChevronRightRoundedIcon />
          </button>
        </>
      )}
    </div>
  );
}
