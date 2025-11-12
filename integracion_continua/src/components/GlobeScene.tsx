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
    { lat: 38.9072, lng: -77.0369, name: "Estados Unidos", info: "Capital: Washington D. C. (cerca de Nueva York y la Estatua de la Libertad)" },
    { lat: 19.4326, lng: -99.1332, name: "México", info: "Capital: Ciudad de México (mariachi y tacos 🌮)" },
    { lat: -34.6037, lng: -58.3816, name: "Argentina", info: "Capital: Buenos Aires (el tango 💃)" },
    { lat: -15.7939, lng: -47.8828, name: "Brasil", info: "Capital: Brasilia (fútbol y carnaval 🎭)" },
    { lat: 4.711, lng: -74.0721, name: "Colombia", info: "Capital: Bogotá (cafés y montañas ☕)" },
    { lat: -33.4489, lng: -70.6693, name: "Chile", info: "Capital: Santiago (cerca de los Andes 🏔️)" },
    { lat: 48.8566, lng: 2.3522, name: "Francia", info: "Capital: París (la Torre Eiffel 🗼)" },
    { lat: 51.5072, lng: -0.1276, name: "Inglaterra", info: "Capital: Londres (Big Ben y autobuses rojos 🚌)" },
    { lat: 41.9028, lng: 12.4964, name: "Italia", info: "Capital: Roma (el Coliseo 🏛️)" },
    { lat: 40.4168, lng: -3.7038, name: "España", info: "Capital: Madrid (flamenco y toros 💃🐂)" },
    { lat: 59.9139, lng: 10.7522, name: "Noruega", info: "Capital: Oslo (auroras boreales 🌌)" },
    { lat: 64.1466, lng: -21.9426, name: "Islandia", info: "Capital: Reikiavik (volcanes y glaciares ❄️)" },
    { lat: 35.6895, lng: 139.6917, name: "Japón", info: "Capital: Tokio (tecnología y samuráis 🗾)" },
    { lat: 39.9042, lng: 116.4074, name: "China", info: "Capital: Pekín (la Gran Muralla 🏯)" },
    { lat: 28.6139, lng: 77.2090, name: "India", info: "Capital: Nueva Delhi (el Taj Mahal 🕌)" },
    { lat: 1.3521, lng: 103.8198, name: "Singapur", info: "Ciudad-estado moderna 🌆" },
    { lat: 30.0444, lng: 31.2357, name: "Egipto", info: "Capital: El Cairo (pirámides y faraones 🏜️)" },
    { lat: -1.2921, lng: 36.8219, name: "Kenia", info: "Capital: Nairobi (safaris y leones 🦁)" },
    { lat: -4.4419, lng: 15.2663, name: "República del Congo", info: "Capital: Brazzaville (selvas y gorilas 🌿)" },
    { lat: -25.7479, lng: 28.2293, name: "Sudáfrica", info: "Capital: Pretoria (pingüinos en África 🐧)" },
    { lat: -35.2809, lng: 149.1300, name: "Australia", info: "Capital: Canberra (canguros y koalas 🦘🐨)" },
    { lat: -41.2865, lng: 174.7762, name: "Nueva Zelanda", info: "Capital: Wellington (paisajes de El Hobbit 🏞️)" },



];

return (
    <div style={{ display: "flex" }}>
    <div style={{ width: "60vw", height: "60vh" }}>
        <Globe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        pointsData={countries}
        pointLat="lat"
        pointLng="lng"
        pointLabel={(d) => `<b>${(d as Country).name}</b><br/>${(d as Country).info}`}
        pointRadius={0.5}
        pointColor={() => '#ef685cff'} // Añadir color para que los puntos sean visibles
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
