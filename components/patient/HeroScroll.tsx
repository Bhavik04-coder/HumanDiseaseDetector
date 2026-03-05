'use client';

import { useRef, useEffect, useState } from 'react';
import { useImagePreloader } from '@/hooks/useImagePreloader';

const FRAME_COUNT = 127;
const BASE_PATH = '/hero-images';

export default function HeroScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  const { images, isLoading, progress } = useImagePreloader(FRAME_COUNT, BASE_PATH);

  // Mouse move handler for both frame change and rotation
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const width = rect.width;
      const height = rect.height;
      
      // Calculate frame based on mouse X position
      const frame = Math.floor((x / width) * (FRAME_COUNT - 1));
      setCurrentFrame(Math.max(0, Math.min(FRAME_COUNT - 1, frame)));

      // Calculate rotation based on mouse position (only when hovered)
      if (isHovered) {
        const centerX = width / 2;
        const centerY = height / 2;
        const rotateY = ((x - centerX) / centerX) * 15; // Max 15 degrees
        const rotateX = ((centerY - y) / centerY) * 15; // Max 15 degrees
        setRotation({ x: rotateX, y: rotateY });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, [isHovered]);

  // Render canvas frames
  useEffect(() => {
    if (!canvasRef.current || images.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = images[currentFrame];
    if (img) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const canvasAspect = canvas.width / canvas.height;
      const imgAspect = img.width / img.height;

      let drawWidth, drawHeight, offsetX, offsetY;

      if (canvasAspect > imgAspect) {
        drawWidth = canvas.width;
        drawHeight = canvas.width / imgAspect;
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        drawHeight = canvas.height;
        drawWidth = canvas.height * imgAspect;
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }
  }, [images, currentFrame]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-teal-100 rounded-2xl">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm font-medium text-blue-900">{progress}%</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setRotation({ x: 0, y: 0 });
      }}
      className="relative w-full h-full cursor-ew-resize group perspective-1000"
      style={{ perspective: '1000px' }}
    >
      <div
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
        }}
        className="w-full h-full"
      >
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          className="w-full h-full object-cover rounded-2xl shadow-2xl"
        />
      </div>
      
      {/* Hover instruction */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Move mouse to explore
      </div>
    </div>
  );
}
