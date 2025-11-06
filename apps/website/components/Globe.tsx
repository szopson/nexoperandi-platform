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

      // Create globe instance
      const myGlobe = new Globe(globeEl.current!)
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
        .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
        .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
        .width(width)
        .height(height);

      // Define major cities for connection arcs
      const cities = [
        { lat: 40.7128, lng: -74.0060, name: 'New York' },      // USA
        { lat: 51.5074, lng: -0.1278, name: 'London' },         // UK
        { lat: 35.6762, lng: 139.6503, name: 'Tokyo' },         // Japan
        { lat: -33.8688, lng: 151.2093, name: 'Sydney' },       // Australia
        { lat: 19.4326, lng: -99.1332, name: 'Mexico City' },   // Mexico
        { lat: -23.5505, lng: -46.6333, name: 'São Paulo' },    // Brazil
        { lat: 28.6139, lng: 77.2090, name: 'New Delhi' },      // India
        { lat: 1.3521, lng: 103.8198, name: 'Singapore' },      // Singapore
        { lat: 52.2297, lng: 21.0122, name: 'Warsaw' },         // Poland (your location!)
        { lat: 55.7558, lng: 37.6173, name: 'Moscow' },         // Russia
        { lat: 31.2304, lng: 121.4737, name: 'Shanghai' },      // China
        { lat: 25.2048, lng: 55.2708, name: 'Dubai' },          // UAE
      ];

      // Create connection arcs between cities
      const arcsData: any[] = [];
      const centerCity = cities[8]; // Warsaw as center

      cities.forEach(city => {
        if (city.name !== centerCity.name) {
          arcsData.push({
            startLat: centerCity.lat,
            startLng: centerCity.lng,
            endLat: city.lat,
            endLng: city.lng,
            color: ['rgba(59, 130, 246, 0.5)', 'rgba(96, 165, 250, 0.3)'], // Blue gradient
          });
        }
      });

      // Add arcs to globe
      myGlobe
        .arcsData(arcsData)
        .arcColor('color')
        .arcDashLength(0.4)
        .arcDashGap(0.2)
        .arcDashAnimateTime(3000)
        .arcStroke(0.5)
        .arcsTransitionDuration(0);

      // Add points for cities
      myGlobe
        .pointsData(cities)
        .pointLat('lat')
        .pointLng('lng')
        .pointColor(() => 'rgba(59, 130, 246, 0.8)')
        .pointAltitude(0.01)
        .pointRadius(0.5);

      // Auto-rotate
      myGlobe.controls().autoRotate = true;
      myGlobe.controls().autoRotateSpeed = 0.5;
      myGlobe.controls().enableZoom = false;

      // Set initial view point (focus on Europe/USA)
      myGlobe.pointOfView({ lat: 40, lng: -20, altitude: 2.5 }, 0);

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
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-sm text-gray-600 font-medium">Global AI Automation</p>
      </div>
    </div>
  );
}
