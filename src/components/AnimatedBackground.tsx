import React, { useEffect, useRef } from 'react';

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let mouseX = 0;
    let mouseY = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    class Ripple {
      x: number;
      y: number;
      radius: number;
      color: string;
      alpha: number;
      lineWidth: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.radius = 0;
        this.color = '#4a90e2';
        this.alpha = 1;
        this.lineWidth = 2;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(74, 144, 226, ${this.alpha})`;
        ctx.lineWidth = this.lineWidth;
        ctx.stroke();
      }

      update() {
        this.radius += 2;
        this.alpha -= 0.01;
        this.lineWidth -= 0.01;
      }
    }

    let ripples: Ripple[] = [];

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ripples.forEach((ripple, index) => {
        ripple.draw();
        ripple.update();
        if (ripple.alpha <= 0) {
          ripples.splice(index, 1);
        }
      });

      if (Math.random() < 0.03) {
        ripples.push(new Ripple(Math.random() * canvas.width, Math.random() * canvas.height));
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      ripples.push(new Ripple(mouseX, mouseY));
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10 bg-gradient-to-br from-blue-400 to-cyan-600" />;
};

export default AnimatedBackground;

