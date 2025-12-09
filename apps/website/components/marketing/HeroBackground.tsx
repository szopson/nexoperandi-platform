"use client";

import { useEffect, useRef } from "react";

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    let connections: Connection[] = [];

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Particle class
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      pulsePhase: number;
      pulseSpeed: number;

      constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.radius = Math.random() * 2 + 1;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.pulseSpeed = 0.02 + Math.random() * 0.02;

        // Emerald/Teal/Cyan gradient colors
        const colors = [
          "rgba(56, 189, 248, 0.8)",  // cyan-400
          "rgba(34, 211, 238, 0.8)",  // cyan-400 lighter
          "rgba(6, 182, 212, 0.8)",   // cyan-500
          "rgba(20, 184, 166, 0.8)",  // teal-500
          "rgba(52, 211, 153, 0.7)",  // emerald-400
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update(canvasWidth: number, canvasHeight: number) {
        this.x += this.vx;
        this.y += this.vy;
        this.pulsePhase += this.pulseSpeed;

        // Wrap around edges
        if (this.x < 0) this.x = canvasWidth;
        if (this.x > canvasWidth) this.x = 0;
        if (this.y < 0) this.y = canvasHeight;
        if (this.y > canvasHeight) this.y = 0;
      }

      draw(ctx: CanvasRenderingContext2D) {
        const pulse = Math.sin(this.pulsePhase) * 0.3 + 0.7;
        const currentRadius = this.radius * pulse;

        // Glow effect
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, currentRadius * 3
        );
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.arc(this.x, this.y, currentRadius * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(this.x, this.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    // Connection class for animated lines
    class Connection {
      startX: number;
      startY: number;
      endX: number;
      endY: number;
      progress: number;
      speed: number;
      opacity: number;
      direction: number;

      constructor(canvasWidth: number, canvasHeight: number) {
        // Create lines that flow from edges toward center
        const side = Math.floor(Math.random() * 4);
        const centerX = canvasWidth / 2;
        const centerY = canvasHeight / 2;

        switch (side) {
          case 0: // top
            this.startX = Math.random() * canvasWidth;
            this.startY = 0;
            break;
          case 1: // right
            this.startX = canvasWidth;
            this.startY = Math.random() * canvasHeight;
            break;
          case 2: // bottom
            this.startX = Math.random() * canvasWidth;
            this.startY = canvasHeight;
            break;
          default: // left
            this.startX = 0;
            this.startY = Math.random() * canvasHeight;
        }

        // End point near center with some randomness
        this.endX = centerX + (Math.random() - 0.5) * 300;
        this.endY = centerY + (Math.random() - 0.5) * 300;

        this.progress = 0;
        this.speed = 0.003 + Math.random() * 0.005;
        this.opacity = 0.1 + Math.random() * 0.2;
        this.direction = 1;
      }

      update() {
        this.progress += this.speed * this.direction;

        if (this.progress >= 1) {
          this.direction = -1;
        } else if (this.progress <= 0) {
          this.direction = 1;
          // Reset with new position
          this.reset();
        }
      }

      reset() {
        const canvasWidth = window.innerWidth;
        const canvasHeight = window.innerHeight;
        const side = Math.floor(Math.random() * 4);
        const centerX = canvasWidth / 2;
        const centerY = canvasHeight / 2;

        switch (side) {
          case 0:
            this.startX = Math.random() * canvasWidth;
            this.startY = 0;
            break;
          case 1:
            this.startX = canvasWidth;
            this.startY = Math.random() * canvasHeight;
            break;
          case 2:
            this.startX = Math.random() * canvasWidth;
            this.startY = canvasHeight;
            break;
          default:
            this.startX = 0;
            this.startY = Math.random() * canvasHeight;
        }

        this.endX = centerX + (Math.random() - 0.5) * 300;
        this.endY = centerY + (Math.random() - 0.5) * 300;
      }

      draw(ctx: CanvasRenderingContext2D) {
        const currentX = this.startX + (this.endX - this.startX) * this.progress;
        const currentY = this.startY + (this.endY - this.startY) * this.progress;

        // Create gradient along the line
        const gradient = ctx.createLinearGradient(
          this.startX, this.startY,
          currentX, currentY
        );
        gradient.addColorStop(0, "transparent");
        gradient.addColorStop(0.5, `rgba(56, 189, 248, ${this.opacity})`);
        gradient.addColorStop(1, `rgba(34, 211, 238, ${this.opacity * 1.5})`);

        ctx.beginPath();
        ctx.moveTo(this.startX, this.startY);
        ctx.lineTo(currentX, currentY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Bright dot at the end
        ctx.beginPath();
        ctx.arc(currentX, currentY, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${this.opacity * 2})`;
        ctx.fill();
      }
    }

    // Initialize particles and connections
    const initParticles = () => {
      const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
      particles = [];
      for (let i = 0; i < Math.min(particleCount, 80); i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }

      connections = [];
      for (let i = 0; i < 15; i++) {
        connections.push(new Connection(canvas.width, canvas.height));
      }
    };
    initParticles();

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const opacity = (1 - distance / 150) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Update and draw flowing connections
      connections.forEach((connection) => {
        connection.update();
        connection.draw(ctx);
      });

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update(canvas.width, canvas.height);
        particle.draw(ctx);
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      {/* Canvas for particle animation */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ opacity: 0.6 }}
      />

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Central radial glow - Emerald/Teal/Cyan */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 50% 50%, rgba(20, 184, 166, 0.15) 0%, transparent 50%),
              radial-gradient(ellipse 60% 40% at 60% 40%, rgba(56, 189, 248, 0.1) 0%, transparent 40%),
              radial-gradient(ellipse 50% 30% at 40% 60%, rgba(52, 211, 153, 0.08) 0%, transparent 35%)
            `
          }}
        />

        {/* Animated gradient orbs */}
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />

        {/* Top edge glow */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

        {/* Grid pattern with mask */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(15, 23, 42, 0.8) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(15, 23, 42, 0.8) 1px, transparent 1px)
            `,
            backgroundSize: '4rem 4rem',
            maskImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, black 70%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, black 70%, transparent 100%)'
          }}
        />
      </div>

      {/* Hero glow overlay */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full hero-glow pointer-events-none" />
    </>
  );
}
