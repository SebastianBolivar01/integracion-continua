import Paint3DScene from "../components/Paint3DScene";

export default function PaintView() {
return (
    <div>
    <header className="p-4 text-xl font-bold">
        🎨 Arte y Creatividad — Pintura 3D
    </header>

    <section className="p-4 text-gray-700">
        <p className="mb-4">
        Usa el mouse para dibujar en el espacio 3D. 
        Este entorno simula una pintura en el aire: 
        mueve el cursor mientras presionas el botón izquierdo 
        para crear trazos coloridos.
        </p>

        <Paint3DScene />

        <p className="mt-4 text-sm italic text-gray-500">
        *Haz clic y arrastra para dibujar. Pulsa "Limpiar" para borrar tu lienzo.*
        </p>
    </section>
    </div>
);
}
