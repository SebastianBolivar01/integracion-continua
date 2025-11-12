// src/components/GlobeScene.tsx
import React, { useRef } from "react";
import Globe, { GlobeMethods } from "react-globe.gl";

export default function GlobeScene() {
const globeEl = useRef<GlobeMethods>();

interface Country {
    lat: number;
    lng: number;
    name: string;
    info: string;
}

// ejemplo: datos simples para 3 países
const countries: Country[] = [
    { lat: 4.711, lng: -74.0721, name: "Colombia", info: "Capital: Bogotá" },
    { lat: 40.4168, lng: -3.7038, name: "España", info: "Capital: Madrid" },
    { lat: 51.5072, lng: -0.1276, name: "Reino Unido", info: "Capital: Londres" }
];

return (
    <div style={{ display: "flex" }}>
    <div style={{ width: "70vw", height: "70vh" }}>
        <Globe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        pointsData={countries}
        pointLat="lat"
        pointLng="lng"
        pointLabel={(d) => `<b>${(d as Country).name}</b><br/>${(d as Country).info}`}
        pointRadius={0.5}
        pointColor={() => '#ffcc00'} // Añadir color para que los puntos sean visibles
        onPointClick={(d) => alert(`${(d as Country).name}: ${(d as Country).info}`)}
        />
    </div>

    <div style={{ width: 240, padding: 8 }}>
        <h3>Información</h3>
        <p>Haz clic en un punto para ver información.</p>
        <ul>
        {countries.map((c) => (
            <li key={c.name}>{c.name} — {c.info}</li>
        ))}
        </ul>
    </div>
    </div>
);
}
