"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { aboutData } from "@/constants";

export default function JourneyMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [activeLocation, setActiveLocation] = useState<number | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapLoaded) return;

    let isMounted = true;

    const loadMap = async () => {
      const L = (await import("leaflet")).default;

      if (!isMounted || !mapRef.current) return;

      // Check if map already initialized on this element
      if ((mapRef.current as HTMLDivElement & { _leaflet_id?: number })._leaflet_id) return;

      const map = L.map(mapRef.current, {
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: false,
        dragging: true,
        doubleClickZoom: false,
      }).setView([30, 40], 3);

      // Dark tile layer
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        { maxZoom: 19 }
      ).addTo(map);

      // Custom marker icon
      const createIcon = (isCurrent: boolean) =>
        L.divIcon({
          className: "custom-marker",
          html: `<div style="
            width: ${isCurrent ? "16px" : "12px"};
            height: ${isCurrent ? "16px" : "12px"};
            background: ${isCurrent ? "#00d9ff" : "#7c3aed"};
            border-radius: 50%;
            border: 2px solid ${isCurrent ? "#00d9ff" : "#7c3aed"};
            box-shadow: 0 0 ${isCurrent ? "15px" : "8px"} ${isCurrent ? "#00d9ff" : "#7c3aed"};
          "></div>`,
          iconSize: [isCurrent ? 16 : 12, isCurrent ? 16 : 12],
          iconAnchor: [isCurrent ? 8 : 6, isCurrent ? 8 : 6],
        });

      // Add markers
      const markers: L.LatLng[] = [];
      aboutData.locations.forEach((loc) => {
        const latLng = L.latLng(loc.lat, loc.lng);
        markers.push(latLng);
        L.marker(latLng, { icon: createIcon(loc.current) })
          .addTo(map)
          .bindPopup(
            `<div style="text-align:center;font-family:monospace;">
              <strong style="color:#00d9ff;">${loc.name}</strong><br/>
              <span style="color:#999;">${loc.country}</span>
              ${loc.current ? '<br/><span style="color:#00d9ff;font-size:11px;">Current Location</span>' : ""}
            </div>`,
            {
              className: "dark-popup",
            }
          );
      });

      // Draw route line between locations (reversed to show journey order)
      const routeCoords = [...aboutData.locations].reverse().map((l) => L.latLng(l.lat, l.lng));
      L.polyline(routeCoords, {
        color: "#7c3aed",
        weight: 2,
        opacity: 0.5,
        dashArray: "8, 8",
      }).addTo(map);

      // Fit bounds to show all markers
      if (markers.length > 0) {
        map.fitBounds(L.latLngBounds(markers), { padding: [40, 40] });
      }

      setMapLoaded(true);
    };

    loadMap();

    return () => {
      isMounted = false;
    };
  }, [mapLoaded]);

  return (
    <div className="glass-card p-6 mb-8">
      <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-[#00d9ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        My Journey
      </h4>

      {/* Interactive Map */}
      <div
        ref={mapRef}
        className="w-full h-48 rounded-lg overflow-hidden mb-4 border border-[#00d9ff]/10"
        style={{ background: "#0d1117" }}
      />

      {/* Location List */}
      <div className="space-y-2">
        {aboutData.locations.map((location, index) => (
          <motion.div
            key={index}
            onMouseEnter={() => setActiveLocation(index)}
            onMouseLeave={() => setActiveLocation(null)}
            className={`flex items-center gap-3 p-3 rounded-lg transition-all cursor-pointer ${
              location.current || activeLocation === index
                ? "bg-[#00d9ff]/10 border border-[#00d9ff]/30"
                : "bg-white/5 hover:bg-white/10 border border-transparent"
            }`}
          >
            <div
              className={`w-3 h-3 rounded-full flex-shrink-0 ${
                location.current ? "bg-[#00d9ff] pulse-glow" : "bg-[#7c3aed]"
              }`}
            />
            <div className="flex-1 min-w-0">
              <span className="text-white font-medium">{location.name}</span>
              <span className="text-gray-400">, {location.country}</span>
            </div>
            {location.current && (
              <span className="text-xs text-[#00d9ff] bg-[#00d9ff]/10 px-2 py-1 rounded-full flex-shrink-0">
                Current
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
