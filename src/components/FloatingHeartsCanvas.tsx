import React, { useEffect, useRef } from 'react';

interface HeartParticle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  sway: number;
  swaySpeed: number;
}

export const FloatingHeartsCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const colors = [
      'rgba(255, 51, 102, ',   // vivid rose pink
      'rgba(244, 63, 94, ',    // rose red
      'rgba(251, 113, 133, ',  // soft pink
      'rgba(225, 29, 72, ',    // deep crimson
      'rgba(255, 182, 193, ',  // blush baby pink
    ];

    const particles: HeartParticle[] = [];
    const count = Math.min(38, Math.floor(width / 35));

    function createParticle(randomY = false): HeartParticle {
      return {
        x: Math.random() * width,
        y: randomY ? Math.random() * height : height + 20 + Math.random() * 40,
        size: Math.random() * 14 + 8,
        speedY: Math.random() * 0.7 + 0.35,
        speedX: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.45 + 0.15,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: (Math.random() - 0.5) * 0.4,
        rotationSpeed: (Math.random() - 0.5) * 0.01,
        sway: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.02 + 0.01,
      };
    }

    for (let i = 0; i < count; i++) {
      particles.push(createParticle(true));
    }

    // Sparkle star points
    const stars = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.6 + 0.6,
      opacity: Math.random() * 0.6 + 0.2,
      twinkleSpeed: Math.random() * 0.03 + 0.01,
    }));

    function drawHeart(c: CanvasRenderingContext2D, x: number, y: number, size: number, opacity: number, colorPrefix: string, rotation: number) {
      c.save();
      c.translate(x, y);
      c.rotate(rotation);
      c.beginPath();

      const topCurveHeight = size * 0.3;
      c.moveTo(0, topCurveHeight);
      
      // Top left curve
      c.bezierCurveTo(-size / 2, -topCurveHeight, -size, topCurveHeight / 2, 0, size);
      // Top right curve
      c.bezierCurveTo(size, topCurveHeight / 2, size / 2, -topCurveHeight, 0, topCurveHeight);

      c.closePath();
      c.fillStyle = `${colorPrefix}${opacity})`;
      c.shadowColor = `${colorPrefix}0.6)`;
      c.shadowBlur = 8;
      c.fill();
      c.restore();
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle twinkling stars
      stars.forEach((star) => {
        star.opacity += Math.sin(Date.now() * star.twinkleSpeed) * 0.015;
        const op = Math.max(0.1, Math.min(0.8, star.opacity));
        ctx.fillStyle = `rgba(255, 230, 240, ${op})`;
        ctx.shadowColor = 'rgba(255, 100, 150, 0.4)';
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Update & draw hearts
      particles.forEach((p, idx) => {
        p.y -= p.speedY;
        p.sway += p.swaySpeed;
        p.x += Math.sin(p.sway) * 0.6 + p.speedX;
        p.rotation += p.rotationSpeed;

        if (p.y < -30 || p.x < -40 || p.x > width + 40) {
          particles[idx] = createParticle(false);
        } else {
          drawHeart(ctx, p.x, p.y, p.size, p.opacity, p.color, p.rotation);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Spawn heart on user click
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      for (let i = 0; i < 4; i++) {
        const heart: HeartParticle = {
          x: clientX + (Math.random() - 0.5) * 20,
          y: clientY + (Math.random() - 0.5) * 20,
          size: Math.random() * 12 + 10,
          speedY: Math.random() * 1.5 + 0.8,
          speedX: (Math.random() - 0.5) * 1.4,
          opacity: 0.8,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: (Math.random() - 0.5) * 0.6,
          rotationSpeed: (Math.random() - 0.5) * 0.03,
          sway: Math.random() * Math.PI,
          swaySpeed: 0.03,
        };
        particles.push(heart);
        if (particles.length > 60) {
          particles.shift();
        }
      }
    };

    window.addEventListener('click', handlePointerDown);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handlePointerDown);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="floating-hearts-canvas"
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};
