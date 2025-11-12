import GlobeScene from "../components/GlobeScene";

export default function GlobeView() {
return (
    <div className="bg-white p-4 rounded-lg">
    <header className="p-4 text-xl font-bold">
        🌍 Ciencias Sociales / Geografía — Globo Interactivo
    </header>

    <section className="p-4 text-gray-700">
        <p className="mb-4">
        En esta actividad podrás explorar un globo terráqueo en 3D. 
        Haz clic en los puntos destacados para ver información sobre 
        algunos países y sus capitales.
        </p>

        <GlobeScene />

        <p className="mt-4 text-sm italic text-gray-500">
        *Puedes rotar y hacer zoom en el globo usando el mouse.*
        </p>
    </section>
    </div>
);
}
