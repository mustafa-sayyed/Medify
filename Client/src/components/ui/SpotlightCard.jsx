import { useRef, useState } from "react";

const SpotlightCard = ({
  children,
  className = "",
  spotlightColor = "rgba(255, 255, 255, 0.15)",
}) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;

    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPosition({ x, y });
  };

  const handleFocus = () => {
    setOpacity(0.8);
  };

  const handleBlur = () => {
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setOpacity(0.8);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      tabIndex={0} // allows focus by keyboard
      className={`relative rounded-3xl border border-neutral-800 bg-neutral-900/40 backdrop-blur-sm overflow-hidden p-8 transition-all duration-300 ease-in-out hover:border-neutral-700 cursor-default ${className}`}
    >
      {/* Spotlight layer */}
      <div
        className="pointer-events-none absolute inset-0 transition-all duration-300 ease-out"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 50%)`,
          mixBlendMode: 'screen'
        }}
      />
      {/* Additional glow effect */}
      {isHovered && (
        <div
          className="pointer-events-none absolute inset-0 transition-all duration-300 ease-out"
          style={{
            opacity: 0.4,
            background: `radial-gradient(200px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
            mixBlendMode: 'overlay'
          }}
        />
      )}
      {/* Content inside the card */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default SpotlightCard;
