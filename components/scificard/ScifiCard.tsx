'use client';
import React, { useState, useEffect, useRef } from 'react';

// Types
interface ScifiCardProps {
  text: string;
  image: string;
  subtext?: string;
  height?: number;
  width?: number;
}
interface BorderAccentProps {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}
interface TargetLineProps {
  isHovered: boolean;
  isVertical: boolean;
  style?: React.CSSProperties;
}

// Constants
const ANIMATION_DURATION = 8000;
const RETURN_DURATION = 1000;
const DEFAULT_HEIGHT = 256;
const DEFAULT_WIDTH = 192;

// Helper Components
const TargetLine: React.FC<TargetLineProps> = ({
  isHovered,
  isVertical,
  style,
}) => (
  <div
    style={{
      ...style,
      width: isHovered ? '100%' : '0%',
      transition: `all ${isHovered ? '0.8s' : '0.2s'} ease-in-out`,
    }}
    className={`bg-white/30 ${isVertical ? 'w-[2px]' : 'h-[2px]'}`}
  />
);

const BorderAccent: React.FC<BorderAccentProps> = ({ position }) => {
  const styles = {
    'top-left':
      'border-l-2 border-t-2 top-0 left-0 group-hover/card:-translate-x-1 group-hover/card:-translate-y-1',
    'top-right':
      'border-r-2 border-t-2 top-0 right-0 group-hover/card:translate-x-1 group-hover/card:-translate-y-1',
    'bottom-left':
      'border-l-2 border-b-2 bottom-0 left-0 group-hover/card:-translate-x-1 group-hover/card:translate-y-1',
    'bottom-right':
      'border-r-2 border-b-2 bottom-0 right-0 group-hover/card:translate-x-1 group-hover/card:translate-y-1',
  };

  return (
    <div
      className={`
        group-hover/card:scale-[115%]
        absolute h-2 w-2 border-white
        transition-all duration-500 group-hover:scale-110
        ${styles[position]}
      `}
    />
  );
};

const ScifiCard: React.FC<ScifiCardProps> = ({
  text,
  image,
  height = DEFAULT_HEIGHT,
  width = DEFAULT_WIDTH,
  subtext,
}) => {
  const [position, setPosition] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const startTimeRef = useRef<number>();
  const currentPositionRef = useRef(0);

  useEffect(() => {
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;

      if (isHovered) {
        const progress =
          (elapsed % (ANIMATION_DURATION * 2)) / ANIMATION_DURATION;
        const newPosition =
          progress <= 1 ? progress * 100 : 200 - progress * 100;
        setPosition(newPosition);
        currentPositionRef.current = newPosition;
      } else {
        const returnProgress = Math.min(elapsed / RETURN_DURATION, 1);
        const newPosition = currentPositionRef.current * (1 - returnProgress);

        setPosition(newPosition);
        currentPositionRef.current = newPosition;

        if (newPosition === 0) {
          cancelAnimationFrame(animationFrameId);
          startTimeRef.current = undefined;
          return;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    if (isHovered || currentPositionRef.current > 0) {
      startTimeRef.current = undefined;
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isHovered]);

  return (
    <main className="p-4">
      <div
        style={{
          backgroundImage: `url(${image})`,
          height: `${height}px`,
          width: `${width}px`,
          backgroundSize: '200% 100%',
          backgroundPosition: `${position}% center`,
        }}
        className="group/card relative cursor-pointer p-4 rounded-sm hover:scale-110 transition-transform duration-200 bg-no-repeat"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          style={{
            height: `${height}px`,
            width: `${width}px`,
            background: 'url(/scanline2.png)',
            backgroundSize: '100% 50%',
          }}
          className="loop-bg absolute left-0 top-0 backdrop-blur-[2px] transition-all group-hover/card:backdrop-blur-0"
        >
          <section className="flex flex-col h-full w-full items-center justify-center">
            <div className="flex h-fit w-full items-center justify-center">
              <TargetLine
                isHovered={isHovered}
                isVertical={false}
                style={{ marginRight: 'auto' }}
              />
              <div className="group-hover/card:opacity-100 opacity-85 shrink-0 transition-all self-center border p-2 text-white bg-gray-600/60  text-xl font-bold font-mono">
                {text}
              </div>
              <TargetLine
                isHovered={isHovered}
                isVertical={false}
                style={{ marginLeft: 'auto' }}
              />
            </div>
          </section>
        </div>

        {subtext && (
          <div
            style={{
              transform: isHovered ? 'translateY(0)' : 'translateY(35%)',
              opacity: isHovered ? 1 : 0,
              transition: 'transform 0.3s, opacity 0.4s',
            }}
            className="bg-black/30 backdrop-blur-[1px] absolute bottom-0 left-0 right-0 p-2 text-white text-sm font-mono"
          >
            {subtext}
          </div>
        )}

        <BorderAccent position="top-left" />
        <BorderAccent position="top-right" />
        <BorderAccent position="bottom-left" />
        <BorderAccent position="bottom-right" />
      </div>
    </main>
  );
};
export default ScifiCard;
