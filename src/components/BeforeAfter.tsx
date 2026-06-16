import React, { useState, useRef, useEffect } from 'react';

interface BeforeAfterProps {
  beforeImage: string;
  afterImage: string;
}

export const BeforeAfter: React.FC<BeforeAfterProps> = ({ beforeImage, afterImage }) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let position = (x / rect.width) * 100;
    if (position < 0) position = 0;
    if (position > 100) position = 100;
    setSliderPosition(position);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging.current) return;
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  return (
    <div 
      className="before-after-container" 
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
    >
      {/* Before Image (Background) */}
      <img 
        src={beforeImage} 
        alt="Boya Öncesi Duvar" 
        className="before-image"
        draggable={false}
      />
      <span className="image-label before">Öncesi (Kirli & Yıpranmış)</span>

      {/* After Image (Overlay, width controlled by slider) */}
      <div 
        className="after-image-container" 
        style={{ width: `${sliderPosition}%` }}
      >
        <img 
          src={afterImage} 
          alt="Boya Sonrası Kusursuz Duvar" 
          className="after-image"
          style={{ width: containerRef.current?.getBoundingClientRect().width }}
          draggable={false}
        />
        <span className="image-label after">Sonrası (Kusursuz Boyanmış)</span>
      </div>

      {/* Slider Bar & Handle */}
      <div 
        className="slider-bar" 
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="slider-handle">
          ↔
        </div>
      </div>
    </div>
  );
};
