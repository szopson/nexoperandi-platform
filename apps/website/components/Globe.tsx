'use client';

import { useEffect, useRef } from 'react';

interface GlobeProps {
  width?: number;
  height?: number;
}

export default function Globe({ width = 600, height = 600 }: GlobeProps) {
  const globeEl = useRef<HTMLDivElement>(null);
  const globeInstance = useRef<any>(null);

  useEffect(() => {
    if (!globeEl.current) return;

    // Import Globe constructor dynamically
    import('globe.gl').then((GlobeModule) => {
      const Globe = GlobeModule.default;

      // Generate random points on globe surface for particle effect
      const N = 300; // number of particles
      const gData = Array.from({ length: N }, () => ({
        lat: (Math.random() - 0.5) * 180,
        lng: (Math.random() - 0.5) * 360,
        size: Math.random() * 0.5 + 0.3,
        color: ['#3b82f6', '#60a5fa', '#93c5fd'][Math.floor(Math.random() * 3)]
      }));

      // Create globe instance - minimal, clean version
      const myGlobe = new Globe(globeEl.current!)
        .backgroundColor('rgba(255,255,255,0)')
        .showAtmosphere(false)
        .showGraticules(false)
        .globeMaterial(new (window as any).THREE.MeshBasicMaterial({
          color: '#f8fafc',
          transparent: true,
          opacity: 0.1
        }))
        .width(width)
        .height(height);

      // Add particles as points
      myGlobe
        .pointsData(gData)
        .pointLat('lat')
        .pointLng('lng')
        .pointColor('color')
        .pointAltitude(0)
        .pointRadius('size');

      // Auto-rotate - slower and smoother
      myGlobe.controls().autoRotate = true;
      myGlobe.controls().autoRotateSpeed = 0.3;
      myGlobe.controls().enableZoom = false;
      myGlobe.controls().enablePan = false;

      // Set initial view point (centered view)
      myGlobe.pointOfView({ lat: 20, lng: 0, altitude: 2.2 }, 0);

      // Store instance for cleanup
      globeInstance.current = myGlobe;

      // Cleanup
      return () => {
        if (globeEl.current && globeInstance.current) {
          globeEl.current.innerHTML = '';
          globeInstance.current = null;
        }
      };
    }).catch((error) => {
      console.error('Failed to load globe:', error);
    });
  }, [width, height]);

  return (
    <div className="relative">
      <div ref={globeEl} className="globe-container" />
    </div>
  );
}
