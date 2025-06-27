import React, { useRef, useEffect, useState } from 'react';
import { usePageVisibility } from '../../hooks/usePageVisibility';

// Utility to detect mobile devices
function isMobileDevice() {
  if (typeof navigator === 'undefined') return false;
  return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

export default function Blob({
  color = 'var(--blue)',
  width = 300,
  height = 300,
  left = 0,
  top = 0,
  opacity = 0.7,
  blur = 60,
  zIndex = -2,
  style = {},
  rotationSpeed = 30000, // ms for one full rotation
  morphSpeed = 20000,    // ms for one full morph cycle
  movementSpeed = 6000,  // ms for one full movement cycle
}) {
  // Animation state
  const [angle, setAngle] = useState(0);
  const [morph, setMorph] = useState(0);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const requestRef = useRef();

  // Generate random phase offsets for unique movement per blob
  const phaseX = useRef(Math.random() * 2 * Math.PI);
  const phaseY = useRef(Math.random() * 2 * Math.PI);

  const isMobile = isMobileDevice();
  const isVisible = usePageVisibility();

  useEffect(() => {
    if (isMobile) {
      // On mobile, keep everything static
      setAngle(0);
      setMorph(0);
      setOffset({ x: 0, y: 0 });
      return;
    }
    if (!isVisible) {
      cancelAnimationFrame(requestRef.current);
      return;
    }
    let start;
    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      // Use props for speed
      setAngle((elapsed / rotationSpeed) * 360);
      setMorph(Math.sin((elapsed / morphSpeed) * 2 * Math.PI));
      // Move in a smooth random path within 100px box, using movementSpeed
      const dx = Math.sin((elapsed / movementSpeed) * 2 * Math.PI + phaseX.current) * 50;
      const dy = Math.cos((elapsed / movementSpeed) * 2 * Math.PI + phaseY.current) * 50;
      setOffset({ x: dx, y: dy });
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [rotationSpeed, morphSpeed, movementSpeed, isMobile, isVisible]);

  // Morph ellipse radii slightly
  const rx = 140 + morph * 10; // range: 130-150
  const ry = 120 + morph * 8;  // range: 112-128

  // Calculate animated position
  const computedLeft = typeof left === 'number' ? left + offset.x : `calc(${left} + ${offset.x}px)`;
  const computedTop = typeof top === 'number' ? top + offset.y : `calc(${top} + ${offset.y}px)`;

  return (
    <svg
      style={{
        position: 'absolute',
        zIndex,
        filter: `blur(${blur}px)`,
        opacity,
        left: computedLeft,
        top: computedTop,
        transform: `rotate(${angle}deg)`,
        transition: 'transform 0.1s linear',
        ...style,
      }}
      width={width}
      height={height}
      viewBox="0 0 300 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse
        cx="150"
        cy="150"
        rx={rx}
        ry={ry}
        fill={color}
      />
    </svg>
  );
} 