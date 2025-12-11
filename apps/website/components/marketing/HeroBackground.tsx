"use client";

import { useEffect, useRef, useState } from "react";

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [canvasReady, setCanvasReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    // Check if mobile for performance optimization
    setIsMobile(window.innerWidth < 768);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Defer canvas initialization to after page is interactive (improves LCP)
  // Skip on mobile for better performance
  useEffect(() => {
    if (prefersReducedMotion || isMobile) return;

    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let idleId: number | undefined;

    // Use requestIdleCallback if available, otherwise setTimeout
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(() => {
        setCanvasReady(true);
      }, { timeout: 2000 });
    } else {
      timeoutId = setTimeout(() => {
        setCanvasReady(true);
      }, 100);
    }

    return () => {
      if (idleId !== undefined && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    };
  }, [prefersReducedMotion, isMobile]);

  useEffect(() => {
    // Skip canvas animation if reduced motion is preferred, canvas not ready, or mobile
    if (prefersReducedMotion || !canvasReady || isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    let connections: Connection[] = [];

    // Detect if mobile for reduced particle count
    const isMobileView = window.innerWidth < 768;
    const MAX_PARTICLES = isMobileView ? 20 : 40;
    const MAX_CONNECTIONS = isMobileView ? 8 : 12;
    const CONNECTION_DISTANCE_SQUARED = 150 * 150; // Use squared distance to avoid sqrt
    const MAX_CONNECTIONS_PER_PARTICLE = 3;

    // Pre-defined colors (avoid creating strings in loop)
    const PARTICLE_COLORS = [
      "rgba(56, 189, 248, 0.8)",  // cyan-400
      "rgba(34, 211, 238, 0.8)",  // cyan-400 lighter
      "rgba(6, 182, 212, 0.8)",   // cyan-500
      "rgba(20, 184, 166, 0.8)",  // teal-500
      "rgba(52, 211, 153, 0.7)",  // emerald-400
    ];

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Optimized Particle class - no gradients, simple circles
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      glowColor: string;
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

        const colorIndex = Math.floor(Math.random() * PARTICLE_COLORS.length);
        this.color = PARTICLE_COLORS[colorIndex];
        // Pre-calculate glow color (lower opacity version)
        this.glowColor = this.color.replace("0.8", "0.3").replace("0.7", "0.25");
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

        // Simple glow effect using larger circle (no gradient creation)
        ctx.beginPath();
        ctx.arc(this.x, this.y, currentRadius * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = this.glowColor;
        ctx.fill();

        // Core particle
        ctx.beginPath();
        ctx.arc(this.x, this.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    // Optimized Connection class - simplified drawing
    class Connection {
      startX: number;
      startY: number;
      endX: number;
      endY: number;
      progress: number;
      speed: number;
      opacity: number;
      direction: number;
      color: string;

      constructor(canvasWidth: number, canvasHeight: number) {
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
        this.progress = 0;
        this.speed = 0.003 + Math.random() * 0.005;
        this.opacity = 0.1 + Math.random() * 0.2;
        this.direction = 1;
        this.color = `rgba(56, 189, 248, ${this.opacity})`;
      }

      update() {
        this.progress += this.speed * this.direction;

        if (this.progress >= 1) {
          this.direction = -1;
        } else if (this.progress <= 0) {
          this.direction = 1;
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

        // Simple line without gradient
        ctx.beginPath();
        ctx.moveTo(this.startX, this.startY);
        ctx.lineTo(currentX, currentY);
        ctx.strokeStyle = this.color;
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
      particles = [];
      for (let i = 0; i < MAX_PARTICLES; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }

      connections = [];
      for (let i = 0; i < MAX_CONNECTIONS; i++) {
        connections.push(new Connection(canvas.width, canvas.height));
      }
    };
    initParticles();

    // Pre-calculate connection line color
    const connectionLineColor = "rgba(56, 189, 248, 0.15)";

    // Animation loop with optimized particle connections
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Optimized: Use squared distance, cap connections per particle
      const connectionCounts = new Array(particles.length).fill(0);

      for (let i = 0; i < particles.length; i++) {
        if (connectionCounts[i] >= MAX_CONNECTIONS_PER_PARTICLE) continue;

        for (let j = i + 1; j < particles.length; j++) {
          if (connectionCounts[j] >= MAX_CONNECTIONS_PER_PARTICLE) continue;

          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distanceSquared = dx * dx + dy * dy;

          if (distanceSquared < CONNECTION_DISTANCE_SQUARED) {
            // Calculate opacity based on squared distance (approximate)
            const opacity = (1 - distanceSquared / CONNECTION_DISTANCE_SQUARED) * 0.15;

            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();

            connectionCounts[i]++;
            connectionCounts[j]++;
          }
        }
      }

      // Update and draw flowing connections
      for (let i = 0; i < connections.length; i++) {
        connections[i].update();
        connections[i].draw(ctx);
      }

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(canvas.width, canvas.height);
        particles[i].draw(ctx);
      }

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [prefersReducedMotion, canvasReady, isMobile]);

  return (
    <>
      {/* Canvas for particle animation - only render on desktop if motion allowed */}
      {!prefersReducedMotion && !isMobile && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            opacity: 0.6,
            willChange: 'contents',
            transform: 'translateZ(0)',  // Force GPU layer
            backfaceVisibility: 'hidden',
          }}
        />
      )}

      {/* Gradient overlays for depth */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          contain: 'paint',
          willChange: 'transform',
          transform: 'translateZ(0)',
        }}
      >
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

        {/* Animated gradient orbs - CSS handles reduced motion */}
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
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full hero-glow pointer-events-none"
        style={{
          willChange: 'transform',
          transform: 'translateX(-50%) translateZ(0)',
          backfaceVisibility: 'hidden',
        }}
      />
    </>
  );
}
